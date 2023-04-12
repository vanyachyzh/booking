import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './HotelPage.scss'
import { BookingDate, ExtendedHotelInfo, User } from '../../types';
import { PhotoRow } from '../../components/PhotoRow';
import { Amenity } from '../../components/Amenity';
import { CalendarButton } from '../../components/CalendarButton';
import { Calendar } from '../../components/Calendar';
import { startMonthSetter, endMonthSetter, increaseMonthSetter, decreaseMonthSetter, dateToString, getExtendedHotelInfo, getRatingWord } from '../../api/booking';
import { CapacitySelector } from '../../components/CapacitySelector';
import { RoomCard } from '../../components/RoomCard';
import { Header } from '../../components/Header';
import { Navigation } from '../../components/Navigation';
import { AuthContext } from '../../App';

const mockk = {
  address
    :
    "1919 Madison Ave",
  allReviews
    :
    1,
  amenities
    :
    ['GYM', 'RESTAURANT', 'SPA', 'WIFI'],
  city
    :
    "New York",
  description
    :
    "Luxury hotel in the heart of the city",
  id
    :
    1,
  name
    :
    "The Peninsula",
  picturesUrl
    :
    ['https://www.ahstatic.com/photos/1276_ho_00_p_1024x768.jpg'],
  price
    :
    "400.00",
  rating
    :
    4.9,
  stars
    :
    5,
  telephone
    :
    "(123)456-7890",
}
type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const initialDate = {
  start: null,
  end: null,
}


export const HotelPage: React.FC<Props> = ({ setUser }) => {
  const context = useContext(AuthContext)
  const [hotel, setHotel] = useState<ExtendedHotelInfo | null>(null)
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [monthSetter, setMonthSetter] = useState<BookingDate>({
    start: startMonthSetter,
    end: endMonthSetter,
  })
  const [date, setDate] = useState<BookingDate>(initialDate);
  const [capacity, setCapacity] = useState<number>(1);

  useEffect(() => {
    if (context !== null && context.hotel) {
      getExtendedHotelInfo(context.hotel)
        .then(r => {
          // console.log(r)
          setHotel(r)
        })
      // .then(() => console.log(hotel))
    }
  }, [])

  const handleClickNext = () => {
    increaseMonthSetter(monthSetter, setMonthSetter);
  };

  const handleClickPrev = () => {
    decreaseMonthSetter(monthSetter, setMonthSetter);
  };


  if (!context) {
    return null;
  }

  return (
    <>
      <Header setUser={setUser} />

      <Navigation />
      <div className="container">

        <div className='hotel-page'>

          <Link
            className='hotel-page__back-button text-xx-black-500'
            to='/'
          >
            Back
          </Link>

          <div className='hotel-page__photo-row'>
            <PhotoRow />
          </div>



          <section className="hotel-page__section">
            <div className="hotel-page__info">
              <span className="hotel-page__place-name">
                {context.hotel?.city}
              </span>

              <a
                href="#"
                className="hotel-page__map-link"
              >
                {context.hotel?.address}
              </a>

              <span className="hotel-page__topic title-x-black-700">
                Amenities
              </span>

              <ul className="hotel-page__amenities-list">
                {context.hotel?.amenities.map(amenity => (
                  <li
                    key={amenity}
                    className="hotel-page__amenity-item"
                  >
                    <Amenity type={amenity} />
                  </li>
                ))}
              </ul>

              <div className="hotel-page__description">
                {context.hotel?.description}
              </div>
            </div>



            <div className="hotel-page__booking-form">
              <div className="hotel-page__rating">
                <span className="hotel-page__rating-num">
                  {context.hotel?.rating}
                </span>
                <span className="hotel-page__view-amount text-xx-gray-400">
                {`${context.hotel?.allReviews} views`}
                </span>

                <span className="hotel-page__rating-desc text-xx-black-500">
                  {getRatingWord(context.hotel?.rating || 0)}
                </span>
              </div>

              <div className="hotel-page__pickers">
                <div className='hotel-page__picker'>
                  <span className='hotel-page__picker-name'>
                    Check-in
                  </span>

                  <CalendarButton
                    type='up'
                    isActive={isFirstOpen}
                    setIsActive={setIsFirstOpen}
                    setIsAnother={setIsSecondOpen}
                    title={date.start ? dateToString(date.start) : 'Choose'}
                    dropdown={
                      <div className='hotel-page__calendars'>
                        <input
                          onClick={handleClickPrev}
                          type="button"
                          className="hotel-page__button--prev"
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
                          className="hotel-page__button--next"
                        />
                      </div>
                    }
                  />

                </div>

                <div className='hotel-page__picker'>
                  <span className='hotel-page__picker-name'>
                    Check-out
                  </span>

                  <CalendarButton
                    type='down'
                    isActive={isSecondOpen}
                    setIsActive={setIsSecondOpen}
                    setIsAnother={setIsFirstOpen}
                    title={date.end ? dateToString(date.end) : 'Choose'}
                    dropdown={
                      <div className='hotel-page__calendars'>
                        <input
                          onClick={handleClickPrev}
                          type="button"
                          className="hotel-page__button--prev"
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
                          className="hotel-page__button--next"
                        />
                      </div>
                    }
                  />

                </div>

                <div className='hotel-page__picker'>
                  <span className='hotel-page__picker-name'>
                    Guests
                  </span>

                  <CapacitySelector
                    value={capacity}
                    setValue={setCapacity}
                  />

                </div>
              </div>

              <button className="hotel-page__search-button button">
                View available variants
              </button>
            </div>
          </section>


          <section className="hotel-page__section">
            <span className="hotel-page__topic title-x-black-700">
              Available rooms
            </span>
            <div className="hotel-page__cards">
              {hotel?.rooms.slice(0, 2).map(room => (
                <div>
                  <RoomCard room={room} />
                </div>
              ))}
            </div>
          </section>

          <section className="hotel-page__section">

          </section>

          <section className="hotel-page__section">

          </section>
        </div>
      </div>
    </>


  )
};
