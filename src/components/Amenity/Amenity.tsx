import React, { useEffect, useState } from 'react';
import './Amenity.scss';
import { Field } from '../Field';
import { Link, useNavigate } from 'react-router-dom';
import { Error, User, Warning } from '../../types';
import { logIn } from '../../api/booking';
import { Header } from '../Header';
import wifiImage from './../../images/iconss/icon (tabler)/wifi.svg';
import poolImage from './../../images/iconss/icon (tabler)/swimming.svg';
import resaurantImage from './../../images/iconss/icon (tabler)/glass-full.svg';
import gymImage from './../../images/iconss/icon (tabler)/barbell.svg';
import parkingImage from './../../images/iconss/icon (tabler)/parking.svg';
import spaImage from './../../images/iconss/icon (tabler)/bath.svg';

type Props = {
  type: string,
}

export const Amenity: React.FC<Props> = ({ type }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'SPA':
        return spaImage;

      case 'PARKING':
        return parkingImage;

      case 'WIFI':
        return wifiImage;

      case 'RESTAURANT':
        return resaurantImage;

      case 'POOL':
        return poolImage;

      case 'GYM':
        return gymImage;

      default:
        return;
    }
  }

  return (
    <div className='amenity'>
      <img
        className='amenity__image text-x-black-500'
        src={getIcon(type)}
        alt="Image"
      />
      {type[0] + type.slice(1).toLowerCase()}
    </div>
  )
};
