/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import className from 'classnames';
import { getSearchWith } from '../../utils';
import './Navigation.scss'
import { AuthContext } from '../../App';

type Props = {
  city: string,
  address: string,
  name: string
};

export const Navigation: React.FC<Props> = ({ city, address, name }) => {
  return (
    <div className='navigation__container'>
      <nav className='navigation text-xx-black-500'>
        <span className='navigation__link'>{city}</span>
        <span className='navigation__link'>{address}</span>
        <span className='navigation__link'>{name}</span>
      </nav>
    </div>

  )
};