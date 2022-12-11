import {createAsyncThunk} from '@reduxjs/toolkit';
import {TIMEOUT_SHOW_ERROR} from '../const';
import {setError, setOffersDataLoadingStatus} from './data/data';

export const clearErrorAction = createAsyncThunk(
  'data/clearError',
  (_arq, {dispatch}) => {
    dispatch(setOffersDataLoadingStatus(false));
    setTimeout(
      () => dispatch(setError(null)
      ), TIMEOUT_SHOW_ERROR);
  },
);
