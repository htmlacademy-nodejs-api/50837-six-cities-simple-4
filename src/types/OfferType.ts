export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  userType: string;
}

export type City = {
  latitude: (number | string)[];
  longitude: (number | string)[];
  cityName: string;
};


export type OfferType = {
  bedrooms: number;
  city: City;
  title: string;
  description: string;
  user: User;
  // userId: string;
  images: string[];
  isPremium: boolean;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  type: string;
  goods: string[];
};
