import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {Offer} from '../../types/offers';
import {Ratings} from '../../const';

type PlaceCardProps = {
  offer: Offer;
  onSetActiveOffer: (offer: Offer | undefined) => void;
  itemClassName: string;
};

const PlaceCard = ({offer, onSetActiveOffer, itemClassName}: PlaceCardProps): JSX.Element => {
  const {id, previewImage, isPremium, price, title, type, rating} = offer;
  const ratingPercent = Ratings[Math.round(rating) - 1];

  return (
    <article className={`${itemClassName}__card place-card`} onMouseOver={() => {onSetActiveOffer(offer);}} onMouseLeave={() => {onSetActiveOffer(undefined);}}>
      { isPremium &&

        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>

            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingPercent}}></span>

            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>

        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default memo(PlaceCard);
