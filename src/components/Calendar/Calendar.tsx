import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getSomething, postComment } from '../../api/booking';
import './Calendar.scss'

export const Calendar: React.FC = () => {

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }


  const firstDay = new Date(2023, 4, 1).getDay();
  // const firstYear = new Date(2023).getYear();

  function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1);
  }
  const month = new Date(2023, 3).toLocaleString('default', { month: 'long' });
  const amount = getDaysInMonth(2023, 4);

  console.log(getFirstDayOfMonth(2023, 4));
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  return (
    <div className='wrapper'>
      <h2 className='month'>{month + ' 2023'}</h2>
      <ul className='week'>
        {weekdays.map(day => (
          <li
            className='week__day'
            key={day}
          >
            {day}
          </li>
        ))}
      </ul>
      <div className={`calendar calendar--start-day--${firstDay} calendar--month-length--${amount}`}>

        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
        <div className="calendar__cell cell"></div>
      </div>
    </div>


  )
};
