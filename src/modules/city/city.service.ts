import { CityEntity } from './city.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateCityDto from './dto/create-city.dto.js';
import {CityServiceInterface} from './city-service.interface.js';
import { inject, injectable } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';

@injectable()
export default class CityService implements CityServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) {}

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const city = new CityEntity(dto);

    const result = await this.cityModel.create(city);
    this.logger.info(`New user created: ${city}`);
    return result;
  }

  public async findById(id: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({id});
  }

  public async findOrCreate(id: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findById(id);

    if (existedCity) {
      return existedCity;
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<CityEntity>[]> {
    return this.cityModel.find();
  }
}
