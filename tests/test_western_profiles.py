"""西方档案身份、单位转换、别名及链接边界。"""
import unittest
import sqlite3
import tempfile
from pathlib import Path
from contextlib import closing

from peach.http import HttpResponse
from peach.western_profiles import profile, land
from peach.western_artwork import babepedia_portraits
from peach.performer_header import header, profiled
from tests.support.ledger import fresh_ledger


class WesternProfileTests(unittest.TestCase):
    def page(self, extra='', name='Christy White'):
        return f'<h1 id="babename">{name}</h1><h2 id="aka"><small>Also known as:</small>Christine White - Christina Andreadou<img id="aliasinfobtn"></h2><div id="personal-info-block">{extra}</div>'.encode()

    def cell(self, label, value):
        return f'<div class="info-item"><span class="label">{label}:</span><span class="value">{value}</span></div>'

    def test_units_dates_aliases_and_profile_links(self):
        body = self.page(''.join(self.cell(label,value) for label,value in (
            ('Born','Monday 17th of September 2001'), ('Height', '5\'6" (or 167 cm)'),
            ('Measurements','34–26–34 in (B–W–H)'), ('Bra/cup size','32B - JP: 70C'),
            ('Years active','2021-present'), ('Birthplace','Thessaloniki, Greece (#20)'))))
        body += b'<div id="socialicons"><a class="proficon x" href="https://x.com/Christy_whitee">X</a><a class="proficon www" href="https://linktr.ee/christywhite_">Web</a><a class="proficon x" href="https://localhost/">bad</a></div>'
        got = profile(lambda *a: HttpResponse(200,{},body),'Christy White')
        facts = got['profile']
        self.assertEqual(facts['birth_date'],'2001-09-17')
        self.assertEqual([facts[k] for k in ('height_cm','bust_cm','waist_cm','hip_cm')],[167,86,66,86])
        self.assertEqual(facts['cup'],'C')
        self.assertEqual(facts['debut_year'],2021)
        self.assertNotIn('active_until',facts)
        self.assertEqual(facts['birthplace'],'Thessaloniki, Greece')
        self.assertEqual(got['aliases'],['Christine White','Christina Andreadou'])
        self.assertEqual(len(got['links']),2)
        self.assertIn('Born',facts['raw'])

    def test_invalid_dates_and_unspecified_units_are_not_invented(self):
        body = self.page(self.cell('Born','31st of February 2000') + self.cell('Measurements','34-26-34')
                         + self.cell('Bra/cup size','32B') + self.cell('Years active','2015-2025'))
        facts = profile(lambda *a:HttpResponse(200,{},body),'Christy White')['profile']
        for key in ('birth_date','bust_cm','cup'):
            self.assertNotIn(key,facts)
        self.assertEqual(facts['active_until'],2025)

    def test_babepedia_alias_identity_is_required_for_all_profile_fields(self):
        with self.assertRaisesRegex(ValueError,'身份不一致'):
            profile(lambda *a:HttpResponse(200,{},self.page()),'Someone Else')

    def test_creator_profile_and_aliases_share_the_person_header(self):
        with tempfile.TemporaryDirectory() as directory, closing(sqlite3.connect(fresh_ledger(Path(directory).resolve()))) as connection:
            entity_id = connection.execute("INSERT INTO entity(kind,canonical_name,normalized_name,created_at,updated_at) VALUES('creator','RiaKurumi','riakurumi','t','t')").lastrowid
            body = b'<h1 id="babename">Ria Kurumi</h1><h2 id="aka"><small>Also known as:</small>Kurumi Momota - Momo Ichinose - \xe7\x99\xbe\xe7\x94\xb0\xe3\x81\x8f\xe3\x82\x8b\xe3\x81\xbf</h2>'
            body += ('<div id="personal-info-block">' + self.cell('Height','149 cm') + '</div>').encode()
            record = profile(lambda *a:HttpResponse(200,{},body),'RiaKurumi')
            with connection:
                result = land(connection,entity_id,'RiaKurumi',record,batch='auto:babepedia-profile@creator')
            self.assertTrue(result['profile_written'])
            self.assertIn(entity_id,profiled(connection))
            facts = header(connection,entity_id,'RiaKurumi')
            self.assertEqual(facts['profile']['height'],149)
            self.assertIn('Kurumi Momota',[r[0] for r in connection.execute('SELECT alias FROM entity_alias WHERE entity_id=?',(entity_id,))])
            self.assertGreater(facts['name_groups']['total'],1)

    def test_named_person_gallery_adds_candidates_and_excludes_other_people(self):
        body = self.page() + b'<div id="profbox2"><a class="img" href="/pics/Christy.jpg"></a></div><div class="useruploads2"><a class="img" href="/user-uploads/Christy.jpg"><img alt="Christy White"></a><a class="img" href="/user-uploads/Other.jpg"><img alt="Someone Else"></a></div><a class="img" href="/pics/related.jpg"><img alt="Christy White"></a>'
        found = babepedia_portraits(lambda *a:HttpResponse(200,{},body),'Christy White')
        self.assertEqual(len(found),2)
        self.assertEqual([p['automatic_install'] for p in found],[True,False])

    def test_profile_landing_preserves_existing_profile_and_links_and_alias_owners(self):
        with tempfile.TemporaryDirectory() as directory, closing(sqlite3.connect(fresh_ledger(Path(directory).resolve()))) as connection:
            entity_id = connection.execute("INSERT INTO entity(kind,canonical_name,normalized_name,created_at,updated_at) VALUES('performer','Christy White','christy white','t','t')").lastrowid
            connection.execute("INSERT INTO entity(kind,canonical_name,normalized_name,created_at,updated_at) VALUES('performer','Christine White','christine white','t','t')")
            record = profile(lambda *a: HttpResponse(200,{},self.page(self.cell('Height','167 cm'))
                + b'<div id="socialicons"><a class="proficon x" href="https://x.com/christy">X</a></div>'),'Christy White')
            with connection:
                first = land(connection,entity_id,'Christy White',record,batch='auto:babepedia-profile@test')
            self.assertTrue(first['profile_written'])
            self.assertEqual(len(first['added_links']),1)
            self.assertEqual(connection.execute('SELECT count(*) FROM entity_alias WHERE entity_id=? AND normalized_alias=?',(entity_id,'christine white')).fetchone()[0],0)
            self.assertEqual(connection.execute('SELECT alias FROM entity_alias WHERE entity_id=?',(entity_id,)).fetchall(),[('Christina Andreadou',)])
            record['profile']['height_cm'] = 170
            with connection:
                second = land(connection,entity_id,'Christy White',record,batch='auto:babepedia-profile@test2')
            self.assertTrue(second['preserved_profile'])
            self.assertEqual(second['added_links'],[])
            self.assertEqual(connection.execute('SELECT height_cm FROM performer_profile WHERE entity_id=?',(entity_id,)).fetchone()[0],167)
            self.assertEqual(connection.execute('PRAGMA foreign_key_check').fetchall(),[])
