import React, {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/user-process/api';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthorizationStatus, getLogin} from '../../store/user-process/selector';

const PageNotExist = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const login = useAppSelector(getLogin);

  const HandleLinkLogout = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
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
                {authorizationStatus === AuthorizationStatus.Auth &&
                  <li className="header__nav-item user">
                    <div className="header__nav-profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>

                      <span className="header__user-name user__name">{login}</span>
                    </div>
                  </li>}

                <li className="header__nav-item">
                  {
                    authorizationStatus !== AuthorizationStatus.Auth ?
                      <Link className="header__nav-link" to={AppRoute.Login}>
                        <span className="header__signout">Sign in</span>
                      </Link>
                      :

                      <a className="header__nav-link" href="#" onClick={HandleLinkLogout}>
                        <span className="header__signout">Sign out</span>
                      </a>
                  }
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
};

export default PageNotExist;
