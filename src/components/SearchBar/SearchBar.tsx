import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchBar.scss';

import { getSearchWith, searchCityByQuery } from '../../utils';
import { ExtendedHotelInfo, HotelInfo } from '../../types/HotelInfo';
import { User, BookingDate, IconState } from '../../types';
import { Calendar } from '../Calendar';
import { CalendarButton } from '../CalendarButton';
import { MapIcon, MapIconBig } from '../Icon/Icon';
import { CapacitySelector } from '../CapacitySelector';
import { capitalizeWords, decreaseMonthSetter, endMonthSetter, increaseMonthSetter, reverseTransformString, startMonthSetter, stringToDate } from '../../api/booking';

export const SearchBar: React.FC= () => {
  const [hotelList, setHotelList] = useState<HotelInfo[] | null>(null)
  const [proposedCities, setProposedCities] = useState<string[] | null>();
  const [isProposedVisible, setIsProposedVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const cityParam = searchParams.get('city') || '';
  const capacityParam = searchParams.get('capacity') || '';
  const dateFromParam = searchParams.get('dateFrom') || '';
  const dateToParam = searchParams.get('dateTo') || '';
  const [isActive, setIsActive] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [iconState, setIconState] = useState(IconState.Default)
  const [date, setDate] = useState<BookingDate>({
    start: stringToDate(dateFromParam),
    end: stringToDate(dateToParam),
  });
  const [capacity, setCapacity] = useState<number>(+capacityParam || 1);
  const [city, setCity] = useState(reverseTransformString(cityParam));
  const [monthSetter, setMonthSetter] = useState<BookingDate>({
    start: startMonthSetter,
    end: endMonthSetter,
  })

  const handleClickNext = () => {
    increaseMonthSetter(monthSetter, setMonthSetter);
  };

  const handleClickPrev = () => {
    decreaseMonthSetter(monthSetter, setMonthSetter);
  };

  useEffect(() => {
    if (!isProposedVisible) {
      setIconState(IconState.Default)
    }
  }, [isProposedVisible])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const url = 'https://innjoy.space/hotels/all'
    fetch(url)
      .then(r => r.json())
      .then(r => setHotelList(r))
      .then(() => setProposedCities(searchCityByQuery(hotelList, city)))
  }, [city])

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
          city: capitalizeWords(city),
          dateFrom: date.start?.toISOString().substring(0, 10) || null,
          dateTo: date.end?.toISOString().substring(0, 10) || null,
          capacity: String(capacity),
        },
      ),)
  }

  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isFocused) {
      setIconState(IconState.Hover);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isFocused) {
      setIconState(IconState.Default);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIconState(IconState.Active);
  };

  const [mapIconState, setMapIconState] = useState(IconState.Default);
  // const [inputClicked, setInputClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // const handleInputClick = () => {
  //   // setInputClicked(true);
  // };

  const handleClickOutside = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.classList.contains('search-bar__input')
      && !clickedElement.classList.contains('search-bar__option-container')
      && !clickedElement.classList.contains('search-bar__list')
      && !clickedElement.classList.contains('search-bar__option')
      ) {
      setIsProposedVisible(false);
      setIconState(IconState.Default)
    }
  };

  return (
    <header className='search-bar'>
      <form
        onSubmit={onSubmit}
      >
        <div className='search-bar__container-x'>
          <div className='search-bar__search-section'>

            <div className='search-bar__item'>
              <span
                className='search-bar__inscription text-x-white-500'
              >
                Going to
              </span>

              <MapIcon state={iconState} />

              <input
                ref={inputRef}
                onFocus={() => {
                  handleFocus()
                }}
                // onClick={handleInputClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                placeholder='Enter city'
                value={city}
                onChange={onChange}
                className='search-bar__input text-xx-black-500'
                type="text"
              />

              {isProposedVisible && city && proposedCities?.length !== 0 && (
                <div className='search-bar__list'>
                  {proposedCities?.map(city => (
                    <div className='search-bar__option-container'>
                      <MapIconBig state={mapIconState} />
                      <button
                        type="button"
                        onClick={() => {
                          setCity(city)
                          setIsProposedVisible(false);
                        }}
                        onMouseEnter={() => setMapIconState(IconState.DefaultEye)}
                        onMouseLeave={() => setMapIconState(IconState.Default)}
                        key={city}
                        className="search-bar__option text-xx-black-500"
                      >
                        {city}
                      </button>

                    </div>
                  ))}
                </div>
              )}
            </div>


            <div className='search-bar__item'>
              <span className='search-bar__inscription text-x-white-500'>
                Check-in
              </span>

              <div className="search-bar__date-btn">
                <CalendarButton
                  type='up'
                  isActive={isActive}
                  setIsActive={setIsActive}
                  setIsAnother={setIsSecondOpen}
                  title={date.start ? startDateString : 'Choose a date'}
                  dropdown={
                    <div className='search-bar__calendars'>
                      <input
                        onClick={handleClickPrev}
                        type="button"
                        className="search-bar__button--prev"
                      />

                      <Calendar
                        currentDate={monthSetter.start || new Date()}
                        bookingDate={date}
                        setBookingDate={setDate}
                      />

                      <Calendar
                        currentDate={monthSetter.end || new Date()}
                        bookingDate={date}
                        setBookingDate={setDate}
                      />

                      <input
                        onClick={handleClickNext}
                        type="button"
                        className="search-bar__button--next"
                      />
                    </div>
                  }
                />
              </div>
            </div>

            <div className='search-bar__item'>
              <span className='search-bar__inscription text-x-white-500'>
                Check-out
              </span>

              <div className="search-bar__date-btn">
                <CalendarButton
                  type='down'
                  isActive={isSecondOpen}
                  setIsActive={setIsSecondOpen}
                  setIsAnother={setIsActive}
                  title={date.end ? endDateString : 'Choose a date'}
                  dropdown={
                    <div className='search-bar__calendars'>
                      <input
                        type="button"
                        onClick={handleClickPrev}
                        className="search-bar__button--prev"
                      />

                      <Calendar
                        currentDate={monthSetter.start || new Date()}
                        bookingDate={date}
                        setBookingDate={setDate}
                      />

                      <Calendar
                        currentDate={monthSetter.end || new Date()}
                        bookingDate={date}
                        setBookingDate={setDate}
                      />

                      <input
                        onClick={handleClickNext}
                        type="button"
                        className="search-bar__button--next"
                      />
                    </div>
                  }
                />
              </div>
            </div>

            <div className='search-bar__item'>
              <span className='search-bar__inscription text-x-white-500'>
                Guests
              </span>

              <CapacitySelector
                value={capacity}
                setValue={setCapacity}
              />
            </div>

            <button
              // disabled={!city || !date.start || !date.end}
              type="submit"
              className='search-bar__search-btn button'>
            </button>
          </div>
        </div>
      </form>
    </header>
  )
};
