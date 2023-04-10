/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import './HotelList.scss'
import Carousel from '../Carousel/Carousel';
import { HotelCard } from '../HotelCard';
import { ExtendedHotelInfo } from '../../types';
import { FilterSelector } from '../FilterSelector';
import { useSearchParams } from 'react-router-dom';

function reverseTransformString(str: string) {
  // Замінюємо всі входження "%20" на пробіли за допомогою методу replace() та регулярного виразу.
  str = str.replace(/%20/g, ' ');

  // Розділяємо рядок на слова за допомогою методу split() та пробілу.
  const words = str.split(' ');

  // Перетворюємо першу літеру кожного слова на велику, а інші - на малу.
  const transformedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  // Об'єднуємо слова знову разом за допомогою методу join().
  const transformedString = transformedWords.join(' ');

  return transformedString;
}

type Props = {
  hotels: ExtendedHotelInfo[] | null
  setHotels: React.Dispatch<React.SetStateAction<ExtendedHotelInfo[] | null>>
}

function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, function(ltr) { return ltr.toUpperCase(); });
}

export const HotelList: React.FC<Props> = ({ hotels, setHotels }) => {

  const [numItemsToShow, setNumItemsToShow] = useState(4);  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get('city') || '';


  if (!hotels) {
    return <div className='hotel-list__no-hotel'></div>
  }
  return (
    <div className="hotel-list">
      <div className="hotel-list__top-section">
        <span className='hotel-list__amount title-x-black-700'>
          {`${reverseTransformString(city) || 'Somewhere'}: ${hotels?.length} properties`}
        </span>
        <div className='hotel-list__section-x'>
          <FilterSelector
            hotels={hotels}
            setHotels={setHotels}
          />
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
