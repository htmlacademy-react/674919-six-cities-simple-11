import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

const PageNotExist = (): JSX.Element => (
  <div className="page page--gray">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Main} title="Перейти на главную">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <div className="header__nav-profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>

                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </div>
              </li>

              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className="page__main page__main--property">
      <div className="container">
        404 Not Found
      </div>
    </main>
  </div>
);

export default PageNotExist;
