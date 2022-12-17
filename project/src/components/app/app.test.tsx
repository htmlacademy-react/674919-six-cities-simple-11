import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import App from './app';
import {AppRoute, AuthorizationStatus} from '../../const';
import {makeFakeOffer, makeFakeOffers, makeFakeReviews} from '../../utils/mocks';
import {State} from '../../types/state';
import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const offers = makeFakeOffers();
const offer = makeFakeOffer();
const reviews = makeFakeReviews();
const OFFER_ID = 1;

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  DATA: {
    offers: [],
    offer,
    offersNear: offers,
    isOffersDataLoading: false,
  },
  REVIEWS: {
    reviewsOfOffer: reviews,
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRoute history={history}>
      <App />
    </HistoryRoute>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" page when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should render "Login" page when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigate to "/offer/:id"', () => {
    history.push(`/offer/${OFFER_ID}`);

    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "PageNotExist" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
