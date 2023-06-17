export type CityType = {
  cityName: string;
  latitude: string[];
  longitude: string[];
};

export type MockType = {
  titles: string[];
  types: string[];
  goods: string[];
  images: string[];
  descriptions: string[];
  cities: CityType[];
};
