import { Router, } from 'express';
import { reset, } from 'nodemon';
import { AdRecord, } from '../records/ad.record';
import { SimpleAdEntity, } from '../types';

export const adRouter = Router ()

  .get (
    '/search/:name?', async (
      req, res
    ) => { 
      const ads = await AdRecord.findAll (req.params.name ?? '');
      res.json (ads as SimpleAdEntity[]) ;
    }
  )
  .get (
    '/:id', async (
      req, res
    ) => {
      const ad = await AdRecord.getOne (req.params.id);
      res.json (ad as SimpleAdEntity);
    }
  )
  .post (
    '/', async (
      req, res
    ) => {
      const ad = new AdRecord (req.body);
      await ad.insert ();
      res.json (ad);
    }
     
  );