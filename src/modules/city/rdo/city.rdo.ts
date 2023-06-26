import { Expose } from 'class-transformer';

export default class CategoryRdo {
  @Expose()
  public email!: string ;

  @Expose()
  public avatarPath!: string;

  @Expose()
  public name!: string;

  @Expose()
  public type!: string;
}
