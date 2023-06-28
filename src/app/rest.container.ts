import { Container } from 'inversify';
import RestApplication from './rest.js';
import { AppComponent } from '../types/app-component.enum.js';
import { LoggerInterface } from '../core/logger/logger.interface.js';
import LoggerService from '../core/logger/logger.service.js';
import { ConfigInterface } from '../core/config/config.interface.js';
//import { RestSchema } from '../core/config/rest.schema.js';
import ConfigService from '../core/config/config.service.js';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface.js';
import MongoClientService from '../core/database-client/mongo-client.service.js';
import { ExceptionFilterInterface } from '../core/expception-filters/exception-filter.interface.js';
import ExceptionFilter from '../core/expception-filters/exception-filter.js';

const applicationContainer = new Container();

applicationContainer.bind<RestApplication>(AppComponent.RestApplication).to(RestApplication).inSingletonScope();

applicationContainer.bind<LoggerInterface>(AppComponent.LoggerInterface).to(LoggerService).inSingletonScope();

applicationContainer.bind<ConfigInterface>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();

applicationContainer.bind<DatabaseClientInterface>(AppComponent.DatabaseClientInterface).to(MongoClientService).inSingletonScope();

applicationContainer.bind<ExceptionFilterInterface>(AppComponent.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();

export {applicationContainer};
