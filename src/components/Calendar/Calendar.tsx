import React, { useEffect } from 'react';
import './Calendar.scss'

type Props = {
  date?: Date
}

export const Calendarjjjjj: React.FC<Props> = ({ date }) => {

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const month = date?.toLocaleString('default', { month: 'long' });
  const year = date?.getFullYear();
  const firstDayOfMonth = new Date(date?.getFullYear() || 0, date?.getMonth() || 0, 1);
  const firstWeekdayOfMonth = firstDayOfMonth.getDay();
  const dayAmount = getDaysInMonth(date?.getFullYear() || 0, date?.getMonth() || 0);

  return (
    <div className='calendar'>
      <h2 className='calendar__month'>
        {`${month} ${year}`}
      </h2>

      <ul className='calendar__week'>
        {weekdays.map(day => (
          <li
            className='calendar__weekday'
            key={day}
          >
            {day}
          </li>
        ))}
      </ul>

      <div className={`days days--start-day--${firstWeekdayOfMonth} days--month-length--${dayAmount}`}>
        <div className="days__cell cell cell--disabled"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
        <div className="days__cell cell"></div>
      </div>
    </div>
  )
};
