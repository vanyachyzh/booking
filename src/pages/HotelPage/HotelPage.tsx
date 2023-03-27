import React from 'react';
import { Link } from 'react-router-dom';
import './HotelPage.scss'

export const HotelPage: React.FC = () => {
  return (
    <div className='hotel-page'>
        <div>
          <h1>HOTEL PAGE</h1>
        </div>

        <div>
          <Link to="/payment">go to payment</Link>
        </div>

        <div>
          <Link to="/auth">AUTH</Link>
        </div>
    </div>
  )
};
