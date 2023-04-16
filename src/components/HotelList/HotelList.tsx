/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './HotelList.scss';

import { HotelCard } from '../HotelCard';
import { ExtendedHotelInfo } from '../../types';
import { FilterSelector } from '../FilterSelector';
import { Loader } from '../Loader';
import { animated, config, useSpring } from 'react-spring';
import errorImage from './../../images/iconss/500 Internal Server Error-cuate 1.svg';
import noResultImage from './../../images/iconss/House searching-rafiki 1.svg';
import { reverseTransformString } from '../../api/booking';

type Props = {
  responseError: boolean
  hotels: ExtendedHotelInfo[] | null
  setHotels: React.Dispatch<React.SetStateAction<ExtendedHotelInfo[] | null>>
}

// function capitalizeWords(str: string): string {
//   return str.replace(/\b\w/g, function (ltr) { return ltr.toUpperCase(); });
// }

export const HotelList: React.FC<Props> = ({
  hotels,
  setHotels,
  responseError
}) => {
  const [numItemsToShow, setNumItemsToShow] = useState(4); const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get('city') || '';

  const fadeAnim = useSpring({
    opacity: hotels ? 1 : 0,
    config: { duration: 100 },
  });

  if (responseError) {
    return (
      <div className="hotel-list">
        <div className="hotel-list__error">
          <img src={errorImage} alt="Error" />
          <h3 className='hotel-list__error-title title-x-black-700'>
            Sorry, it looks like the server is not responding.
          </h3>
          <span className='text-xx-gray-400'>
            Please try again later.
          </span>
        </div>
      </div>
    )
  }

  if (hotels && hotels.length === 0) {
    return (
      <div className="hotel-list">
        <div className="hotel-list__error">
          <img src={noResultImage} alt="Error" />
          <h3 className='hotel-list__error-title title-x-black-700'>
            Unfortunately, it looks like there are no available properties on the selected date.
          </h3>
          <span className='text-xx-gray-400'>
            Please try another search.
          </span>
        </div>
      </div>
    )
  }

  if (hotels && hotels.length !== 0) {
    return (
      <animated.div
        className="hotel-list"
      >
        <div className="hotel-list__top-section">
          <span className='hotel-list__amount title-x-black-700'>
            {`${reverseTransformString(city) || 'All hotels'}: ${hotels?.length} properties`}
          </span>
          <div className='hotel-list__section-x'>
            <FilterSelector
              hotels={hotels}
              setHotels={setHotels}
            />
          </div>
        </div>

        {hotels?.slice(0, numItemsToShow)?.map(hotel => {
          return (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
            />
          )
        })
        }

        {numItemsToShow <= hotels?.length && (
          <button
            onClick={() => { setNumItemsToShow(prev => prev + 3) }}
            className='hotel-list__btn button'
          >
            Show more variants
          </button>
        )}
      </animated.div>
    )
  }
  else {
    return (
      <div className='hotel-list'>
        <Loader />
      </div>
    );
  }
};
