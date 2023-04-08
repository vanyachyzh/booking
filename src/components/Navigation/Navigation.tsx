/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import className from 'classnames';
import { getSearchWith } from '../../utils';
import './Navigation.scss'

// type Props = {
//   users: User[] | null,
//   setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
// };

export const Navigation = () => {
  return (
    <nav className='navigation text-xx-black-500'>
      <span className='navigation__link'>Prev</span>
      <span className='navigation__link'>Prev</span>
    </nav>
  )
};