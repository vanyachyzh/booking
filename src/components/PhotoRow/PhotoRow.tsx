/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import className from 'classnames';
import { getSearchWith } from '../../utils';
import './PhotoRow.scss'
import { AuthContext } from '../../App';
import { HotelInfo } from '../../types';

// type Props = {
//   users: User[] | null,
//   setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
// };


let natureLinks = [
  'https://media.gettyimages.com/id/1044029654/photo/lady-gaga-arrives-at-the-premiere-of-warner-bros-pictures-a-star-is-born-at-the-shrine.jpg?s=612x612&w=gi&k=20&c=a8Fwy96QxY25mX1IFlRhKyqYyaLHoJxb7HHU3lI0Q-4=',
  'https://img.huffingtonpost.com/asset/63ec9aa72100005600950bbe.jpeg?cache=NW6hQ1GoIB&ops=1778_1000',
  'https://www.gannett-cdn.com/presto/2018/08/15/USAT/42994e1a-aa6f-4e96-9d3e-c663a8b6826c-GTY_978196460.jpg',
  'https://images.hellomagazine.com/horizon/square/d42ae2344afa-lady-gaga-emotional-photo-t.jpg',
  'https://media.gettyimages.com/id/1044029654/photo/lady-gaga-arrives-at-the-premiere-of-warner-bros-pictures-a-star-is-born-at-the-shrine.jpg?s=612x612&w=gi&k=20&c=a8Fwy96QxY25mX1IFlRhKyqYyaLHoJxb7HHU3lI0Q-4=',
  'https://img.huffingtonpost.com/asset/63ec9aa72100005600950bbe.jpeg?cache=NW6hQ1GoIB&ops=1778_1000',
];

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
        {hotel.picturesUrl?.map((image, index) => (
          <img
            key={index}
            className={`photo-row--${hotel.picturesUrl?.length}-${index + 1}`}
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