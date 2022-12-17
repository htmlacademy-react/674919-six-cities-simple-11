import data, {changeCity, clearErrorAction, setError, setOffersDataLoadingStatus, setSortName} from './data';
import {fetchOffersAction, fetchOffersNearAction, fetchOneOfferAction} from './api';
import {Cities, SortList} from '../../const';
import {makeFakeCity, makeFakeOffer, makeFakeOffers} from '../../utils/mocks';
import {Data} from '../../types/state';

const fakeCity = makeFakeCity();
const offers = makeFakeOffers();
const offer = makeFakeOffer();

describe('Reducer: userProcess', () => {
  let state: Data;

  beforeEach(() => {
    state = {
      city: Cities[0],
      offer: null,
      offers: [],
      offersNear: [],
      sortName: SortList.Popular,
      isOffersDataLoading: false,
      isOfferDataLoading: false,
      error: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(data(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('data reducers usually process', () => {
    it('should change current city', () => {
      expect(data(state, changeCity(fakeCity)))
        .toEqual({...state, city: fakeCity});
    });

    it('should set sort name for offers', () => {
      expect(data(state, setSortName(SortList.PriceHigh)))
        .toEqual({...state, sortName: SortList.PriceHigh});
    });

    it('should set error of trouble from network', () => {
      expect(data(state, setError(null)))
        .toEqual({...state, error: null});
    });

    it('should clear error of trouble from network', () => {
      expect(data(state, clearErrorAction()))
        .toEqual({...state, error: null});
    });

    it('should set data loading status of offers', () => {
      expect(data(state, setOffersDataLoadingStatus()))
        .toEqual({...state, isOffersDataLoading: false});
    });
  });

  describe('fetchOffersAction test', () => {
    it('should change status isOffersDataLoading to "TRUE" if fetchOffersAction pending', () => {
      expect(data(state, {type: fetchOffersAction.pending.type}))
        .toEqual({...state, isOffersDataLoading: true});
    });

    it('should change status isOffersDataLoading to "FALSE" if fetchOffersAction rejected', () => {
      expect(data(state, {type: fetchOffersAction.rejected.type}))
        .toEqual({...state, isOffersDataLoading: false});
    });

    it('should change status isOffersDataLoading to "FALSE" and get all offers if fetchOffersAction fulfilled', () => {
      expect(data(state, {type: fetchOffersAction.fulfilled.type, payload: offers}))
        .toEqual({...state, offers, isOffersDataLoading: false});
    });
  });

  describe('fetchOneOfferAction test', () => {
    it('should change status isOffersDataLoading to "TRUE" if fetchOneOfferAction pending', () => {
      expect(data(state, {type: fetchOneOfferAction.pending.type}))
        .toEqual({...state, isOffersDataLoading: true});
    });

    it('should change status isOffersDataLoading to "FALSE" if fetchOneOfferAction rejected', () => {
      expect(data(state, {type: fetchOneOfferAction.rejected.type}))
        .toEqual({...state, isOffersDataLoading: false});
    });

    it('should change status isOffersDataLoading to "FALSE" and get one offers if fetchOneOfferAction fulfilled', () => {
      expect(data(state, {type: fetchOneOfferAction.fulfilled.type, payload: offer}))
        .toEqual({...state, offer, isOffersDataLoading: false});
    });
  });

  describe('fetchOffersNearAction test', () => {
    it('should set offers near current offer', () => {
      expect(data(state, {type: fetchOffersNearAction.fulfilled.type, payload: offers}))
        .toEqual({...state, offersNear: offers});
    });
  });
});
