import { readFileSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { City, Host, OfferType } from '../../types/OfferType.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): OfferType[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(
        ([
          title,
          date,
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
          name,
          email,
          avatarUrl,
          hostId,
          location,
        ]): OfferType => ({
          title,
          date: new Date(date),
          city: <City>{latitude: Number(location.split(';')[0]), longitude: Number(location.split(';')[1]), cityName},
          previewImage,
          images: images.split(';'),
          isPremium: isPremium === 'Premium',
          rating: Number(rating),
          type,
          bedrooms: Number(bedrooms),
          maxAdults: Number(maxAdults),
          price: Number.parseInt(price, 10),
          goods: goods.split(';'),
          host: <Host>{name, email, avatarUrl, hostId: Number(hostId)}
        })
      );
  }
}
