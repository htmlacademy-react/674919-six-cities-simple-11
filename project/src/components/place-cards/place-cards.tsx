import React, {memo} from 'react';
import PlaceCard from '../place-card/place-card';
import {Offer, Offers} from '../../types/offers';

type PlaceCardsProps = {
  offers: Offers;
  onSetActiveOffer: (offer: Offer | undefined) => void;
  listClassName: string;
  itemClassName: string;
};

const PlaceCards = ({offers, onSetActiveOffer, listClassName, itemClassName}: PlaceCardsProps): JSX.Element => (
  <div className={`${listClassName} places__list`} data-testid="places-list">
    {
      offers && offers.map((offer) => (
        <PlaceCard offer={offer} onSetActiveOffer={onSetActiveOffer} itemClassName={itemClassName} key={offer.id}/>
      ))
    }
  </div>
);

export default memo(PlaceCards);
