import { CliCommandInterface } from './cli-command.interface.js';
import TSVFileReader from '../file-reader/tsv-file.reader.js';
import { createOffer } from '../helpers/offers.js';
import { getErrorMessage } from '../helpers/common.js';
import { getMongoURI } from '../helpers/db.js';
import { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import { OfferServiceInterface } from '../../modules/offer/offer-service.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import ConsoleLoggerService from '../logger/console.service.js';
import OfferService from '../../modules/offer/offer.service.js';
import UserService from '../../modules/user/user.service.js';
import MongoClientService from '../database-client/mongo-client.service.js';
import { OfferType } from '../../types/OfferType.js';
import { UserModel } from '../../modules/user/user.entity.js';
import { OfferModel } from '../../modules/offer/offer.entity.js';
import { DatabaseClientInterface } from '../database-client/database-client.interface.js';
import { CityServiceInterface } from '../../modules/city/city-service.interface.js';
import CityService from '../../modules/city/city.service.js';
import { CityModel } from '../../modules/city/city.entity.js';

const DEFAULT_DB_PORT = '27017';
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private cityService!: CityServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.cityService = new CityService(this.logger, CityModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveOffer(offer: OfferType) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    const city = await this.cityService.findOrCreate(offer.cityId, {...offer.city});

    await this.offerService.create({
      ...offer,
      userId: user.id,
      cityId: city?.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}

