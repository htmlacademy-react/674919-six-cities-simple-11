import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import PlacesSorting from './places-sorting';
import {Cities} from '../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: PlacesSorting', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <PlacesSorting currentSortName={Cities[0]}/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });
});
