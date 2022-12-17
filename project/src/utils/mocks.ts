import {address, lorem, datatype, image, name} from 'faker';
import {Review, Reviews} from '../types/reviews';
import {Offer, Offers} from '../types/offers';

export const makeFakeReview = (): Review => ({
  comment: lorem.paragraph(),
  date: String(datatype.datetime()),
  id: datatype.number(),
  rating: datatype.number(5),
  user: {
    avatarUrl: image.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.findName(),
  }
} as Review);

export const makeFakeReviews = (): Reviews => {
  const reviews: Reviews = [];
  for (let i = 0; i < datatype.number(10); i++) {
    reviews.push(makeFakeReview());
  }

  return reviews;
};

export const makeFakeLogin = (): string => (name.findName());

export const makeFakeCity = (): string => (address.cityName());

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number(5),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(7),
    },
    name: address.cityName(),
  },
  description: lorem.words(),
  goods: datatype.array(datatype.number(7)),
  host: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.findName(),
  },
  id: datatype.number(),
  images: [image.imageUrl()],
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(7),
  },
  maxAdults: datatype.number(5),
  previewImage: image.imageUrl(),
  price: datatype.number(700),
  rating: datatype.number(5),
  title: lorem.words(),
  type: lorem.words(),
} as Offer);

export const makeFakeOffers = (): Offers => {
  const reviews: Offers = [];
  for (let i = 0; i < datatype.number(17); i++) {
    reviews.push(makeFakeOffer());
  }

  return reviews;
};
