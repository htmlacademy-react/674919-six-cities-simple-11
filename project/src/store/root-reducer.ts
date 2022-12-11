import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from './name-space';
import data from './data/data';
import reviewsProcess from './reviews-process/reviews-process';
import userProcess from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: data,
  [NameSpace.Reviews]: reviewsProcess,
  [NameSpace.User]: userProcess,
});
