import { OfferType } from '../../types/OfferType.js';
import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { CityEntity } from '../city/city.entity.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})



//export class OfferEntity extends defaultClasses.TimeStamps implements OfferType {

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, min:1, max: 8 })
  public bedrooms: number;

  @prop({ unique: true, required: true, default: '', minlength: 10, maxlength: 100 })
  public title: string;

  @prop({ required: true, default: '', minlength: 20, maxlength: 1024})
  public description: string;

  @prop({ required: true })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true, default: 0, min:1, max: 10 })
  public maxAdults: number;

  @prop({ required: true })
  public previewImage: string;

  @prop({ required: true, default: 0, min:100, max: 100000 })
  public price: number;

  @prop({ required: true, default: 0, min:1, max: 5 })
  public rating: number;

  @prop({ required: true })
  public type: string;

  @prop({ required: true })
  public goods: string[];


  // @prop({ required: true })
  // public latitude: string;

  // @prop({ required: true })
  // public longitude: string;


  @prop({
    ref: CityEntity,
    required: true,
  })
  public cityId!: Ref<CityEntity>;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;


  constructor(offerData: OfferType) {
    super();

    this.bedrooms = offerData.bedrooms;
    this.title = offerData.title;
    this.description = offerData.description;
    this.images = offerData.images;
    this.isPremium = offerData.isPremium;
    this.maxAdults = offerData.maxAdults;
    this.previewImage = offerData.previewImage;
    this.price = offerData.price;
    this.rating = offerData.rating;
    this.type = offerData.type;
    this.goods = offerData.goods;
    //this.latitude = offerData.latitude;
    //this.longitude = offerData.longitude;
  }

}

export const OfferModel = getModelForClass(OfferEntity);
