import 'reflect-metadata';
import { Container } from 'inversify';
import LoggerService from './core/logger/logger.service.js';
import RestApplication from './app/rest.js';
import ConfigService from './core/config/config.service.js';
import { AppComponent } from './types/app-component.enum.js';
import { LoggerInterface } from './core/logger/logger.interface.js';
import { ConfigInterface } from './core/config/config.interface.js';
import { RestSchema } from './core/config/rest.schema.js';

async function bootstrap() {
  // const logger = new LoggerService();
  // const config = new ConfigService(logger);
  const container = new Container();
  container.bind<RestApplication>(AppComponent.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<LoggerInterface>(AppComponent.LoggerInterface).to(LoggerService).inSingletonScope();
  container.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();

  //const application = new RestApplication(logger, config);
  const application = container.get<RestApplication>(AppComponent.RestApplication);
  await application.init();
}

bootstrap();

