import { AdEntity, } from './ad-entity';

export interface NewAdEntity extends Omit<AdEntity, 'id'>{
   id?: string;
}