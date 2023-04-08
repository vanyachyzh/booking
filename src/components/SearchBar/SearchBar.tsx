import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../App';
import { Link, useOutletContext, useSearchParams, useNavigate } from 'react-router-dom';
import { Calendarjjjjj } from '../Calendar';
import './SearchBar.scss'
import { getSearchWith, getSimilarCities } from '../../utils';
import { ExtendedHotelInfo } from '../../types/HotelInfo';
import Logo from './../../images/Logo InnJoy.svg';
import { User, BookingDate } from '../../types';
import { Calendar } from '../GPTCalendar';
import { CalendarButton } from '../CalendarButton';
// import DateRangeSelector from '../GPTCalendar/GPTCalendar';
// import Calendar from 'react-calendar';

type Props = {
  cards: ExtendedHotelInfo[] | null,
  setCards: (v: ExtendedHotelInfo[]) => void,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}



const initialDate = {
  start: null,
  end: null,
}

export const SearchBar: React.FC<Props> = ({ cards, setCards, setUser }) => {
  const [date, setDate] = useState<BookingDate>(initialDate);
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);


  const user = useContext(AuthContext);


  // let currentDate = new Date();
  // const [currentDate, setCurrentDate] = useState<Date>(new Date());
  let futureDate = new Date();
  // futureDate.setDate(currentDate.getDate() + 30);


  const onNext = () => {
    setCurrentDate(prev => new Date(prev.getDate() + 30))
    console.log("scdasdasdas")
  }


  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextDate, setNextDate] = useState(new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000));

  const handleClickNext = () => {
    const newCurrentDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    setCurrentDate(newCurrentDate);

    const newNextDate = new Date(nextDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    setNextDate(newNextDate);
  };

  const handleClickPrev = () => {
    const newCurrentDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    setCurrentDate(newCurrentDate);

    const newNextDate = new Date(nextDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    setNextDate(newNextDate);
  };

  const navigate = useNavigate();



  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get('city') || '';


  const [isProposedVisible, setIsProposedVisible] = useState(false);
  const [isInVisible, setIsInVisible] = useState(false);
  const [isOutVisible, setIsOutVisible] = useState(false);
  const [peopleAmount, setPeopleAmount] = useState(1);
  const [proposedCities, setProposedCities] = useState<string[] | null>();
  // const [query, setQuery] = useState('')
  // const [date, setDate] = useState(new Date());

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

  const [isVisibleLogOut, setIsVisibleLogOut] = useState(false)


  const onClick = () => {
    setIsVisibleLogOut(prev => !prev)
  }

  const onLogOut = () => {
    setUser(null);
    navigate('/')
  }

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const startDateString = `${date.start?.getDate()} ${date.start?.toLocaleString('default', { month: 'long' })}`;
  const endDateString = `${date.end?.getDate()} ${date.end?.toLocaleString('default', { month: 'long' })}`;

  const handleSelect = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };


  return (
    <header className='header'>


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

            <div className="header__date-btn">
              <CalendarButton
                isOpen={isFirstOpen}
                setIsOpen={setIsFirstOpen}
                setIsAnother={setIsSecondOpen}
                title={date.start ? startDateString : 'Choose a date'}
                dropdown={
                  <div className='header__calendars'>
                    <input
                      onClick={handleClickPrev}
                      type="button"
                      className="header__button--prev"
                    />

                    <Calendar
                      currentDate={currentDate}
                      bookingDate={date}
                      setBookingDate={setDate}
                    />

                    <Calendar
                      currentDate={nextDate}
                      bookingDate={date}
                      setBookingDate={setDate}
                    />

                    <input
                      onClick={handleClickNext}
                      type="button"
                      className="header__button--next"
                    />
                  </div>
                }
              />
            </div>
          </div>

          <div className='header__item'>
            <span className='header__inscription text-x-white-500'>
              Check-out
            </span>

            <div className="header__date-btn">
              <CalendarButton
                isOpen={isSecondOpen}
                setIsOpen={setIsSecondOpen}
                setIsAnother={setIsFirstOpen}
                title={date.end ? endDateString : 'Choose a date'}
                dropdown={
                  <div className='header__calendars'>
                    <input
                      onClick={handleClickPrev}
                      type="button"
                      className="header__button--prev"
                    />

                    <Calendar
                      currentDate={currentDate}
                      bookingDate={date}
                      setBookingDate={setDate}
                    />

                    <Calendar
                      currentDate={nextDate}
                      bookingDate={date}
                      setBookingDate={setDate}
                    />

                    <input
                      onClick={handleClickNext}
                      type="button"
                      className="header__button--next"
                    />
                  </div>
                }
              />
            </div>
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
    </header >
  )
};
