import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import Main from './main';
import {Cities} from '../../const';
import {makeFakeOffers} from '../../utils/mocks';

const offers = makeFakeOffers();

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    city: Cities[0],
    offers,
  }
});

describe('Component: Main', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Main/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getAllByText(/Places/i)[0]).toBeInTheDocument();
    expect(screen.getByTestId('main')).toBeInTheDocument();
  });
});
