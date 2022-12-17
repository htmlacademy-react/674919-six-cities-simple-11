import userProcess from './user-process';
import {checkAuthAction, loginAction, logoutAction} from './api';
import {AuthorizationStatus} from '../../const';
// import {makeFakeLogin} from '../../utils/mocks';
import {UserProcess} from '../../types/state';

// const fakeLogin = makeFakeLogin();

describe('Reducer: userProcess', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      login: '',
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess(state, {type: checkAuthAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, login: undefined});
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess(state, {type: checkAuthAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, login: ''});
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess(state, {type: loginAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, login: undefined});
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess(state, {type: loginAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, login: ''});
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess(state, {type: logoutAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, login: ''});
    });
  });
});
