/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react';
// import { CSSTransition } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import className from 'classnames';
import { getSearchWith } from '../../utils';
import './FilterSelector.scss'
import { ExtendedHotelInfo, HotelInfo } from '../../types';
import { SORT_TYPES, COUNTRY_CODES } from '../../api/booking';

type Props = {
  hotels?: ExtendedHotelInfo[],
  setHotels?: React.Dispatch<React.SetStateAction<ExtendedHotelInfo[] | null>>
  value?: string,
  setValue?: React.Dispatch<React.SetStateAction<string>>,
}

export const FilterSelector: React.FC<Props> = ({ hotels, setHotels, value, setValue }) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const filter = searchParams.get('filter') || '';
  const [currentSort, setCurrentSort] = useState('')
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const handleClickOutside = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.classList.contains('filter')
      && !clickedElement.classList.contains('filter__select')
    ) {
      setIsOpen(false)
    }
  };

  const handleClick = (): void => {
    setIsOpen(prev => !prev);
  };

  const onPressButton = (type: string, order: string, name: string) => {
    fetch(`https://innjoy.space/hotels/sort?sortBy=${type} ${order}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hotels)
    })
      .then(r => r.json())
      .then(r => {
        if (setHotels) {
          setHotels(r);
          setCurrentSort(name);
        }
      })
  }

  if (value && setValue) {
    return (
      <div className='filter filter--phone'>
        <button
          onClick={handleClick}
          className={className(
            'filter__select text-xx-black-500',
            { 'filter__select--active': isOpen },
          )}
        >
          {value}
        </button>
  
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames="my-node"
          unmountOnExit
        >
          <div className='filter__list filter__list--phone'>
            {COUNTRY_CODES.map(code => (
              <button
                onClick={() => setValue(code)}
                key={code}
                className="filter__option filter__option--phone text-x-black-500"
              >
                {code}
              </button>
            ))}
          </div>
        </CSSTransition>
      </div>
    );
  }

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
        {currentSort || 'Recommended (highest first)'}
      </button>

      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="my-node"
        unmountOnExit
      >
        <div className='filter__list'>
          {SORT_TYPES.map(sort => (
            <button
              onClick={() => onPressButton(sort.key, sort.order, sort.name)}
              key={sort.name}
              className="filter__option text-x-black-500"
            >
              {sort.name}
            </button>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};
