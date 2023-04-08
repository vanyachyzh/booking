import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.scss'
import { Header } from '../../components/Header';
import { User } from '../../types';

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const ErrorPage: React.FC<Props> = ({ setUser }) => (
  <div className='error-page'>
    <Header setUser={setUser} />

    <h2 className='error-page__title title-xx-black-700'>
      Sorry, page not found!
      <br />
      Let's get you back on track.
    </h2>

    <Link
      className='error-page__btn button'
      to='/'
    >
      Back to main page
    </Link>

  </div>
)

