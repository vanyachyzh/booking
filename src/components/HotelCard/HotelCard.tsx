/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import './HotelCard.scss'
import Carousel from '../Carousel/Carousel';
import { ExtendedHotelInfo, HotelInfo } from '../../types';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../App';
import { Amenity } from '../Amenity';
import { toNumber } from '../../api/booking';
import { getRating } from '../../api/booking';
import { getSearchWith } from '../../utils';

type Props = {
  hotel: ExtendedHotelInfo,
};


export const HotelCard: React.FC<Props> = ({ hotel }) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const mapUrl
    = `https://google.com/maps/search/${hotel.city}, ${hotel.address}`;


  const stars = [];

  // const [rating, setRating] = useState(0)

  // useEffect(() => {
  //   setRating(convertNumber(context?.hotel?.rating || 0))
  // }, [context])
  // // const rating = ;

  for (let i = 0; i < hotel.stars; i++) {
    stars.push(<div key={i} className="card__star"></div>);
  }

  const [searchParams] = useSearchParams();

  const onButtonClick = (hotel: HotelInfo) => {
    if (context) {
      context.setHotel(hotel);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('hotel_id', String(hotel.id));
      const updatedSearchParams = newSearchParams.toString();
      navigate(`/hotel?${updatedSearchParams}`);
    }
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
              <div
                className='card__amenity'
                key={amenity}
              >
                <Amenity type={amenity} color='green' />
              </div>
            ))}
          </div>
        </div>

        <div className="card__section">
          <div className="card__popular">
            <span className='card__rating'>
              {toNumber(hotel?.rating)}
            </span>

            <div className='card__section1'>
              <span className='card__grade text-x-black-500'>
                {getRating(hotel?.rating)}
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

        <button
          // to="/hotel"
          onClick={() => onButtonClick(hotel)}
          className='card__btn button'
        >
          View
        </button>
      </div>
    </div>
  )
};
