import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {CityEntity, CityModel} from './city.entity.js';
import {CityServiceInterface} from './city-service.interface.js';
import {ControllerInterface} from '../../core/controller/controller.interface.js';
import CityService from './city.service.js';
import CityController from './city.controller.js';
import {AppComponent} from '../../types/app-component.enum.js';

const cityContainer = new Container();

cityContainer.bind<CityServiceInterface>(AppComponent.CityServiceInterface).to(CityService);

cityContainer.bind<types.ModelType<CityEntity>>(AppComponent.CityModel).toConstantValue(CityModel);

cityContainer.bind<ControllerInterface>(AppComponent.CityController).to(CityController).inSingletonScope();

export {cityContainer};
