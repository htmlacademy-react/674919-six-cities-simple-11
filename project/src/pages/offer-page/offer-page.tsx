import React, {useEffect} from 'react';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import PlaceCards from '../../components/place-cards/place-cards';
import {useParams} from 'react-router-dom';
import {Offers} from '../../types/offers';
import {City, PropertiesName, PropertyClassName, PropertyFeatures, Ratings, NUMBER_ONE} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchOffersNearAction, fetchOneOfferAction} from '../../store/data/api';
import {getOffer, getOfferDataLoadingStatus, getOffersNear} from '../../store/data/selector';
import {fetchReviewsOfOffersAction} from '../../store/reviews-process/api';

const OfferPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getOffer);
  const isOffersDataLoading = useAppSelector(getOfferDataLoadingStatus);
  const offersNear = useAppSelector(getOffersNear);
  const params = useParams();
  const paramsId = Number(params.id);

  useEffect(() => {
    if (offer === null || offer.id !== paramsId) {
      dispatch(fetchOneOfferAction(paramsId));
      dispatch(fetchOffersNearAction(paramsId));
      dispatch(fetchReviewsOfOffersAction(paramsId));
    }
  }, [offer, paramsId]);


  if (isOffersDataLoading) {
    return <div>Загрузка данных...</div>;
  }

  if (!offer) {
    return <div>Такого офера нет</div>;
  }

  const offersNearChange: Offers = offersNear.concat([offer]);
  const {id, bedrooms, description, goods, host, images, isPremium, maxAdults, price, title, type, rating} = offer;
  const imagesSliced = images.slice(0, 6);
  const ratingPercent = Ratings[Math.round(rating) - 1];

  return (
    <main className="page__main page__main--property" data-id={id}>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {imagesSliced?.map((imageSrc, index) => {
              const ketValue = `image-${index}`;
              return (
                <div className="property__image-wrapper" data-key={`${imageSrc}`} key={ketValue}>
                  <img className="property__image" src={imageSrc} alt={title}/>
                </div>);
            })}
          </div>
        </div>

        <div className="property__container container">
          <div className="property__wrapper">
            {
              isPremium &&

              <div className="property__mark">
                <span>Premium</span>
              </div>
            }

            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
            </div>

            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: ratingPercent}}></span>
                <span className="visually-hidden">Rating</span>
              </div>

              <span className="property__rating-value rating__value">{rating}</span>
            </div>

            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {PropertyFeatures[type]}
              </li>

              <li className="property__feature property__feature--bedrooms">
                {bedrooms} {(bedrooms === NUMBER_ONE ? PropertiesName.Bedroom : PropertiesName.Bedrooms)}
              </li>

              <li className="property__feature property__feature--adults">
                Max {maxAdults} {(maxAdults === NUMBER_ONE ? PropertiesName.Adult : PropertiesName.Adults)}
              </li>
            </ul>

            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>

              <span className="property__price-text">&nbsp;night</span>
            </div>

            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>

              <ul className="property__inside-list">
                {
                  goods.map((good) => (
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>

              <div className="property__host-user user">
                <div className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''}`}>
                  <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                </div>

                <span className="property__user-name">
                  {host.name}
                </span>

                { host.isPro &&
                  <span className="property__user-status">
                    Pro
                  </span>}
              </div>

              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>

            <ReviewsList/>
          </div>
        </div>
        {
          offersNear &&
          <Map offers={offersNearChange} city={City} activeOffer={offer} elementClassName={PropertyClassName.MapPageOffer}/>
        }
      </section>

      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>

          <PlaceCards offers={offersNear} onSetActiveOffer={() => null} listClassName={PropertyClassName.PlaceCardListNear} itemClassName={PropertyClassName.PlaceCardItemNear}/>
        </section>
      </div>
    </main>
  );
};

export default OfferPage;
