import reviewsProcess, {setReviewRestStatus} from './reviews-process';
import {fetchReviewsOfOffersAction, sendReviewOfOfferAction} from './api';
import {ReviewStatus} from '../../const';
import {makeFakeReviews} from '../../utils/mocks';
import {ReviewsProcess} from '../../types/state';

const reviews = makeFakeReviews();

describe('Reducer: reviewsProcess', () => {
  let state: ReviewsProcess;

  beforeEach(() => {
    state = {isReviewsLoading: ReviewStatus.ReviewRest, reviewsOfOffer: []};
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewsProcess(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({isReviewsLoading: ReviewStatus.ReviewRest, reviewsOfOffer: []});
  });

  it('should return initial state of isReviewsLoading', () => {
    expect(reviewsProcess(state, setReviewRestStatus()))
      .toEqual({isReviewsLoading: ReviewStatus.ReviewRest, reviewsOfOffer: []});
  });

  it('should update state reviewsOfOffer by load reviews of offer', () => {
    expect(reviewsProcess(state, {type: fetchReviewsOfOffersAction.fulfilled.type, payload: reviews}))
      .toEqual({isReviewsLoading: ReviewStatus.ReviewRest, reviewsOfOffer: reviews});
  });

  it('should update status loading, when pending review of offer', () => {
    expect(reviewsProcess(state, {type: sendReviewOfOfferAction.pending.type}))
      .toEqual({isReviewsLoading: ReviewStatus.ReviewPending, reviewsOfOffer: []});
  });

  it('should update status loading and reviews, when server is answer', () => {
    expect(reviewsProcess(state, {type: sendReviewOfOfferAction.fulfilled.type, payload: reviews}))
      .toEqual({isReviewsLoading: ReviewStatus.ReviewFulfilled, reviewsOfOffer: reviews});
  });
});
