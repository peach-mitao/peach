"""多职业分类、来源保护、身份衔接与分页的行为回归。"""
import sqlite3
import tempfile
import unittest

from peach import entity_classification as classification, entity_identity_research as research
from peach.entities import merge_entity, upsert_asset_entity
from peach.web_entity import q_index, q_entity
from peach.web_state import WebContract
from tests.support.ledger import fresh_ledger


class EntityClassificationTests(unittest.TestCase):
    def setUp(self):
        self.directory=tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.db=fresh_ledger(self.directory.name)
        self.connection=sqlite3.connect(self.db)
        self.addCleanup(self.connection.close)
        self.connection.row_factory=sqlite3.Row

    def entity(self,name,kind='creator'):
        self.connection.execute("INSERT INTO asset(location,path,name,medium,creator,studio) VALUES('local',?,?, 'video',?,'Publisher')",
            (f'B:\\西方\\Publisher\\Publisher.24.12.02.{name.replace(" ",".")}.mp4',f'{name}.mp4',name))
        asset_id=self.connection.execute('SELECT last_insert_rowid()').fetchone()[0]
        entity_id=upsert_asset_entity(self.connection,kind=kind,name=name,asset_id=asset_id,role=kind,source='legacy:asset')
        self.connection.commit()
        return asset_id,entity_id

    def claim(self,entity_id,facet,value,**kwargs):
        classification.write_claim(self.connection,entity_id=entity_id,facet=facet,value=value,
            source='source:publisher',source_url='https://publisher.test/profile',evidence='发行方资料',status='observed',confidence=1,**kwargs)

    def finding(self,name,entity_id):
        return {'entity_id':entity_id,'name':name,'cast_studios':['Publisher'],
            'cast_source_url':'https://publisher.test/profile', 'claims':[
                {'facet':'identity','value':'person','source_url':'https://publisher.test/profile','evidence':'发行方署名','status':'observed','confidence':1},
                {'facet':'occupation','value':'adult_performer','source_url':'https://publisher.test/profile','evidence':'发行出演名单','status':'observed','confidence':1}]}

    def test_multiple_markets_and_occupations_are_independent_of_entity_role(self):
        _,entity_id=self.entity('Known Person')
        for facet,value in [('identity','person'),('occupation','adult_performer'),('occupation','model'),('market','japanese_av'),('market','western_adult')]:
            self.claim(entity_id,facet,value)
        self.connection.commit()
        data=q_entity(WebContract(self.db),{'kind':'creator','name':'Known Person'})
        self.assertEqual(set(data['identity_labels']),{'个人','成人出演者','模特','日本 AV','西方成人发行'})
        self.assertEqual(len(data['classifications']),5)

    def test_candidates_and_search_hits_do_not_qualify_for_trusted_filters(self):
        _,known=self.entity('Known Person'); _,unknown=self.entity('Unknown Person')
        self.claim(known,'identity','person')
        classification.write_claim(self.connection,entity_id=unknown,facet='identity',value='person',source='script:lookup',evidence='同名搜索命中')
        self.connection.commit()
        data=q_index(WebContract(self.db),'creators',limit=1,category='unknown')
        self.assertEqual([row['entity_id'] for row in data['items']],[unknown])
        self.assertFalse(data['has_more'])
        self.assertEqual(data['items'][0]['identity_labels'],['待核验'])
        self.assertEqual(q_index(WebContract(self.db),'creators',category='person')['items'][0]['entity_id'],known)
        self.assertEqual(q_index(WebContract(self.db),'creators',category="person' OR 1=1")['items'],[])

    def test_script_cannot_approve_or_supply_unvalidated_values(self):
        _,entity_id=self.entity('Known Person')
        for patch in [{'status':'approved'}, {'status':'observed','source_url':'http://example.test'}]:
            with self.assertRaises(ValueError):
                classification.write_claim(self.connection,entity_id=entity_id,facet='identity',value='person',source='script:lookup',evidence='推断',**patch)
        with self.assertRaises(ValueError):
            self.claim(entity_id,'occupation','unknown_profession')

    def test_cast_role_repair_and_restore_preserve_all_business_fields(self):
        asset_id,entity_id=self.entity('Known Person')
        self.connection.execute('UPDATE asset SET play_count=7,rating=4 WHERE id=?',(asset_id,));self.connection.commit()
        before=dict(self.connection.execute('SELECT * FROM asset WHERE id=?',(asset_id,)).fetchone())
        frozen=research.plan(self.connection,[self.finding('Known Person',entity_id)])
        self.assertEqual(len(frozen[0]['cast']),1)
        with self.connection:
            receipt=research.apply(self.connection,frozen)
        self.assertEqual(self.connection.execute('SELECT role FROM asset_entity WHERE asset_id=?',(asset_id,)).fetchone()[0],'performer')
        self.assertEqual(len(classification.related_identities(self.connection,entity_id)),1)
        with self.connection:
            research.restore(self.connection,receipt)
        after=dict(self.connection.execute('SELECT * FROM asset WHERE id=?',(asset_id,)).fetchone())
        before.pop('mutation_revision');after.pop('mutation_revision')
        self.assertEqual(before,after)
        self.assertEqual(self.connection.execute('SELECT count(*) FROM entity').fetchone()[0],1)
        self.assertEqual(self.connection.execute('SELECT count(*) FROM entity_identity_link').fetchone()[0],0)
        self.assertEqual(self.connection.execute('PRAGMA foreign_key_check').fetchall(),[])

    def test_stale_plan_and_history_changes_block_repair_or_restore(self):
        asset_id,entity_id=self.entity('Known Person')
        frozen=research.plan(self.connection,[self.finding('Known Person',entity_id)])
        self.connection.execute('UPDATE asset SET creator=? WHERE id=?',('User choice',asset_id));self.connection.commit()
        with self.assertRaisesRegex(ValueError,'已过期'):
            with self.connection: research.apply(self.connection,frozen)
        frozen=research.plan(self.connection,[self.finding('Known Person',entity_id)])
        with self.connection: receipt=research.apply(self.connection,frozen)
        self.connection.execute('UPDATE asset SET play_count=9 WHERE id=?',(asset_id,));self.connection.commit()
        with self.assertRaisesRegex(ValueError,'后续改动'):
            with self.connection: research.restore(self.connection,receipt)

    def test_manual_creator_relation_is_not_reclassified_as_cast(self):
        asset_id,entity_id=self.entity('Known Person')
        self.connection.execute("UPDATE asset_entity SET source='user:manual' WHERE asset_id=?",(asset_id,));self.connection.commit()
        self.assertEqual(research.plan(self.connection,[self.finding('Known Person',entity_id)])[0]['cast'],[])

    def test_entity_merge_transfers_classification_with_foreign_keys_disabled(self):
        _,target=self.entity('Known Person');_,source=self.entity('Old Name')
        self.claim(source,'occupation','model');self.connection.commit()
        with self.connection:
            merge_entity(self.connection,target_id=target,source_id=source,source_name='Old Name',alias_source='user:review')
        self.assertEqual(classification.labels(classification.classifications(self.connection,[target])[target]),['模特'])
        self.assertEqual(self.connection.execute('PRAGMA foreign_key_check').fetchall(),[])
