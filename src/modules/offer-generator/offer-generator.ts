import dayjs from 'dayjs';
import {
  getRandomItem,
  generateRandomValue,
  getRandomItems,
} from '../../core/helpers/random.js';
import { MockType, CityType } from '../../types/MockType.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_OFFER_RATING = 1;
const MAX_OFFER_RATING = 5;

const MIN_RANDOM_PRICE = 800;
const MAX_RANDOM_PRICE = 5000;

const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 8;

const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 8;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockType) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const dateTime = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const previewImage = getRandomItem<string>(this.mockData.images);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium: boolean = Math.random() > 0.5;
    const rating = generateRandomValue(MIN_OFFER_RATING, MAX_OFFER_RATING);
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomValue(MIN_ROOM_COUNT, MAX_ROOM_COUNT);
    const maxAdults = generateRandomValue(MIN_GUEST_COUNT, MAX_GUEST_COUNT);
    const price = generateRandomValue(MIN_RANDOM_PRICE, MAX_RANDOM_PRICE);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');

    const mockCity: CityType = getRandomItem(this.mockData.cities);

    const cityName = mockCity?.cityName;
    const latitude = getRandomItem(mockCity?.latitude);
    const longitude = getRandomItem(mockCity?.longitude);

    const coordinates = `${latitude}:${longitude}`;

    const name = getRandomItem(this.mockData?.names);
    const email = getRandomItem(this.mockData?.emails);
    const avatarUrl = getRandomItem(this.mockData?.avatarList);
    const userType = getRandomItem(this.mockData?.userTypes);

    return [
      title,
      description,
      dateTime,
      title,
      description,
      dateTime,
      cityName,
      previewImage,
      images,
      isPremium,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      coordinates,
      name,
      email,
      avatarUrl,
      userType
    ].join('\t');
  }
}
