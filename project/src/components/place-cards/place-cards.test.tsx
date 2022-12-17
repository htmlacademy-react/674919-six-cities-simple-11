import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import PlaceCards from './place-cards';
import {makeFakeOffers} from '../../utils/mocks';
import {PropertyClassName} from '../../const';

const offers = makeFakeOffers();

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: PlaceCards', () => {
  it('should render correctly', () => {
    const fakeHandleActiveOfferChange = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <PlaceCards offers={offers} onSetActiveOffer={fakeHandleActiveOfferChange} listClassName={PropertyClassName.PlaceCardListCities} itemClassName={PropertyClassName.PlaceCardItemCities}/>
        </HistoryRoute>
      </Provider>
    );

    expect(screen.getByTestId('places-list')).toBeInTheDocument();
  });
});
