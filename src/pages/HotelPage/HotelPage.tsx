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
import { Rating } from '../../components/Rating';
// import Carousel from '../../components/Carousel/Carousel';
// import Slider from "react-slick";
import { Slider } from '../../components/Slider';
import { Comment } from '../../components/Comment';
import classNames from 'classnames';

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
  const [reviews, setReviews] = useState([]);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [monthSetter, setMonthSetter] = useState<BookingDate>({
    start: startMonthSetter,
    end: endMonthSetter,
  })
  const [date, setDate] = useState<BookingDate>(initialDate);
  const [capacity, setCapacity] = useState<number>(1);
  const [activeAnchor, setActiveAnchor] = useState("#overview");

  useEffect(() => {
    if (context !== null && context.hotel) {
      getExtendedHotelInfo(context.hotel)
        .then(r => {

          setHotel(r)
        })

    }
    // fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/sort_reviews_by_hotel2')
    //   .then(r => r.json())



    fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/reviews/1')
      .then(r => r.json())
      .then(r => setReviews(r))
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

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    const element = document.getElementById(event.currentTarget.hash.slice(1));

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveAnchor(event.currentTarget.hash);
    }
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

          <div className='hotel-page__section'>
            <div className='hotel-page__anchors'>
              <a
                className={classNames(
                  'hotel-page__anchor',
                  {'hotel-page__anchor--active': activeAnchor === "#overview"}
                )}
                href="#overview"
                onClick={handleNavClick}
              >
                Overview
              </a>

              <a
                className={classNames(
                  'hotel-page__anchor',
                  {'hotel-page__anchor--active': activeAnchor === "#rooms"}
                )}
                href="#rooms"
                onClick={handleNavClick}
              >
                Rooms
              </a>

              <a
                className={classNames(
                  'hotel-page__anchor',
                  {'hotel-page__anchor--active': activeAnchor === "#reviews"}
                )}
                href="#reviews"
                onClick={handleNavClick}
              >
                Reviews
              </a>

            </div>
          </div>

          <section className="hotel-page__section" id="overview">
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


          <section className="hotel-page__section" id="rooms">
            <span className="hotel-page__topic title-x-black-700">
              Available rooms
            </span>

            <div className="hotel-page__cards">
              <Slider
                width={948}
                step={3}
                items={hotel?.rooms.map(room => (
                  <div key={room.id}>
                    <RoomCard room={room} />
                  </div>
                )) || []}
              />

            </div>
          </section>

          <section className="hotel-page__section" id="reviews">
            <span className="hotel-page__topic title-x-black-700">
              Reviews
            </span>

            <Rating data={{
              "0": 11,
              "1": 7,
              "2": 6,
              "3": 11,
              "4": 2,
              "5": 6
            }} />

            <div className="hotel-page__reviews">
              <Slider
                width={684}
                step={2}
                items={reviews.map(review => (
                  <div>
                    <Comment
                      key={review}
                      data={review}
                    />
                  </div>
                )) || []}
              />
            </div>
          </section>
        </div>
      </div>
    </>


  )
};
