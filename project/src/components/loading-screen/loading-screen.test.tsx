import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import LoadingScreen from './loading-screen';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <LoadingScreen/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
