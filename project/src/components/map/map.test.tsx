import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import Map from './map';
import {Cities, PropertyClassName} from '../../const';
import {makeFakeOffers, makeFakeOffer} from '../../utils/mocks';
import {City} from '../../const';

const offers = makeFakeOffers();
const offer = makeFakeOffer();

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    city: Cities[0],
  }
});

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Map offers={offers} city={City} activeOffer={offer} elementClassName={PropertyClassName.MapPageMain}/>
        </HistoryRoute>
      </Provider>
    );
  });
});
