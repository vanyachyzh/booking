import React, { useContext, useEffect, useState } from 'react';
import './RoomCard.scss';

import { RoomInfo } from '../../types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Amenity } from '../Amenity';
import { AuthContext } from '../../App';
import { getDaysBetweenDates } from '../../api/booking';

type Props = {
  room: RoomInfo | undefined,
  setIsWarning: React.Dispatch<React.SetStateAction<boolean>>
};

export const RoomCard: React.FC<Props> = ({ room, setIsWarning }) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hotel_id = searchParams.get('hotel_id') || '';
  const dateFrom = searchParams.get('dateFrom') || '';
  const dateTo = searchParams.get('dateTo') || '';

  // console.log(room)

  const days = getDaysBetweenDates(dateFrom, dateTo);

  const onButtonClick = () => {
    if (context && !context.user) {
      navigate(`/login`);
    }

    if (!dateFrom || !dateTo) {
      const element = document.getElementById('overview');

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsWarning(true)
      }

      return;
    }
    if (context && room) {
      context.setRoom(room);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('hotel_id', String(hotel_id));
      const updatedSearchParams = newSearchParams.toString();
      navigate(`/payment?${updatedSearchParams}`);
    }
  }

  if (room) {
    return (
      <div className="room-card">
        <span className="room-card__hotel-name">
          {room.name}
        </span>

        <ul
          className="room-card__amenities"
        >
          {room.amenities.slice(0, 4).map(amenity => (
            <li
              className="room-card__amenity"
              key={amenity}
            >
              <Amenity type={amenity} />
            </li>
          ))}
        </ul>

        <span
          className="room-card__price"
        >
          {`$${days ? days * room.price : room.price}`}
        </span>

        <button
          onClick={onButtonClick}
          className="room-card__reserve-button button"
        >
          Reserve
        </button>
      </div>
    )
  } else {
    return null;
  }
};
