import React, { useEffect, useState, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './HotelPage.scss'
import { BookingDate, ExtendedHotelInfo, HotelInfo, RoomInfo, User } from '../../types';
import { PhotoRow } from '../../components/PhotoRow';
import { Amenity } from '../../components/Amenity';
import { CalendarButton } from '../../components/CalendarButton';
import { Calendar } from '../../components/Calendar';
import { startMonthSetter, endMonthSetter, increaseMonthSetter, decreaseMonthSetter, dateToString, getExtendedHotelInfo, getRatingWord, toNumber, getRating, getColor } from '../../api/booking';
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
import { getSearchWith } from '../../utils';
import { Loader } from '../../components/Loader';
import { useSpring, animated } from 'react-spring';
import { spawn } from 'child_process';

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const initialDate = {
  start: null,
  end: null,
}

type Grades = {
  [key: string]: number
}


export const HotelPage: React.FC<Props> = ({ setUser }) => {
  const context = useContext(AuthContext)
  const [hotel, setHotel] = useState<HotelInfo | null>(null)
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [gradesObject, setGradeObject] = useState<Grades | null>(null)
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [monthSetter, setMonthSetter] = useState<BookingDate>({
    start: startMonthSetter,
    end: endMonthSetter,
  })
  const [date, setDate] = useState<BookingDate>(initialDate);
  const [capacity, setCapacity] = useState<number>(1);
  const [activeAnchor, setActiveAnchor] = useState("#overview");

  const [rooms, setRooms] = useState<RoomInfo[] | null>(null)
  const [searchParams, setSearchParams] = useSearchParams();
  const hotel_id = searchParams.get('hotel_id') || '';
  const dateFrom = searchParams.get('dateFrom') || '';
  const dateTo = searchParams.get('dateTo') || '';

  const fadeAnim = useSpring({
    opacity: hotel ? 1 : 0,
    config: { duration: 100 },
  });

  useEffect(() => {
    if (hotel_id) {
      fetch('https://innjoy.space/hotels/all')
        .then(r => r.json())
        .then(r => {
          const hotel: HotelInfo | null = (r as HotelInfo[]).find((hotel) => hotel.id === +hotel_id) || null
          // console.log(hotel)
          if (hotel) {
            setHotel(hotel)
          }
        })

      if (dateFrom && dateTo && capacity) {
        fetch(`https://innjoy.space/apartments/available?${searchParams.toString()}`)
          .then(r => r.json())
          .then(r => setRooms(r))
      } else {
        fetch(`https://innjoy.space/apartments/by_hotel_id?hotelId=${hotel_id}`)
          .then(r => r.json())
          .then(r => setRooms(r))
      }



      fetch(`https://innjoy.space/hotels/sort_reviews_by_hotel${hotel_id}`)
        .then(r => r.json())
        .then(r => setGradeObject(r))

      fetch(`https://innjoy.space/reviews/${hotel_id}`)
        .then(r => r.json())
        .then(r => setReviews(r))
    }

  }, [searchParams])


  const handleClickNext = () => {
    increaseMonthSetter(monthSetter, setMonthSetter);
  };

  const handleClickPrev = () => {
    decreaseMonthSetter(monthSetter, setMonthSetter);
  };

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    const element = document.getElementById(event.currentTarget.hash.slice(1));

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveAnchor(event.currentTarget.hash);
    }
  }

  const onButtonClick = () => {
    setSearchParams(
      getSearchWith(
        searchParams,
        {
          dateFrom: date.start?.toISOString().substring(0, 10) || null,
          dateTo: date.end?.toISOString().substring(0, 10) || null,
          capacity: String(capacity),
        },
      ),)
  }


  return (
    <>
      <Header setUser={setUser} />


      {!hotel
        ? <Loader />
        : (<animated.div style={fadeAnim}>
          <Navigation
            city={hotel?.city || ""}
            address={hotel?.address || ""}
            name={hotel?.name || ""}
          />
          <div className="container">

            <div className='hotel-page'>
              <Link
                className='hotel-page__back-button text-xx-black-500'
                to='/'
              >
                Back
              </Link>
              <div className='hotel-page__photo-row'>
                <PhotoRow hotel={hotel} />
              </div>
              <div className='hotel-page__section'>
                <div className='hotel-page__anchors'>
                  <a
                    className={classNames(
                      'hotel-page__anchor',
                      { 'hotel-page__anchor--active': activeAnchor === "#overview" }
                    )}
                    href="#overview"
                    onClick={handleNavClick}
                  >
                    Overview
                  </a>

                  <a
                    className={classNames(
                      'hotel-page__anchor',
                      { 'hotel-page__anchor--active': activeAnchor === "#rooms" }
                    )}
                    href="#rooms"
                    onClick={handleNavClick}
                  >
                    Rooms
                  </a>

                  <a
                    className={classNames(
                      'hotel-page__anchor',
                      { 'hotel-page__anchor--active': activeAnchor === "#reviews" }
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
                    {hotel?.city}
                  </span>

                  <a
                    href={`https://google.com/maps/search/${hotel.city}, ${hotel.address}`}
                    target='__blank'
                    className='hotel-page__map-link'
                  >
                    {hotel?.address}
                  </a>

                  <span className="hotel-page__topic title-x-black-700">
                    Amenities
                  </span>

                  <ul className="hotel-page__amenities-list">
                    {hotel?.amenities.map(amenity => (
                      <li
                        key={amenity}
                        className="hotel-page__amenity-item"
                      >
                        <Amenity type={amenity} />
                      </li>
                    ))}
                  </ul>

                  <div className="hotel-page__description">
                    {hotel?.description}
                  </div>
                </div>

                <div className="hotel-page__booking-form">
                  <div className="hotel-page__rating">
                    <span
                      style={{ backgroundColor: getColor(hotel?.rating) }}
                      className="hotel-page__rating-num"
                    >
                      {toNumber(hotel?.rating || 0)}
                    </span>
                    <span className="hotel-page__view-amount text-xx-gray-400">
                      {`${hotel?.allReviews} views`}
                    </span>

                    <span className="hotel-page__rating-desc text-xx-black-500">
                      {getRating(hotel?.rating || 0)}
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

                  <a
                    onClick={handleNavClick}
                    href="#rooms"
                  >
                    <button
                      onClick={onButtonClick}
                      className="hotel-page__search-button button"
                    >
                      View available variants
                    </button>
                  </a>
                </div>
              </section>

              <section className="hotel-page__section" id="rooms">
                <span className="hotel-page__topic title-x-black-700">
                  Available rooms
                </span>
                {rooms && rooms.length !== 0 ? (
                  <div className="hotel-page__cards">
                    <Slider
                      width={948}
                      step={3}
                      items={rooms.map(room => (
                        <div key={room.id}>
                          <RoomCard room={room} />
                        </div>
                      )) || []}
                    />
                  </div>
                ) : (
                  <span className='hotel-page__no-rooms text-xx-black-500'>
                    Oops, there are no available rooms for the dates you selected. Please try another one.
                  </span>
                )}
              </section>

              <section className="hotel-page__section" id="reviews">
                <span className="hotel-page__topic title-x-black-700">
                  Reviews
                </span>

                {gradesObject && (
                  <Rating
                    average={toNumber(hotel?.rating || 0)}
                    data={gradesObject}
                  />
                )}

                <div className="hotel-page__reviews">
                  {reviews.length !== 0
                    ? (
                      <div className="hotel-page__cards">
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
                    ) : (
                      <span className='hotel-page__no-reviews text-xx-black-500'>
                        No guest reviews yet.
                      </span>
                    )}

                </div>
              </section>
            </div>
          </div>
        </animated.div>
        )}
    </>
  )
};
