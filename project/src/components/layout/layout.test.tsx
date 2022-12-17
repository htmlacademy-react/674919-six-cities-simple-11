import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import Layout from './layout';
import {AuthorizationStatus} from '../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  DATA: {
    isOffersDataLoading: false,
  }
});

describe('Component: Layout', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Layout/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
