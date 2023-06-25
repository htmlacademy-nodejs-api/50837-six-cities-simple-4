import { City } from '../../../types/OfferType.js';

export default class UpdateOfferDto {
  public bedrooms?: number;
  public title?: string;
  public city?: City;
  public description?: string;
  public images!: string[];
  public isPremium?: boolean;
  public maxAdults?: number;
  public previewImage?: string;
  public price?: number;
  public rating?: number;
  public type?: string;
  public goods?: string[];
  public userId?: string;
  public cityId?: string;
}
