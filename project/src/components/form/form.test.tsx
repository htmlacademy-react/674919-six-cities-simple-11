import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import Form from './form';
import {ReviewStatus} from '../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  REVIEWS: {
    isReviewsLoading: ReviewStatus.ReviewRest,
  }
});

describe('Component: Form', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <Form/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
  });
});
