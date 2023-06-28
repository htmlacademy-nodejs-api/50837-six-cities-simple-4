import {defaultClasses} from '@typegoose/typegoose';
import typegoose, {getModelForClass} from '@typegoose/typegoose';
import {City} from '../../types/OfferType.js';

const {prop, modelOptions} = typegoose;

export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})
export class CityEntity extends defaultClasses.TimeStamps implements City {
  @prop({required: true, trim: true})
  public cityName!: string;

  constructor(cityData: City) {
    super();

    this.cityName = cityData.cityName;
  }
}

export const CityModel = getModelForClass(CityEntity);
