import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRoute from '../../components/history-route/history-route';
import PlaceCard from './place-card';
import {makeFakeOffer} from '../../utils/mocks';
import {PropertyClassName} from '../../const';

const offer = makeFakeOffer();

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: PlaceCard', () => {
  it('should render correctly', () => {
    const fakeHandleActiveOfferChange = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRoute history={history}>
          <PlaceCard offer={offer} onSetActiveOffer={fakeHandleActiveOfferChange} itemClassName={PropertyClassName.PlaceCardItemCities}/>
        </HistoryRoute>
      </Provider>
    );
  });
});
