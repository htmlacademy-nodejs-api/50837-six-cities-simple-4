import { DocumentType } from '@typegoose/typegoose';
import CreateCityDto from './dto/create-city.dto.js';
import { CityEntity } from './city.entity.js';

export interface CityServiceInterface {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findById(id: string): Promise<DocumentType<CityEntity> | null>;
  findOrCreate(id: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  find(): Promise<DocumentType<CityEntity>[]>;
}
