import { AdRecord, } from '../../records/ad.record';
import { AdEntity } from '../../types/ad/ad-entity';
import { pool, } from '../../utils/db';

// Kończeni połączenia po teście
afterAll (async () => {
  await pool.end ();
});

// Zwraca dane w postaci obiketu
test (
  'AdRecord return data from database for on entry', async() => {
    const ad = await AdRecord.getOne ('123') as AdRecord;
    expect (ad).toBeDefined ();
    expect (ad.id).toBe ('123');
    expect (ad.name).toBe ('testowa');
  }
);

// Zwraca null gdy brak takiego rekordu w bazie
test (
  'AdRecord.getOne return null from database for on entry', async () => { 
    const ad = await AdRecord.getOne ('---') as null;
    expect (ad).toBeNull ();
  }
);

// Zwraca tablice obiektów
test (
  'AdRecord.findAll return array from found entries.', async () => {
    const ads = await AdRecord.findAll ('');
    expect (ads).not.toEqual ([]);
    expect (ads[ 0 ].id).toBeDefined ();
  }
);

// Zwraca tablice obiektów w wyszukiwania
test (
  'AdRecord.findAll return array from found entries when searching for "w"', async () => {
    const ads = await AdRecord.findAll ('w');
    expect (ads).not.toEqual ([]);
    expect (ads[ 0 ].id).toBeDefined ();
  }
);

// Zwraca [] jeżeli nic nieznajdzie
test (
  'AdRecord.findAll return array when searching for somthing that does not exist', async () => {
    const ads = await AdRecord.findAll ('---');
    expect (ads).toEqual ([]);
  }
);

// Sprawdza czy dane są przefiltrowane
test (
  'AdRecord.findAll returns smaller amount of data', async () => {
    const ads = await AdRecord.findAll ('');
    expect(ads).not.toEqual([]);
    expect ((ads[ 0 ] as AdEntity).price).toBeUndefined ();
    expect ((ads[ 0 ] as AdEntity).description).toBeUndefined ();
    expect ((ads[ 0 ] as AdEntity).url).toBeUndefined ();
  }
);