import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import MainEmpty from './main-empty';
import {Cities} from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    city: Cities[0],
  }
});

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <MainEmpty/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText(`We could not find any property available at the moment in ${Cities[0]}`)).toBeInTheDocument();
  });
});
