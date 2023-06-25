import { City } from '../../types/OfferType.js';
import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity.js';

const { prop, modelOptions } = typegoose;

export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})
export class CityEntity extends defaultClasses.TimeStamps implements City {
  @prop({ required: true, default: '' })
  public cityName = '';

  @prop({ required: true, default: ''})
  public latitude = '';

  @prop({ required: true, default: '' })
  public longitude = '';

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId!: Ref<OfferEntity>;

  constructor(cityData: City) {
    super();

    this.cityName = cityData.cityName;
    this.latitude = cityData.latitude;
    this.longitude = cityData.longitude;
  }
}

export const CityModel = getModelForClass(CityEntity);
