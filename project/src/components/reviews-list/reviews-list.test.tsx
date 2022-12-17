import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import ReviewsList from './reviews-list';
import {makeFakeReviews} from '../../utils/mocks';
import {AuthorizationStatus} from '../../const';

const fakeReviews = makeFakeReviews();

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  REVIEWS: {
    reviewsOfOffer: fakeReviews,
  }
});

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <ReviewsList/>
        </HistoryRoute>
      </Provider>
    );
  });
});
