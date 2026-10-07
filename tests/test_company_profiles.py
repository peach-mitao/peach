"""公司事实的来源、日期精度、填空与撤回。"""
import json
import sqlite3
import tempfile
import unittest
from pathlib import Path

from peach import company_profiles
from peach.entities import upsert_asset_entity
from peach import web_contract
from support.ledger import fresh_ledger


class CompanyProfileTests(unittest.TestCase):
    def test_dates_keep_precision_and_reject_copyright_or_invalid_dates(self):
        for raw, expected in [('2002年5月', '2002-05'), ('1999年3月1日', '1999-03-01'), ('2016', '2016'), ('平成16年7月21日', '2004-07-21')]:
            self.assertEqual(company_profiles.date_text(raw), expected)
        for raw in ['© 2002', '20周年', '2025年2月30日', '2002年（ブランド発売）']:
            self.assertIsNone(company_profiles.date_text(raw))

    def test_official_tables_separate_company_and_brand_and_detect_conflicts(self):
        html = '<table><tr><th>設立</th><td>2002年5月</td></tr><tr><th>ブランド設立</th><td>2003年</td></tr><tr><th>主要取引先</th><td>WILL</td></tr></table><dl><dt>所在地</dt><dd>東京都中野区</dd></dl><a href="/company/">会社概要 Company</a>'
        parsed = company_profiles.extract(html, 'https://brand.example/')
        self.assertEqual(parsed['facts']['founded']['value'], '2002-05')
        self.assertEqual(parsed['facts']['launched']['value'], '2003')
        self.assertNotIn('parent', parsed['facts'])
        self.assertNotIn('country', parsed['facts'])
        self.assertEqual(parsed['company_pages'], ['https://brand.example/company/'])
        conflict = company_profiles.extract(html + '<dl><dt>設立</dt><dd>2001</dd></dl>', 'https://brand.example/')
        self.assertNotIn('founded', conflict['facts'])
        self.assertEqual(conflict['conflicts'][0]['field'], 'founded')

    def test_fill_protects_existing_facts_and_revert_preserves_metadata(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        connection = sqlite3.connect(fresh_ledger(Path(temporary.name).resolve()))
        self.addCleanup(connection.close)
        connection.execute("INSERT INTO entity(id,kind,canonical_name,normalized_name,metadata_json,created_at,updated_at) VALUES(1,'studio','Brand','brand','{\"provider\":\"catalog\"}','2026-10-07','2026-10-07')")
        fact = {'value': '2002', 'source_url': 'https://brand.example/company', 'evidence': '設立：2002年'}
        self.assertEqual(company_profiles.fill(connection, 1, {'founded': fact}, source='auto:company-profile', batch='batch1')['written'], ['founded'])
        conflict = company_profiles.fill(connection, 1, {'founded': {**fact, 'value': '2001'}}, source='auto:company-profile', batch='batch2')
        self.assertEqual(conflict, {'written': [], 'conflicts': ['founded']})
        self.assertEqual(company_profiles.planned_revert(connection, 'auto:company-profile', 'batch2'), [])
        rows = company_profiles.planned_revert(connection, 'auto:company-profile', 'batch1')
        self.assertEqual(company_profiles.revert(connection, rows), 1)
        self.assertEqual(json.loads(connection.execute('SELECT metadata_json FROM entity').fetchone()[0]), {'provider': 'catalog'})

    def test_group_company_tables_are_scoped_to_the_named_company(self):
        html = '<table><tr><th>社名</th><td>ソフト・オン・デマンド株式会社</td></tr><tr><th>設立</th><td>1995年11月</td></tr></table><table><tr><th>社名</th><td>SODクリエイト株式会社</td></tr><tr><th>設立</th><td>1999年3月</td></tr></table>'
        result = company_profiles.extract_for_entity(html, 'https://corporate.sod.co.jp/about_us/info/', 'SOD Create')
        self.assertEqual(result['facts']['founded']['value'], '1999-03')
        self.assertEqual(result['facts']['legal_name']['value'], 'SODクリエイト株式会社')

    def test_brand_listing_is_not_a_company_foundation_date(self):
        html = '<h1>Vixen Media Group</h1><p>OUR BRANDS Each studio is a world. Explore Vixen, Blacked, Blacked Raw, Tushy, and Deeper, all available on Vixen Plus</p>'
        facts = company_profiles.brand_facts(html, 'https://www.vixengroup.com/', 'Tushy')
        self.assertEqual(facts['group']['value'], 'Vixen Media Group')
        self.assertNotIn('founded', facts)
        terms = '<p>These terms of service are entered into between you and General Media Systems, LLC (the Company).</p>'
        facts = company_profiles.brand_facts(terms, 'https://www.tushy.com/terms', 'Tushy')
        self.assertEqual(facts['operator']['value'], 'General Media Systems, LLC')

    def test_aliases_are_observed_and_do_not_collide_with_another_company(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        connection = sqlite3.connect(fresh_ledger(Path(temporary.name).resolve()))
        self.addCleanup(connection.close)
        connection.executemany("INSERT INTO entity(id,kind,canonical_name,normalized_name,created_at,updated_at) VALUES(?,?,?,?,'2026-10-07','2026-10-07')",
                               [(1,'studio','Brand','brand'),(2,'studio','Other','other')])
        aliases = [{'value': value, 'source_url': 'https://brand.example/', 'status': status}
                   for value,status in [('Brand JP','observed'),('Unverified','candidate'),('Other','observed')]]
        self.assertEqual(company_profiles.fill_aliases(connection,1,aliases,batch='auto:company-profile@1'), ['Brand JP'])
        self.assertEqual(connection.execute('SELECT alias,source FROM entity_alias WHERE entity_id=1').fetchall(),
                         [('Brand JP','auto:company-profile@1')])

    def test_public_profile_requires_public_source_and_known_nonempty_values(self):
        facts = {key: {'value': value, 'source_url': url} for key, value, url in [('country','日本','https://brand.example/company'), ('operator','secret','https://localhost/admin'), ('founded','','https://brand.example/'), ('telephone','123','https://brand.example/')]}
        self.assertEqual(list(company_profiles.public_profile({'company_profile': facts})), ['country'])

    def test_company_profile_survives_catalog_ingest(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        root = Path(temporary.name).resolve()
        path = fresh_ledger(root)
        connection = sqlite3.connect(path)
        self.addCleanup(connection.close)
        connection.execute("INSERT INTO asset(id,location,path,name,medium) VALUES(1,'local','C:/test/a.mp4','a.mp4','video')")
        entity_id = upsert_asset_entity(connection, kind='studio', name='Brand', asset_id=1, role='studio', source='scan:filename')
        fact = {'value': '2002', 'source_url': 'https://brand.example/company'}
        company_profiles.fill(connection, entity_id, {'founded': fact}, source='auto:company-profile', batch='batch1')
        upsert_asset_entity(connection, kind='studio', name='Brand', asset_id=1, role='studio', source='scan:filename', metadata={'provider': 'fresh'})
        metadata = json.loads(connection.execute('SELECT metadata_json FROM entity WHERE id=?', (entity_id,)).fetchone()[0])
        self.assertEqual(metadata['provider'], 'fresh')
        self.assertEqual(metadata['company_profile']['founded']['value'], '2002')
        connection.commit()
        contract = web_contract.WebContract(path, avatar_root=root / 'avatars', logo_root=root / 'logos', cover_root=root / 'covers')
        response = web_contract.q_entity(contract, {'kind': 'studio', 'name': 'Brand'})
        self.assertEqual(response['company_profile']['founded']['value'], '2002')


if __name__ == '__main__':
    unittest.main()
