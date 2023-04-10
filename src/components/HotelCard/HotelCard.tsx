/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import './HotelCard.scss'
import Carousel from '../Carousel/Carousel';
import { ExtendedHotelInfo } from '../../types';
import { Link } from 'react-router-dom';

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
            {hotel.address}
          </a>
        </div>

        <div className="card__section">
          <div className="card__features">
            {hotel.amenities.map(amenity => (
              <span
                key={amenity}
                className='card__feature text-x-green-500'
              >
                {amenity[0] + amenity.slice(1).toLowerCase()}
              </span>
            ))}
          </div>
        </div>

        <div className="card__section">
          <div className="card__popular">
            <span className='card__rating'>{hotel?.rating}</span>

            <div className='card__section1'>
              <span className='card__grade text-x-black-500'>
                {+hotel.rating > 9 && +hotel.rating < 10 ? 'Excellent' : null}
                {+hotel.rating > 8 && +hotel.rating < 9 ? 'Wonderful' : null}
                {+hotel.rating > 7 && +hotel.rating < 8 ? 'Very good' : null}
                {+hotel.rating > 6 && +hotel.rating < 7 ? 'Good' : null}
                {+hotel.rating > 4 && +hotel.rating < 6 ? 'Okay' : null}
                {+hotel.rating > 3 && +hotel.rating < 4 ? 'Poor' : null}
                {+hotel.rating > 1 && +hotel.rating < 2 ? 'Bad' : null}

              </span>
              <span className='card__views text-x-gray-400'>{`${hotel.allReviews} reviews`}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card__payment">
        <div className='card__price title-x-black-700'>
          {`$${Math.floor(+hotel.price)}`}
          <span className='card__per text-x-gray-400'>per night</span>
        </div>

        <Link
          to="/hotel"
          className='card__btn button'
        >
          View
        </Link>
      </div>
    </div>
  )
};
