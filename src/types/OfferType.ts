export type Host = {
  avatarUrl: string
  hostId: number
  email: string
  name: string
};

export type City = {
  latitude: number
  longitude: number
  cityName: string
}

export type OfferType = {
  bedrooms: number;
  city: City;
  title: string;
  date: Date;
  host: Host;
  images: string[];
  isPremium: boolean;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  type: string;
  goods: string[]
};
