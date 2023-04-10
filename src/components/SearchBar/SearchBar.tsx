import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../App';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './SearchBar.scss'
import { getSearchWith, getSimilarCities, searchCityByQuery } from '../../utils';
import { ExtendedHotelInfo } from '../../types/HotelInfo';
import Logo from './../../images/Logo InnJoy.svg';
import { User, BookingDate, IconState } from '../../types';
import { Calendar } from '../Calendar';
import { CalendarButton } from '../CalendarButton';
import { CalendarUpIcon, MapIcon } from '../Icon/Icon';
import { CapacitySelector } from '../CapacitySelector';

type Props = {
  cards: ExtendedHotelInfo[] | null,
  setCards: (v: ExtendedHotelInfo[]) => void,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}




function formatDate(dateString: string) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const timezoneOffset = new Date().getTimezoneOffset();
  const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);
  const timezone = timezoneOffset < 0 ? "+" : "-";

  
  return `${dayOfWeek} ${month} ${day} ${year} ${hour}:${minute}:${second} GMT ${timezone}${timezoneOffsetHours < 10 ? '0' : ''}${timezoneOffsetHours}${timezoneOffsetMinutes < 10 ? '0' : ''}${timezoneOffsetMinutes} (Eastern European Summer Time)`;
}



const initialDate = {
  start: null,
  end: null,
}

export const SearchBar: React.FC<Props> = ({ cards, setCards, setUser }) => {
  // const user = useContext(AuthContext);
  const [proposedCities, setProposedCities] = useState<string[] | null>();
  const [isProposedVisible, setIsProposedVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const cityParam = searchParams.get('city') || '';
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [iconState, setIconState] = useState(IconState.Default)
  const [currentDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = useState<BookingDate>(initialDate);
  const [capacity, setCapacity] = useState<number>(1);
  const [city, setCity] = useState(cityParam);
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

  // const dateFromParam = searchParams.get('dateFrom') || '';
  // const dateToParam = searchParams.get('dateTo') || '';
  // const capacityParam = searchParams.get('capacity') || '';
  // {
  //   start: new Date(Date.parse(formatDate(dateFromParam))) ,
  //   end: new Date(Date.parse(formatDate(dateToParam))),
  // }

  useEffect(() => {
    setProposedCities(searchCityByQuery(cards, city));
  }, [city])

  useEffect(() => {
    if (!isProposedVisible) {
      setIconState(IconState.Default)
    }
  }, [isProposedVisible])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsProposedVisible(true);
    setCity(event.target.value)
  }

  const startDateString = `${date.start?.getDate()} ${date.start?.toLocaleString('default', { month: 'long' })}`;
  const endDateString = `${date.end?.getDate()} ${date.end?.toLocaleString('default', { month: 'long' })}`;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams(
      getSearchWith(
        searchParams,
        {
          city,
          dateFrom: date.start?.toISOString().substring(0, 10) || '',
          dateTo: date.end?.toISOString().substring(0, 10) || '',
          capacity: String(capacity),
        },
      ),)

  }

  return (
    <header className='header'>
      <form
        onSubmit={onSubmit}
      >
        <div className='header__container-x'>
          <div className='header__search-section'>

            <div className='header__item'>
              <span
                className='header__inscription text-x-white-500'
              >
                Going to
              </span>

              <MapIcon state={iconState} />

              <input
                onBlur={() => {
                  setIsProposedVisible(false);
                }}
                onFocus={() => {
                  setIconState(IconState.Active);
                }}
                onMouseOver={() => setIconState(IconState.Hover)}
                onMouseLeave={() => setIconState(IconState.Default)}
                placeholder='Enter city'
                value={city}
                onChange={onChange}
                className='header__input text-xx-black-500'
                type="text"
              />
{/* 
              {isProposedVisible && city && proposedCities?.length !== 0 && (
                <div className='header__list'>
                  {proposedCities?.map(city => (
                    <button
                      type="button"
                      onClick={() => {
                        setCity(city)
                        setProposedCities([])
                      }}
                      key={city}
                      className="header__option text-xx-black-500"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )} */}
            </div>


            <div className='header__item'>
              <span className='header__inscription text-x-white-500'>
                Check-in
              </span>

              <div className="header__date-btn">
                <CalendarButton
                  type='up'
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
                  type='down'
                  isOpen={isSecondOpen}
                  setIsOpen={setIsSecondOpen}
                  setIsAnother={setIsFirstOpen}
                  title={date.end ? endDateString : 'Choose a date'}
                  dropdown={
                    <div className='header__calendars'>
                      <input
                        type="button"
                        onClick={handleClickPrev}
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

              <CapacitySelector
                value={capacity}
                setValue={setCapacity}
              />
            </div>

            <button
              disabled={!city || !date.start || !date.end}
              type="submit"
              className='header__search-btn button'>
            </button>
          </div>
        </div>
      </form>


    </header >
  )
};
