import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.scss';

import { AuthContext } from '../../App';
import Logo from './../../images/Logo InnJoy.svg';
import { User } from '../../types';

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const Header: React.FC<Props> = ({ setUser }) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [isVisibleLogOut, setIsVisibleLogOut] = useState(false)
  const { pathname } = useLocation();

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onClick = () => {
    setIsVisibleLogOut(prev => !prev)
  }

  const onLogOut = () => {
    setUser(null);
    navigate('/')
  }

  const handleClickOutside = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.classList.contains('header__logout')
      && !clickedElement.classList.contains('header__avatar')
    ) {
      setIsVisibleLogOut(false);
    }
  };

  return (
    <header className='header'>
      <div className="header__container">
        <Link
          to="/"
        >
          <img
            className='header__logo'
            src={Logo} alt="InnJoy"
          />
        </Link>

        {context && context.user && (
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

        {context
          && !context.user
          && pathname !== '/login'
          && pathname !== '/signup'
          && (
            <Link
              to="/login"
              className='header__login-btn button'
            >
              Log In
            </Link>
          )}
      </div>
    </header>
  )
};
