import { v4 as uuid, } from 'uuid';
import { FieldPacket, } from 'mysql2';
import { AdEntity, SimpleAdEntity, } from '../types/ad/ad-entity';
import { ValidationError, } from '../utils/error';

import { pool, } from '../utils/db';
import { NewAdEntity, } from '../types/ad/ad';

type AdRecordResults =[AdEntity[], FieldPacket[]]
export class AdRecord implements AdEntity{

  id: string;
  
  name: string;
  
  description: string;
  
  price: number;
  
  url: string;
  
  lat: number;
  
  lon: number;
  
  constructor(obj: NewAdEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError ('Nazwa ogłoszenia niemoże być pusta , ani przekraczać 100 znaków.');
    }
    if (obj.description.length > 1000) {
      throw new ValidationError ('Nazwa ogłoszenia niemoże przekraczać 1000 znaków.');
    }
    if (obj.price < 0 || obj.price > 999) {
      throw new ValidationError ('Cena niemoże być mniejsza niż 0 lub większa niż 999.');
    }
    if (!obj.url || obj.url.length > 100) {
      throw new ValidationError ('Adres ogłoszenia niemoże być pusty.');
    }
    if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
      throw new ValidationError ('Nie można zlokalizować ogłoszenia.');
    }
    this.id = obj.id ?? uuid ();
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }

  static async getOne(id: string):Promise<AdRecord|null> {
    const [ results, ] = await pool.execute (
      'SELECT * FROM `ads` WHERE `id` = :id', {
        id,
      }
    ) as AdRecordResults;
    return results.length === 0 ? null : new AdRecord (results[ 0 ]);
  }

  static async findAll(name: string): Promise<SimpleAdEntity[]> {
    const [ results, ] = await pool.execute (
      'SELECT * FROM `ads` WHERE `name` LIKE :search', {
        search: `%${name}%`,
      }
    ) as AdRecordResults;
    return results.map (result => {
      const { id, lat, lon, } = result;
      return { id, lat, lon, };
    });
  }
}