/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import './HotelList.scss'
import Carousel from '../Carousel/Carousel';
import { HotelCard } from '../HotelCard';
import { ExtendedHotelInfo } from '../../types';
import { FilterSelector } from '../FilterSelector';

type Props = {
  hotels: ExtendedHotelInfo[] | null
}

export const HotelList: React.FC<Props> = ({ hotels }) => {

  const [numItemsToShow, setNumItemsToShow] = useState(4);


  if (!hotels) {
    return <div>there is no any hotel</div>
  }
  return (
    <div className="hotel-list">
      <div className="hotel-list__top-section">
        <span className='hotel-list__amount title-x-black-700'>
          {`Odesa: ${hotels?.length} properties`}
        </span>
        <div className='hotel-list__section-x'>
          {/* < className='hotel-list__'>
            
            </span> */}
          <FilterSelector />
        </div>
      </div>


      {hotels?.slice(0, numItemsToShow)?.map(card => {
        return (
          <HotelCard
            key={card.id}
            hotel={card}
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

    </div>
  )
};
