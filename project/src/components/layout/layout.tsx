import React, {MouseEvent, memo} from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, PageModifierClassType} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthorizationStatus, getLogin} from '../../store/user-process/selector';
import {logoutAction} from '../../store/user-process/api';
import LoadingScreen from '../loading-screen/loading-screen';
import {getOffersDataLoadingStatus} from '../../store/data/selector';

const Layout = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const login = useAppSelector(getLogin);
  const params = useLocation();
  const pageClassName = PageModifierClassType[params.pathname];

  const handleLogoutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <div className={`page ${pageClassName ? pageClassName : ''}`}>
      <header className="header" data-testid="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              { AppRoute.Main === params.pathname ?
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
                :
                <Link className="header__logo-link" to={AppRoute.Main} title="Перейти на главную">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>}
            </div>


            { AppRoute.Login !== params.pathname &&
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

                        <a className="header__nav-link" href="#" onClick={handleLogoutClick}>
                          <span className="header__signout">Sign out</span>
                        </a>
                    }
                  </li>
                </ul>
              </nav>}
          </div>
        </div>
      </header>

      {isOffersDataLoading &&
        <LoadingScreen/>}
      <Outlet/>
    </div>
  );
};

export default memo(Layout);
