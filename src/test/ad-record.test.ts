import { AdRecord, } from '../records/ad.record';

const defaultAd = {
  name       : 'Test Name',
  description: 'blah',
  url        : 'http://wp.pl',
  price      : 12,
  lat        : 50.000000,
  lon        : 9,
};

test (
  'Can build adRecord', () => {
    const ad = new AdRecord (defaultAd);
      
    expect (ad.name).toBe ('Test Name');
    expect (ad.description).toBe ('blah');
  }
);

test (
  'Validate invalid price', () => { 
    expect (() => 
      new AdRecord ({ ...defaultAd, price: -3, }))
      .toThrow ('Cena niemoże być mniejsza niż 0 lub większa niż 999.');
  }
);