import { User } from '../../types/OfferType.js';
import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { createSHA256 } from '../../core/helpers/common.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '', minlength: 1, maxlength: 15 })
  public avatarUrl: string;

  @prop({ required: true })
  public name: string;

  @prop({ required: true, default: 'user', enum : ['user','pro'] })
  public userType: string;

  @prop({required: true, default: ''})
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.name = userData.name;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
