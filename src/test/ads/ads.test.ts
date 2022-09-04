import { AdRecord, } from '../../records/ad.record';

// Sprawdzenie danych które istnieją
test (
  'AdRecord return data from database for on entry', async() => {
    const ad = await AdRecord.getOne ('123') as AdRecord;
    expect (ad).toBeDefined ();
    expect (ad.id).toBe ('123');
    expect (ad.name).toBe ('testowa');
  }
);

// Dane które nie istnieją i zwracają null
test (
  'AdRecord return null from database for on entry', async () => { 
    const ad = await AdRecord.getOne ('---') as null;
    expect (ad).toBeNull ();
  }
);