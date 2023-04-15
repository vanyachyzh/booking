/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react';
// import { CSSTransition } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import className from 'classnames';
import { getSearchWith } from '../../utils';
import './FilterSelector.scss'
import { ExtendedHotelInfo, HotelInfo } from '../../types';

type Props = {
  hotels: ExtendedHotelInfo[],
  setHotels: React.Dispatch<React.SetStateAction<ExtendedHotelInfo[] | null>>
}

export const FilterSelector: React.FC<Props> = ({ hotels, setHotels }) => {
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

  const sorts = [
    { key: 'price', order: 'asc', name: 'Price (lowest first)' },
    { key: 'price', order: 'desc', name: 'Price (highest first)' },
    { key: 'rating', order: 'asc', name: 'Guest rating (lowest first)' },
    { key: 'rating', order: 'desc', name: 'Guest rating (highest first)' },
    { key: 'recommended', order: 'asc', name: 'Recommended (lowest first)' },
    { key: 'recommended', order: 'desc', name: 'Recommended (highest first)' },
    { key: 'stars', order: 'asc', name: 'Property class (lowest first)' },
    { key: 'stars', order: 'desc', name: 'Property class (highest first)' },
  ]

  const onPressButton = (type: string, order: string, name: string) => {
    fetch(`http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/sort?sortBy=${type} ${order}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hotels)
    })
      .then(r => r.json())
      .then(r => {
        setHotels(r);
        setCurrentSort(name);
      })
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
          {sorts.map(sort => (
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