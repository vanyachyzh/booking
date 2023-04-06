/* eslint-disable no-unneeded-ternary */
import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import className from 'classnames';
import { getSearchWith } from '../../utils';
import './FilterSelector.scss'

// type Props = {
//   users: User[] | null,
//   setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
// };

export const FilterSelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get('city') || '';

  const [isButtonActive, setIsButtonActive] = useState(false);

  const [isProposedVisible, setIsProposedVisible] = useState(false);
  const [proposedCities, setProposedCities] = useState<string[] | null>();

  const insertCity = (city: string) => {

    setSearchParams(
      getSearchWith(
        searchParams,
        { city },
      ),
    );

    setIsProposedVisible(false)


  }

  const onClick = () => {
    setIsProposedVisible(prev => !prev)
  }

  const filters = ['hjfhsdjfh0', 'sdsdsada', 'sdadas']

  return (
      <div className='filter'>
        <span className='filter__sort'>Sort by:</span>
        <button
          onClick={onClick}
          className={className(
            'filter__select text-xx-black-500',
            { 'filter__select--active': isProposedVisible },
            )}
        >
          { city ? city : 'Recommended'}
        </button>


        {isProposedVisible && (
          <div className='filter__list'>
            {filters.map(city => (
              <button
                onClick={() => insertCity(city)}
                key={Math.random()}
                className="filter__option text-x-black-500"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
  );
};