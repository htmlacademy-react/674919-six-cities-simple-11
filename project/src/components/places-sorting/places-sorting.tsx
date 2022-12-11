import React, {useState, MouseEvent, memo} from 'react';
import {SortList} from '../../const';
import {useAppDispatch} from '../../hooks';
import {setSortName} from '../../store/data/data';

type PlacesSortingProps = {
  currentSortName: string;
};

const PlacesSorting = ({currentSortName}: PlacesSortingProps): JSX.Element => {
  const [isSortOpen, setSortOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleSortStateOpen = () => {
    setSortOpen(!isSortOpen);
  };

  const handleSortClick = (evt:MouseEvent<HTMLElement>) => {
    const {textContent} = (evt.target as HTMLElement);

    if (textContent) {
      dispatch(setSortName(textContent));
    }
  };

  return (
    <form className="places__sorting" action="#" method="get" onClick={handleSortStateOpen}>
      <span className="places__sorting-caption">Sort by</span>

      <span className="places__sorting-type" tabIndex={0}>&nbsp;{currentSortName}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${isSortOpen ? 'places__options--opened' : ''}`}>
        {
          Object.values(SortList).map((sortName) => (
            <li className={`places__option ${(currentSortName === sortName) ? 'places__option--active' : ''}`} onClick={handleSortClick} key={sortName} tabIndex={0}>{sortName}</li>
          ))
        }
      </ul>
    </form>
  );
};

export default memo(PlacesSorting);
