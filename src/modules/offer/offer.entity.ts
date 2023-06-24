import { City, OfferType, User } from '../../types/OfferType.js';
import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps implements OfferType {
  @prop({ required: true, min:1, max: 8 })
  public bedrooms: number;

  @prop({ required: true})
  public city: City;

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

  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public user!: User;

  constructor(offerData: OfferType) {
    super();

    this.bedrooms = offerData.bedrooms;
    this.city = offerData.city;
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
  }
}

export const OfferModel = getModelForClass(OfferEntity);
