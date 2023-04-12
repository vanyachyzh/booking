import React from 'react';
import { Link } from 'react-router-dom';
import './SuccesPage.scss'
import { Header } from '../../components/Header';
import { User } from '../../types';

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const SuccesPage: React.FC<Props> = ({ setUser }) => (
  <div className='success-page'>
    <Header setUser={setUser} />

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
