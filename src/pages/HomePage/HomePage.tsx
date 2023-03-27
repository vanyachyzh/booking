import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss'

export const HomePage: React.FC = () => {
  return (
    <>
      <div className='homepage'>
        <div>
          <h1>HOMEPAGE</h1>
        </div>

        <div>
          <Link to="/hotel">go to hotel</Link>
        </div>

        <div>
          <Link to="/auth">AUTH</Link>
        </div>
      </div>

    </>
  )
};
