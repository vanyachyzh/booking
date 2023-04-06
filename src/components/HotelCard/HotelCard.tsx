/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import './HotelCard.scss'
import Carousel from '../Carousel/Carousel';
import { ExtendedHotelInfo } from '../../types';

type Props = {
  hotel: ExtendedHotelInfo,
};

export const HotelCard: React.FC<Props> = ({ hotel }) => {
  const mapUrl
    = `https://google.com/maps/search/${hotel.city}, ${hotel.address}`;


  const stars = [];

  for (let i = 0; i < hotel.stars; i++) {
    stars.push(<div key={i} className="card__star"></div>);
  }

  return (
    <div className="card">
      <div className="card__carousel">
        {hotel && (
          <Carousel
            images={hotel.picturesUrl}
            step={1}
            frameSize={1}
            itemWidth={277}
            animationDuration={500}
            isFiniteCarousel={false}
          />
        )}
      </div>

      <div className="card__info">
        <div className="card__section">
          <h2 className='card__name title-x-black-700'>{hotel?.name}</h2>

          <div className="card__stars">
            {stars}
          </div>

          <a
            href={mapUrl}
            className='card__map text-xx-gray-400'
          >
            Location
          </a>
        </div>

        <div className="card__section">
          <div className="card__features">
            
            <span className='card__feature text-x-green-500'>Feature</span>
            <span className='card__feature text-x-green-500'>Another Feature</span>
          </div>
        </div>

        <div className="card__section">
          <div className="card__popular">
            <span className='card__rating'>{hotel?.rating}</span>

            <div className='card__section1'>
              <span className='card__grade text-x-black-500'>Excellent</span>
              <span className='card__views text-x-gray-400'>230 views</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card__payment">
        <div className='card__price title-x-black-700'>
          1500
          <span className='card__per text-x-gray-400'>per night</span>
        </div>

        <button className='card__btn button'>View</button>
      </div>
    </div>
  )
};
