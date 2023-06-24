import { City, User, OfferType } from '../../types/OfferType.js';

export function createOffer(offerData: string): OfferType {
  const [
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
    userType,
    location,
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    date: new Date(date),
    city: <City><unknown>{
      latitude: Number(location.split(';')[0]),
      longitude: Number(location.split(';')[1]),
      cityName,
    },
    previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'Premium',
    rating: Number(rating),
    type,
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number.parseInt(price, 10),
    goods: goods.split(';'),
    user: <User><unknown>{ name, email, avatarUrl, userType, hostId},
  };
}
