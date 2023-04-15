/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import './RoomCard.scss'
import Carousel from '../Carousel/Carousel';
import { ExtendedHotelInfo, RoomInfo } from '../../types';
import { Link } from 'react-router-dom';
import { Amenity } from '../Amenity';

type Props = {
  room: RoomInfo | undefined,
};


export const RoomCard: React.FC<Props> = ({ room }) => {

  if (room) {
    return (
      <div className="room-card">
        <span className="room-card__hotel-name">
          {room.hotelName}
        </span>

        <ul
          className="room-card__amenities"
        >
          {room.amenities.map(amenity => (
            <li
              className="room-card__amenity"
              key={amenity}
            >
              <Amenity type={amenity} />
            </li>
          ))}
        </ul>

        {/* <button className="room-card__see-more-button">
          See all
        </button> */}

        <span
          className="room-card__price"
        >
          {`$${room.price}`}
        </span>

        <button
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
