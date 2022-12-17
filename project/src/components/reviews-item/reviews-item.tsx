import React from 'react';
import {Review} from '../../types/reviews';
import {Months, Ratings} from '../../const';

type ReviewProps = {
  review: Review;
};

const ReviewsItem = ({review}: ReviewProps): JSX.Element => {
  const {comment, date, rating, user} = review;
  const ratingPercent = Ratings[Math.round(rating) - 1];
  const dateFormatted = new Date(date);
  const dateMonth = Months[dateFormatted.getMonth()];
  const dateYear = dateFormatted.getFullYear();

  return (
    <li className="reviews__item" >
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>

        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>

      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: ratingPercent}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>{dateMonth} {dateYear}</time>
      </div>
    </li>
  );
};

export default ReviewsItem;
