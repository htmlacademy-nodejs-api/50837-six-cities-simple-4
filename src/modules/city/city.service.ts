// import { CityEntity } from './city.entity.js';
// import { DocumentType, types } from '@typegoose/typegoose';
// import CreateCityDto from './dto/create-city.dto.js';
// import {CityServiceInterface} from './city-service.interface.js';
// import { inject, injectable } from 'inversify';
// import { AppComponent } from '../../types/app-component.enum.js';
// import { LoggerInterface } from '../../core/logger/logger.interface.js';
// import { MAX_CITIES_COUNT } from './city.constant.js';

// @injectable()
// export default class CityService implements CityServiceInterface {
//   constructor(
//     @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
//     @inject(AppComponent.CityModel) private readonly cityModel: types.ModelType<CityEntity>
//   ) {}

//   public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
//     const result = await this.cityModel.create(dto);
//     this.logger.info(`New category created: ${dto.cityName}`);
//     return result;
//   }

//   public async findById(id: string): Promise<DocumentType<CityEntity> | null> {
//     return this.cityModel.findOne({id});
//   }

//   public async findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null> {
//     return this.cityModel.findOne({name: cityName}).exec();
//   }

//   public async findOrCreate(name: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
//     const existedCity = await this.findByCityName(name);

//     if (existedCity) {
//       return existedCity;
//     }

//     return this.create(dto);
//   }

//   public async find(): Promise<DocumentType<CityEntity>[]> {
//     return this.cityModel
//       .aggregate([
//         {
//           $lookup: {
//             from: 'offers',
//             let: { cityId: '$_id'},
//             pipeline: [
//               { $match: { $expr: { $in: ['$$cityId', '$cities'] } } },
//               { $project: { _id: 1}}
//             ],
//             as: 'offers'
//           },
//         },
//         {
//           $addFields:
//           { id: { $toString: '$_id'}, offerCount: { $size: '$offers'} }
//         },
//         { $unset: 'offers' },
//         { $limit: MAX_CITIES_COUNT },
//         //{ $sort: { offerCount: SortType.Down } }
//       ]).exec();
//   }
// }
import { CityEntity } from './city.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateCityDto from './dto/create-city.dto.js';
import {CityServiceInterface} from './city-service.interface.js';
import { inject, injectable } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { MAX_CITIES_COUNT } from './city.constant.js';

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

  public async findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({name: cityName}).exec();
  }

  public async findOrCreate(id: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findById(id);

    if (existedCity) {
      return existedCity;
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<CityEntity>[]> {
    return this.cityModel
      .aggregate([
        {
          $lookup: {
            from: 'offers',
            let: { cityId: '$_id'},
            pipeline: [
              { $match: { $expr: { $in: ['$$cityId', '$cities'] } } },
              { $project: { _id: 1}}
            ],
            as: 'offers'
          },
        },
        {
          $addFields:
          { id: { $toString: '$_id'}, offerCount: { $size: '$offers'} }
        },
        { $unset: 'offers' },
        { $limit: MAX_CITIES_COUNT },
        //{ $sort: { offerCount: SortType.Down } }
      ]).exec();
  }
}
