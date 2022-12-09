import React, {useCallback, useState} from 'react';
import PlaceCards from '../../components/place-cards/place-cards';
import {Offer} from '../../types/offers';
import Map from '../../components/map/map';
import {City, PropertyClassName} from '../../const';
import CitiesList from '../../components/cities-list/cities-list';
import {useAppSelector} from '../../hooks';
import MainEmpty from '../../components/main-empty/main-empty';
import PlacesSorting from '../../components/places-sortting/places-sorting';
import {NameSpace} from '../../store/name-space';
import {getCurrentCity, getOffersCitySorted} from '../../store/data/selector';

const Main = (): JSX.Element => {
  const activeCity = useAppSelector(getCurrentCity);
  const currentSortName = useAppSelector((state) => state[NameSpace.Data].sortName);
  const [activeOffer, setActiveOffer] = useState<Offer | undefined>(undefined);
  const offersOfCity = useAppSelector(getOffersCitySorted);

  const handleChangeActiveOffer = useCallback(
    (offerA: Offer | undefined) => setActiveOffer(offerA),
    []
  );

  const emptyCityClass = !offersOfCity.length ? 'page__main--index-empty' : '';

  return (
    <main className={`page__main page__main--index ${emptyCityClass}`}>
      <h1 className="visually-hidden">Cities</h1>

      <div className="tabs">
        <section className="locations container">
          <CitiesList/>
        </section>
      </div>

      {
        (offersOfCity.length) > 0 ? (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>

                <b className="places__found">{offersOfCity.length} places to stay in {activeCity}</b>

                <PlacesSorting
                  currentSortName={currentSortName}
                />

                <PlaceCards offers={offersOfCity} onSetActiveOffer={handleChangeActiveOffer} listClassName={PropertyClassName.PlaceCardListCities} itemClassName={PropertyClassName.PlaceCardItemCities}/>
              </section>

              <div className="cities__right-section">
                <Map offers={offersOfCity} city={City} activeOffer={activeOffer} elementClassName={PropertyClassName.MapPageMain}/>
              </div>
            </div>
          </div>
        )
          : <MainEmpty/>
      }

    </main>
  );
};

export default Main;
