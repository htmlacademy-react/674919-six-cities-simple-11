import React, {MouseEvent, memo} from 'react';
import {Cities} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCurrentCity} from '../../store/data/selector';
import {changeCity} from '../../store/data/reducer';

const CitiesList = (): JSX.Element => {
  const activeCity = useAppSelector(getCurrentCity);
  const dispatch = useAppDispatch();

  const handleLinkCityChange = (evt: MouseEvent<HTMLAnchorElement>, city: string) => {
    evt.preventDefault();
    dispatch(changeCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {
        Cities.map((city) => (
          <li className="locations__item" key={city}>
            <a className={`locations__item-link tabs__item${(city === activeCity) ? ' tabs__item--active' : ''}`} href="#" onClick={(evt) => {handleLinkCityChange(evt, city);}}>
              <span>{city}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
};

export default memo(CitiesList);
