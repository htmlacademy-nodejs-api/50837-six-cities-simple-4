import {ConfigSchema} from './rest.schema';

export interface ConfigInterface {
  get<T extends keyof ConfigSchema>(key: T): ConfigSchema[T];
}
