import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../App';
import { Link, useOutletContext, useSearchParams, useNavigate } from 'react-router-dom';
import './Header.scss'
import { getSearchWith, getSimilarCities } from '../../utils';
import { ExtendedHotelInfo } from '../../types/HotelInfo';
import Logo from './../../images/Logo InnJoy.svg';
import { User } from '../../types';
// import Calendar from 'react-calendar';

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}



export const Header: React.FC<Props> = ({ setUser }) => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const [isVisibleLogOut, setIsVisibleLogOut] = useState(false)

  const onClick = () => {
    setIsVisibleLogOut(prev => !prev)
  }

  const onLogOut = () => {
    setUser(null);
    navigate('/')
  }


  return (
    <header className='header'>
      <div className="container">
        <div className='header__nav'>
          <img
            className='header__logo'
            src={Logo} alt="InnJoy"
          />

          {user && (

            <div className='header__profile'>
              <button
                onClick={onClick}
                className='header__avatar'
              >
              </button>


              {isVisibleLogOut && (
                  <button
                    onClick={onLogOut}
                    className="header__logout"
                  >
                    Log Out
                  </button>
              )}
            </div>

          )}

          {!user && (
            <Link
              to="/login"
              className='header__login-btn button'
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
};
