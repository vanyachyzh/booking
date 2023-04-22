import React from "react";
import classNames from "classnames";
import "./Calendar.scss";

import { BookingDate } from "../../types";


interface Props {
  currentDate: Date;
  bookingDate: BookingDate,
  setBookingDate: React.Dispatch<React.SetStateAction<BookingDate>>
}

export const Calendar: React.FC<Props> = ({ currentDate, bookingDate, setBookingDate }) => {
  // const { start, end } = bookingDate;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const setNewBookingDate = (date: Date) => {
    const dateTime = date.getTime();
    const startTime = bookingDate.start?.getTime();
    const endTime = bookingDate.end?.getTime();

    if (!startTime) {
      setBookingDate({
        end: null,
        start: date,
      })

      return;
    }

    if (startTime && !endTime && startTime > dateTime) {
      setBookingDate(prev => ({
        start: date,
        end: prev.start
      }))

      return;
    }

    if (startTime && !endTime) {
      setBookingDate(prev => ({
        ...prev,
        end: date
      }))

      return;
    }

    if (startTime && endTime) {
      setBookingDate({
        end: null,
        start: null,
      })

      return;
    }
  }

  const daysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString('default', { month: 'long' });

  const monthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), daysInMonth(currentDate.getMonth(), currentDate.getFullYear()));

  const previousMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  const nextMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = [];

  for (let i = monthStartDate.getDay() - 1; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, previousMonthEndDate.getDate() - i);
    days.push(
      <div key={`previous-${i}`} className="day out-month">
        <span className='calendar__number-out'>{date.getDate()}</span>
      </div>
    );
  }

  for (let i = 1; i <= daysInMonth(currentDate.getMonth(), currentDate.getFullYear()); i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    // const dateTime = date.getTime();
    // const currentTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), i).getTime();
    const currentTime = date.getTime();
    const startTime = bookingDate.start?.getTime() || NaN;
    const endTime = bookingDate.end?.getTime() || NaN;
    days.push(
      <div
        key={i}
        className={classNames(
          { 'wrap--start': startTime && endTime },
          { 'wrap--end': startTime && endTime }
        )}
      >
        <button
          disabled={currentTime < yesterday.getTime()}
          type="button"
          key={i}
          className={classNames(
            'day',
            { 'day--start': startTime === currentTime },
            { 'day--end': endTime === currentTime },
            { 'day--between': startTime < currentTime && endTime > currentTime }
          )}
          onClick={() => setNewBookingDate(date)}
        >
          <span className='calendar__number-out'>{i}</span>
        </button>
      </div>
    );
  }

  for (let i = 1; days.length < 42; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
    days.push(
      <div key={`next-${i}`} className="day out-month">
        <span className='calendar__number'>{date.getDate()}</span>
      </div>
    );
  }

  return (
    <div className="calendar">
      <div className="title title-x-black-700">{`${month} ${year}`}</div>
      <div className="weekday">{weekdays[0]}</div>
      <div className="weekday">{weekdays[1]}</div>
      <div className="weekday">{weekdays[2]}</div>
      <div className="weekday">{weekdays[3]}</div>
      <div className="weekday">{weekdays[4]}</div>
      <div className="weekday">{weekdays[5]}</div>
      <div className="weekday">{weekdays[6]}</div>
      {days}
    </div>
  );
};

