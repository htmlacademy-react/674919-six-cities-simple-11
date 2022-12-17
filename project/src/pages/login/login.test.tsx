import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import Login from './login';
import HistoryRoute from '../../components/history-route/history-route';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus, Cities} from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';

describe('Component: AuthScreen', () => {
  const mockStore = configureMockStore();

  it('should render "AuthScreen" when user navigate to "login" url', async () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
      DATA: {city: Cities[0]}
    });
    const history = createMemoryHistory();
    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Login/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getAllByText(/Sign in/i)[0]).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('login'), 'keks');
    await userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
