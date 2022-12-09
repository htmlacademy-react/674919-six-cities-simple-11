import {PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {rootReducer} from '../root-reducer';
import {redirectToRoute} from '../action';
import {AppRoute} from '../../const';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'page/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        if (action.type === 'data/fetchOneOffer/rejected') {
          store.dispatch(redirectToRoute(AppRoute.PageNotExist));
        }

        return next(action);
      };
