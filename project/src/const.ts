export enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer= '/offer/:id',
  PageNotExist= '/404',
  Lose = '/lose',
}

export const PageModifierClassType: {[key: string]: string} = {
  [AppRoute.Main]: 'page--gray page--main',
  [AppRoute.Login]: 'page--gray page--login',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ReviewStatus {
  ReviewRest = 'REVIEW_REST',
  ReviewPending = 'REVIEW_PENDING',
  ReviewFulfilled = 'REVIEW_FULFILLED',
}

export const Ratings: string[] = ['20%', '40%', '60%', '80%', '100%'];

export const FiveStar: number[] = [5, 4, 3, 2, 1];

export enum PropertiesName {
  Bedroom = 'Bedroom',
  Bedrooms = 'Bedrooms',
  Adult = 'adult',
  Adults = 'adults',
}

export const PropertyFeatures: {[key: string]: string} = {
  ['apartment']: 'Apartment',
  ['room']: 'Private Room',
  ['house']: 'House',
  ['hotel']: 'Hotel',
} as const;

export const NUMBER_ONE = 1;

export const Months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export enum Markers {
  Default = '/img/pin.svg',
  Active = '/img/pin-active.svg',
}

export enum City {
  Title = 'Amsterdam',
  Lat = 52.37454,
  Lng = 4.897976,
  Zoom = 13,
}

export enum PropertyClassName {
  MapPageOffer = 'property__map',
  MapPageMain = 'cities__map',
  PlaceCardListNear = 'near-places__list',
  PlaceCardItemNear = 'near-places',
  PlaceCardListCities = 'cities__places-list tabs__content',
  PlaceCardItemCities = 'cities',
}

export const Cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const SortList = {
  Popular: 'Popular',
  PriceLow: 'Price: low to high',
  PriceHigh: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;

export enum APIRoute {
  Offers = '/hotels',
  Offer = '/hotels/:id',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

export const TIMEOUT_SHOW_ERROR = 4000;

export const Regulars = {
  Numbers: /^(?=.*[0-9]).*$/,
  Symbols: /^(?=.*[A-Za-zА-Яа-я]).*$/,
} as const;
