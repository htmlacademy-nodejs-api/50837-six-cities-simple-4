export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  userType: string;
}

export type City = {
  cityName: string;
};

export type Comment = {
  text: string;
  commentRating: number;
  // userId: string;
  // offerId: string;
}


export type OfferType = {
  bedrooms: number;
  city: City;
  title: string;
  description: string;
  user: User;
  images: string[];
  isPremium: boolean;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  type: string;
  goods: string[];

  //latitude: string;
  //longitude: string;

  //commentCount: number;
  // userId: string;
  // cityId: string;
};
