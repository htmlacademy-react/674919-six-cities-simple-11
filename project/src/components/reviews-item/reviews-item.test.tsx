import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import ReviewsItem from './reviews-item';
import {makeFakeReview} from '../../utils/mocks';

const fakeReview = makeFakeReview();

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <ReviewsItem review={fakeReview}/>
        </HistoryRoute>
      </Provider>
    );
  });
});
