import {IsString, Length} from 'class-validator';

export default class CreateCityDto {
  @IsString({message: 'name is required'})
  @Length(2, 100, {message: 'Min length is 2, max is 100'})
  public cityName!: string;
}
