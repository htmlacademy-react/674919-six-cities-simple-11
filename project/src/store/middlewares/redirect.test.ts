import {configureMockStore} from '@jedmao/redux-mock-store';
import {redirect} from './redirect';
import {State} from '../../types/state';
import {AnyAction} from '@reduxjs/toolkit';
import {redirectToRoute} from '../action';
import {AppRoute} from '../../const';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Login),
    ]);
  });

  it('should be redirect to /404', () => {
    store.dispatch(redirectToRoute(AppRoute.PageNotExist));
    expect(fakeHistory.location.pathname).toBe(AppRoute.PageNotExist);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.PageNotExist),
    ]);
  });

  it('should be redirect to /main', () => {
    store.dispatch(redirectToRoute(AppRoute.Main));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Main);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Main),
    ]);
  });

  it('should not to be redirect /lose because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Lose});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Lose);
  });
});