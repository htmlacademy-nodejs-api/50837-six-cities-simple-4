import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CityServiceInterface } from './city-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import CityService from './city.service.js';
import { CityEntity, CityModel } from './city.entity.js';

export function createCityContainer() {
  const cityContainer = new Container();
  cityContainer.bind<CityServiceInterface>(AppComponent.CityServiceInterface).to(CityService).inSingletonScope();
  cityContainer.bind<types.ModelType<CityEntity>>(AppComponent.CityModel).toConstantValue(CityModel);

  return cityContainer;
}
