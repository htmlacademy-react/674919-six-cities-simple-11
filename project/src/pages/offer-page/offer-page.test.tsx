import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import OfferPage from './offer-page';
import {AuthorizationStatus} from '../../const';
import {makeFakeOffers, makeFakeOffer, makeFakeReviews} from '../../utils/mocks';
import {State} from '../../types/state';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../../services/api';

const offers = makeFakeOffers();
const offer = makeFakeOffer();
const reviews = makeFakeReviews();

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  DATA: {
    offer,
    offersNear: offers,
  },
  REVIEWS: {
    reviewsOfOffer: reviews,
  }
});

describe('Component: OfferPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <OfferPage/>
        </HistoryRoute>
      </Provider>
    );
  });
});
