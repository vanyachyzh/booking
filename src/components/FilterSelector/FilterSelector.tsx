/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const handleClickOutside = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    console.log(clickedElement)
    if (!clickedElement.classList.contains('filter')
      && !clickedElement.classList.contains('filter__select')
      && !clickedElement.classList.contains('filter__list')
      && !clickedElement.classList.contains('filter__option')
      ) {
      setIsOpen(false)
    }
  };

  const handleClick = (): void => {
    setIsOpen(prev => !prev);
  };


  const insertCity = (city: string) => {

    setSearchParams(
      getSearchWith(
        searchParams,
        { city },
      ),
    );
  }

  const filters = ['hjfhsdjfh0', 'sdsdsada', 'sdadas']

  return (
      <div className='filter'>
        <span className='filter__sort'>Sort by:</span>
        <button
          onClick={handleClick}
          className={className(
            'filter__select text-xx-black-500',
            { 'filter__select--active': isOpen },
            )}
        >
          { city ? city : 'Recommended'}
        </button>


        {isOpen && (
          <div className='filter__list'>
            {filters.map(city => (
              <button
                onClick={() => insertCity(city)}
                key={city}
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