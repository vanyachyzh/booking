import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SuccesPage.scss'
import { Header } from '../../components/Header';
import { User } from '../../types';
import { Loader } from '../../components/Loader';
import Success from './../../images/iconss/Hotel Booking-cuate (1) 1.svg';


export const SuccesPage: React.FC = () => {
  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElement(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showElement) {
    return (
      <div className='success-page'>
        <Header />

        <img
          className='success-page__image'
          src={Success}
          alt="Success"
        />

        <h2 className='success-page__title title-xx-black-700'>
          Hooray, your booking is confirmed!
          <br />
          Get ready for an amazing stay ahead.
        </h2>

        <Link
          className='success-page__btn button'
          to='/'
        >
          Back to main page
        </Link>

      </div>
    )
  } else {
    return (
      <div className='success-page'>
        <Header />

        <Loader />
      </div>
    )
  }


}

