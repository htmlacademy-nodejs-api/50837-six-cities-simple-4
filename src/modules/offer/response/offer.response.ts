import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';
import CityResponse from '../../city/response/city.response.js';

export default class OfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public previewImage!: string;

  @Expose()
  public price!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public goods!: string[];

  // @Expose()
  // public latitude: string;

  // @Expose()
  // public longitude: string;

  @Expose()
  @Type(() => CityResponse)
  public city!: CityResponse;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;
}
