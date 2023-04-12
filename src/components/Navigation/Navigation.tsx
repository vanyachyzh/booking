/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import className from 'classnames';
import { getSearchWith } from '../../utils';
import './Navigation.scss'
import { AuthContext } from '../../App';

// type Props = {
//   users: User[] | null,
//   setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
// };

export const Navigation = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  return (
    <div className='navigation__container'>
      <nav className='navigation text-xx-black-500'>
        <span className='navigation__link'>{context.hotel?.city}</span>
        <span className='navigation__link'>{context.hotel?.address}</span>
        <span className='navigation__link'>{context.hotel?.name}</span>
      </nav>
    </div>

  )
};