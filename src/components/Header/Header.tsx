import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar } from '../Calendar';
import './Header.scss'
import { getSearchWith, getSimilarCities } from '../../utils';
import { ExtendedHotelInfo } from '../../types/HotelInfo';
import Logo from './../../images/Logo InnJoy.svg';
// import Calendar from 'react-calendar';

type Props = {
  cards: ExtendedHotelInfo[] | null,
  setCards: (v: ExtendedHotelInfo[]) => void,
}

export const Header: React.FC<Props> = ({ cards, setCards }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get('city') || '';


  const [isProposedVisible, setIsProposedVisible] = useState(false);
  const [isInVisible, setIsInVisible] = useState(false);
  const [isOutVisible, setIsOutVisible] = useState(false);
  const [peopleAmount, setPeopleAmount] = useState(1);
  const [proposedCities, setProposedCities] = useState<string[] | null>();
  // const [query, setQuery] = useState('')
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setProposedCities(getSimilarCities(cards, city));
    // console.log(city)
    // console.log(getSimilarCities(cards, query))
  }, [city])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsProposedVisible(true);
    setSearchParams(
      getSearchWith(
        searchParams,
        { city: event.target.value || null },
      ),
    );

    if (city.length === 1) {
      fetch(`http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/all`)
        .then(r => r.json())
        .then(r => setCards(r))
    }

  }


  const insertCity = (city: string) => {
    // console.log(city)

    setSearchParams(
      getSearchWith(
        searchParams,
        { city },
      ),
    );
    // setQuery(city);

    // console.log(query)
    setIsProposedVisible(false);

    fetch(`http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/city?city=${city}&rating?from=1&to=3`)
      .then(r => r.json())
      // .then(r => console.log(r))

      .then(r => setCards(r))

    // fetch(`http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/rating?from=1&to=2`)
    //   .then(r => r.json())
    //   .then(r => setCards(r))
  }


  return (
    <header className='header'>
      <div className="container">
        <div className='header__nav'>
          <img
            className='header__logo'
            src={Logo} alt="InnJoy"
          />

          <button
            className='header__login-btn button'
          >
            Log In
          </button>
        </div>
      </div>


      <div className='header__container-x'>
        <div className='header__search-section'>

          <div className='header__item'>
            <span
              className='header__inscription text-x-white-500'
            >
              Going to
            </span>

            <input
              onBlur={() => setIsProposedVisible(false)}
              placeholder='Enter city'
              value={city}
              onChange={onChange}
              className='header__input'
              type="text text-xx-black-500"
            />

            {isProposedVisible && city && proposedCities?.length !== 0 && (
              <div className='header__list'>
                {proposedCities?.map(city => (
                  <button
                    onClick={() => insertCity(city)}
                    key={Math.random()}
                    className="header__option text-xx-black-500"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>


          <div className='header__item'>
            <span className='header__inscription text-x-white-500'>
              Check-in
            </span>
          
            <button
              className='header__in-btn text-xx-gray-500'
              onClick={() => {
                setIsInVisible(prev => !prev)
                setIsOutVisible(false);
              }}
            >Choose a date</button>
            {isInVisible && (
              <div className='header__months'>
                <input
                  type="button"
                  className="header__button--prev"
                />

                <Calendar />
                <Calendar />

                <input
                  type="button"
                  className="header__button--next"
                />
              </div>
            )}
          </div>

          <div className='header__item'>
            <span className='header__inscription text-x-white-500'>
              Check-out
            </span>
          
            <button
              className='header__out-btn text-xx-gray-500'
              onClick={() => {
                setIsOutVisible(prev => !prev)
                setIsInVisible(false);
              }}
            >Choose a date</button>

            {isOutVisible && (
              <div className='header__months'>
                <input
                  type="button"
                  className="header__button--prev"
                />

                <Calendar />
                <Calendar />

                <input
                  type="button"
                  className="header__button--next"
                />
              </div>
            )}
          </div>

          <div className='header__item'>
            <span className='header__inscription text-x-white-500'>
              Capacity
            </span>
          
            <div className='header__capacity text-xx-gray-500'>
              <button
                className='header__minus'
                type="button"
                onClick={() => setPeopleAmount(prev => prev - 1 < 1 ? 1 : prev - 1)}
              >
              </button>

              <span className='header__amount'>
                {peopleAmount}
              </span>

              <button
                className='header__plus'
                type="button"
                onClick={() => setPeopleAmount(prev => prev + 1)}
              >
              </button>
            </div>
          </div>

          <button className='header__search-btn button'>
          </button>
        </div>
      </div>
    </header>
  )
};
