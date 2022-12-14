import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {State} from '../../types/state';
import {APIRoute} from '../../const';
import {AuthData} from '../../types/auth-data';
import {UserData} from '../../types/user-data';
import {dropToken, saveToken} from '../../services/token.';

export const checkAuthAction = createAsyncThunk<string, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data : {email}} = await api.get<UserData>(APIRoute.Login);
    return email;
  }
);

export const loginAction = createAsyncThunk<string, AuthData, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data : {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    return email;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
