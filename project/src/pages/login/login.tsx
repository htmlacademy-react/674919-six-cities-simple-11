import React, {ChangeEvent, FormEvent, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/selector';
import {loginAction} from '../../store/user-process/api';
import {AuthData} from '../../types/auth-data';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, Regulars} from '../../const';
import {getCurrentCity} from '../../store/data/selector';

const Login = (): JSX.Element => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const currentCity = useAppSelector(getCurrentCity);
  const navigate = useNavigate();

  useEffect(() => {
    let isNeedUpdate = true;

    if (authorizationStatus === AuthorizationStatus.Auth && isNeedUpdate) {
      navigate(AppRoute.Main);
    }

    return () => {
      isNeedUpdate = false;
    };
  }, [navigate, authorizationStatus]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const authData: AuthData = {
        login: loginRef.current.value,
        password: passwordRef.current.value,
      };

      dispatch(loginAction(authData));
    }
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    const {value} = target;

    if (!Regulars.Numbers.test(value) || !Regulars.Symbols.test(value)) {
      target.setCustomValidity('Пароль должен состоять минимум из одной буквы и цифры');
    } else {
      target.setCustomValidity('');
    }
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>

          <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" data-testid="login" ref={loginRef} type="email" name="email" placeholder="Email" required/>
            </div>

            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" data-testid="password" ref={passwordRef} onChange={handlePasswordChange} type="password" name="password" placeholder="Password" required/>
            </div>

            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>

        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to="/">
              <span>{currentCity}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
