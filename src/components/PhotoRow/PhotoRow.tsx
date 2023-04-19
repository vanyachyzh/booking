import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PhotoRow.scss';

import { HotelInfo } from '../../types';

type Props = {
  hotel: HotelInfo,
}

export const PhotoRow: React.FC<Props> = ({ hotel }) => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onButtonClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('hotel_id', String(hotel.id));
    const updatedSearchParams = newSearchParams.toString();
    navigate(`/photos?${updatedSearchParams}`)
  }
  return (
    <div className="container">
      <div className="photo-row">
        {hotel.picturesUrl?.slice(0, 5).map((image, index) => (
          <img
            key={index}
            className={`photo-row--${hotel.picturesUrl?.slice(0, 5).length}-${index + 1}`}
            src={image}
            alt="Hotel"
          />
        ))}

        <button
          onClick={onButtonClick}
          className='photo-row__btn button'
        >
          Show all
        </button>
      </div>
    </div>
  )
};
