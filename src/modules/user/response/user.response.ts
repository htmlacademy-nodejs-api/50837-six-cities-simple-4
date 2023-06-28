import { Expose } from 'class-transformer';
import UserResponse from './../../../modules copy/user/response/user.response';

export default class UserResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}
