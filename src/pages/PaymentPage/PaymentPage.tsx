import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PaymentPage.scss'
import { Field } from '../../components/Field';
import { calculateBookingCosts, cardRegex, cvcRegex, dateRegex, emailRegex, formatDate, getColor, getDaysBetweenDates, getRating, nameRegex, phoneRegex } from '../../api/booking';
import { FilterSelector } from '../../components/FilterSelector';
import { Header } from '../../components/Header';
import { ExtendedHotelInfo, HotelInfo, RoomInfo, User } from '../../types';
import { Loader } from '../../components/Loader';
import { AuthContext } from '../../App';

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const PaymentPage: React.FC<Props> = ({ setUser }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+380');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [date, setDate] = useState('');
  const [cvcCode, setCvcCode] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const hotel_id = searchParams.get('hotel_id') || '';
  const dateFrom = searchParams.get('dateFrom') || '';
  const dateTo = searchParams.get('dateTo') || '';
  const [showElement, setShowElement] = useState(false);
  const context = useContext(AuthContext);

  const [hotel, setHotel] = useState<ExtendedHotelInfo | null>(null);
  const [roomName, setRoomName] = useState<string>('');
  const [roomPrice, setRoomPrice] = useState<number>(0);

  useEffect(() => {
    if (hotel_id) {
      fetch('https://innjoy.space/hotels/all')
        .then(r => r.json())
        .then(r => {
          const hotel: ExtendedHotelInfo | null = (r as ExtendedHotelInfo[]).find((hotel) => hotel.id === +hotel_id) || null
          // console.log(hotel)
          if (hotel) {
            setHotel(hotel)
          }
        })
    }
  }, [searchParams])

  useEffect(() => {
    if (context && context.room) {
      console.log(context.room)
      setRoomName(context.room.name);
      setRoomPrice(context.room.price);
    }
  }, [context])

  // console.log(calculateBookingCosts({
  //   pricePerNight: 400,
  //   numberOfNights: 4,
  //   taxPercentage: 20,
  // }))


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElement(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const preventInput = (value: string, length: number) => {
    if (value.length >= length) {
      return value;
    }

    return value.slice(0, length);
  }

  const navigate = useNavigate();

  const onButtonClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('hotel_id', String(hotel_id));
    const updatedSearchParams = newSearchParams.toString();
    navigate(`/hotel?${updatedSearchParams}`)
  }

  const onClick = () => {
    navigate('/success');
  }

  return (
    <>
      <Header
        setUser={setUser}
      />
      {showElement
        ? (
          <>
            <div className="container">
              <button
                className='payment-page__btn text-xx-black-500'
                onClick={onButtonClick}
              >
                Back
              </button>
            </div>

            <div className='payment-page'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className='payment-page__data'>
                <div className='payment-page__topic-section'>
                  <h1 className='payment-page__topic title-x-black-700'>
                    Guest details
                  </h1>

                  <span
                    className='payment-page__step text-xx-gray-400'
                  >
                    1 Step
                  </span>
                </div>

                <div className="payment-page__field">
                  <Field
                    value={name}
                    setValue={setName}
                    placeholder='Enter your first name'
                    label='First name'
                    pattern={nameRegex}
                  />
                </div>

                <div className="payment-page__field">
                  <Field
                    value={surname}
                    setValue={setSurname}
                    placeholder='Enter your last name'
                    label='Last name'
                    pattern={nameRegex}
                  />
                </div>

                <div className="payment-page__field">
                  <Field
                    value={email}
                    setValue={setEmail}
                    placeholder='Enter your email'
                    label='Email Address'
                    pattern={emailRegex}
                  />

                  <span className="payment-page__email-desc">
                    Confirmation email goes to this address
                  </span>
                </div>

                <div className="payment-page__phone-section">
                  <div className="payment-page__phone-code">
                    <FilterSelector
                      value={countryCode}
                      setValue={setCountryCode}
                    />
                  </div>

                  <div className="payment-page__phone">
                    <Field
                      value={phoneNumber}
                      setValue={setPhoneNumber}
                      placeholder='Enter your phone number'
                      pattern={phoneRegex}
                    />
                  </div>
                </div>

                <div className='payment-page__topic-section'>
                  <h1 className='payment-page__topic title-x-black-700'>
                    Payment Method
                  </h1>

                  <span
                    className='payment-page__step text-xx-gray-400'
                  >
                    2 Step
                  </span>
                </div>

                <div className="payment-page__field">
                  <Field
                    value={firstName}
                    setValue={setFirstName}
                    placeholder='Enter your first name'
                    label='First name'
                    pattern={nameRegex}
                  />
                </div>

                <div className="payment-page__field">
                  <Field
                    value={lastName}
                    setValue={setLastName}
                    placeholder='Enter your last name'
                    label='Last name'
                    pattern={nameRegex}
                  />
                </div>

                <div className="payment-page__field">
                  <Field
                    value={cardNumber}
                    setValue={setCardNumber}
                    placeholder='XXXX XXXX XXXX XXXX'
                    label='Card number'
                    pattern={cardRegex}
                    maxLength={14}
                  />
                </div>


                <div className="payment-page__card-data">
                  <div className="payment-page__date">
                    <Field
                      value={date}
                      setValue={setDate}
                      placeholder='MM/YY'
                      label='Expiry Date'
                      pattern={dateRegex}
                      maxLength={5}
                    />
                  </div>

                  <div className="payment-page__cvc">
                    <Field
                      value={cvcCode}
                      setValue={setCvcCode}
                      placeholder='XXX'
                      label='CVC-code'
                      pattern={cvcRegex}
                      maxLength={3}
                    />
                  </div>
                </div>

                <div className='payment-page__topic-section'>
                  <h1 className='payment-page__topic title-x-black-700'>
                    Special Requests
                  </h1>
                </div>

                <span className='payment-page__desc text-x-gray-400'>
                  The accommodation will try their best to fulfill your special requests, but they can't guarantee it. Don't hesitate to let them know your needs, even after booking!
                </span>

                <span>
                  Please write your requests below
                  <strong className='text-x-gray-400'> (optional)</strong>
                </span>

                <textarea
                  className='payment-page__textarea'
                  placeholder='Start typing here...'
                  name="message"
                >
                </textarea>

                <button
                  onClick={onClick}
                  disabled={!emailRegex.test(email)
                    || !nameRegex.test(name)
                    || !nameRegex.test(surname)
                    || !nameRegex.test(lastName)
                    || !nameRegex.test(firstName)
                    || !phoneRegex.test(phoneNumber)
                    || !cvcRegex.test(cvcCode)
                    || !cardRegex.test(cardNumber)
                    || !dateRegex.test(date)
                  }
                  className='payment-page__button button'>
                  Book
                </button>
              </form>

              <div className='payment-page__cards'>
                <div className='payment-page__card'>
                  <h1 className='payment-page__topic--card title-x-black-700'>
                    Booking Details
                  </h1>

                  <div className='payment-page__rating'>
                    <span className='text-xx-black-500'>
                      {hotel?.name}
                    </span>

                    <span
                      style={{ color: getColor(hotel?.rating || 0) }}
                      className='text-xx-green-500'>
                      {getRating(hotel?.rating || 0)}
                    </span>
                  </div>

                  <span className='payment-page__check text-x-gray-400'>
                    Check-in
                  </span>
                  <span className='payment-page__check-date text-xx-black-700'>
                    {formatDate(dateFrom)}
                  </span>

                  <span className='payment-page__segment'>
                    {`${getDaysBetweenDates(dateFrom, dateTo)} nights stay`}
                  </span>
                  <span className='payment-page__check text-x-gray-400'>
                    Check-out
                  </span>
                  <span className='payment-page__check-date text-xx-black-700'>
                    {formatDate(dateTo)}
                  </span>

                  <span className='text-x-gray-400'>
                    Room selected:
                  </span>
                  <span className='text-xx-black-600'>
                    {` ${roomName}`}
                  </span>

                </div>


                <div className='payment-page__card'>
                  <h1 className='payment-page__topic--card title-x-black-700'>
                    Price Details
                  </h1>

                  <div className='payment-page__room-amount'>
                    <span className='text-xx-black-500'>
                      {`1 room x ${getDaysBetweenDates(dateFrom, dateTo)} nights`}
                    </span>

                    <span className='text-xx-black-500'>
                      {`$${roomPrice * getDaysBetweenDates(dateFrom, dateTo)}`}
                    </span>
                  </div>

                  <span className='payment-page__night text-x-gray-400'>
                    {`$${roomPrice} average per night`}
                  </span>

                  <div className='payment-page__room-amount'>
                    <span className='text-xx-black-500'>
                      Taxes & Fees
                    </span>

                    <span className='text-xx-black-500'>
                      {`$${calculateBookingCosts({
                        pricePerNight: roomPrice,
                        numberOfNights: getDaysBetweenDates(dateFrom, dateTo),
                        taxPercentage: 2
                      }).taxAmount}`}
                    </span>
                  </div>

                  <div className='payment-page__price text-xx-black-500'>
                    Total price:
                    <br />
                    <strong className='text-xx-black-700'>
                      {`$${calculateBookingCosts({
                        pricePerNight: roomPrice,
                        numberOfNights: getDaysBetweenDates(dateFrom, dateTo),
                        taxPercentage: 2
                      }).total}`}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
    </>

  )
};
