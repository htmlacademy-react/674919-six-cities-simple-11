import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../name-space';
import {fetchReviewsOfOffersAction, sendReviewOfOfferAction} from './api';
import {ReviewStatus} from '../../const';
import {ReviewsProcess} from '../../types/state';

const initialState: ReviewsProcess = {
  isReviewsLoading: ReviewStatus.ReviewRest,
  reviewsOfOffer: [],
};

const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setReviewRestStatus: (state) => {
      state.isReviewsLoading = ReviewStatus.ReviewRest;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsOfOffersAction.fulfilled, (state, action) => {
        state.reviewsOfOffer = action.payload;
      })
      .addCase(sendReviewOfOfferAction.pending, (state, action) => {
        state.isReviewsLoading = ReviewStatus.ReviewPending;
      })
      .addCase(sendReviewOfOfferAction.fulfilled, (state, action) => {
        state.reviewsOfOffer = action.payload;
        state.isReviewsLoading = ReviewStatus.ReviewFulfilled;
      });
  },
});

export const {setReviewRestStatus} = reviewsProcess.actions;
export default reviewsProcess.reducer;
