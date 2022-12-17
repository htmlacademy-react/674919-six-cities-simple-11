import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import PageNotExist from './page-not-exist';
import HistoryRoute from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../const';

describe('Component: PageNotExist', () => {
  const mockStore = configureMockStore();

  it('should render correctly', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <PageNotExist/>
        </HistoryRoute>
      </Provider>
    );

    const headerElement = screen.getByText('404 Not Found');

    expect(headerElement).toBeInTheDocument();
  });
});
