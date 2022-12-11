import React, {ChangeEvent, FormEvent, memo, useEffect, useRef, useState} from 'react';
import {FiveStar, ReviewStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {sendReviewOfOfferAction} from '../../store/reviews-process/api';
import {getReviewLoadingStatus} from '../../store/reviews-process/selector';
import {setReviewRestStatus} from '../../store/reviews-process/reviews-process';
import {useParams} from 'react-router-dom';

const Form = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const reviewStatus = useAppSelector(getReviewLoadingStatus);
  const [formData, setFormData] = useState({id: '', rating: '', review: ''});
  const formRef = useRef<HTMLFormElement>(null);
  const params = useParams();
  const paramsId = Number(params.id);

  const handleFormChange = (evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const isFormSend: boolean = (
    formData.review.length >= 50
    && formData.review.length <= 300
    && formData.rating.length !== 0
    && reviewStatus === ReviewStatus.ReviewRest
  );

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendReviewOfOfferAction(formData));
  };

  useEffect(() => {
    if (formData.id !== String(paramsId)) {
      setFormData({...formData, id: String(paramsId)});
    }

    if (reviewStatus === ReviewStatus.ReviewFulfilled) {
      setFormData({...formData, rating: '', review: ''});

      if (formRef.current !== null) {
        formRef.current.reset();
      }

      dispatch(setReviewRestStatus());
    }
  }, [reviewStatus, paramsId]);

  const handleRatingSelect = (star: string) => {
    if (star !== formData.rating) {
      setFormData({...formData, rating: star});
    }
  };

  return (
    <form className="reviews__form form" ref={formRef} action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {
          FiveStar.map((star) => (
            <React.Fragment key={star}>
              <input className="form__rating-input visually-hidden" name="rating" value={star} id={`${star}-stars`} type="radio"/>

              <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label" onClick={() => {handleRatingSelect(String(star));}} title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          ))
        }
      </div>

      <textarea className="reviews__textarea form__textarea" id="review" onChange={handleFormChange} name="review" value={formData.review} placeholder="Tell how was your stay, what you like and what can be improved" disabled={reviewStatus !== ReviewStatus.ReviewRest}></textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormSend}>Submit</button>
      </div>
    </form>
  );
};

export default memo(Form);
