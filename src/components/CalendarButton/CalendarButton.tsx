/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import './CalendarButton.scss'
import Carousel from '../Carousel/Carousel';
import { ExtendedHotelInfo } from '../../types';
import Image from './../../images/iconss/calendar-up.svg'
import { MinusIcon, CalendarUpIcon, CalendarDownIcon } from '../Icon/Icon';
import classNames from 'classnames';
import { IconState } from '../../types';


type Props = {
  type: 'up' | 'down',
  title: string,
  dropdown: React.ReactNode,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAnother: React.Dispatch<React.SetStateAction<boolean>>,
};


export const CalendarButton: React.FC<Props> = ({ title, dropdown, isOpen, setIsOpen, setIsAnother, type }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [iconSate, setIconState] = useState<IconState>(IconState.Default)

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIconState(IconState.Active);
    }
  }, [isOpen])

  const handleClickOutside = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    console.log(clickedElement)
    if (!clickedElement.classList.contains('calendar-button')
      && !clickedElement.classList.contains('calendar')
      && !clickedElement.classList.contains('weekday')
      && !clickedElement.classList.contains('title')
      && !clickedElement.classList.contains('calendar__number')
      && !clickedElement.classList.contains('header__button--next')
      && !clickedElement.classList.contains('header__button--prev')
      && !clickedElement.classList.contains('calendar__number-out')
      && !clickedElement.classList.contains('calendar')
      && !clickedElement.classList.contains('header__calendars')
      && !clickedElement.classList.contains('day')
      && !clickedElement.classList.contains('calendar-button__dropdown')
      ) {
      setIsOpen(false)
      setIconState(IconState.Default);
    }
  };

  const handleClick = (): void => {
    setIsOpen(prev => !prev);
    setIsAnother(false);
    // setIconState(IconState.Default);
  };

  const onMouseOver = () => {
    setIconState(IconState.Hover);
  };

  const onMouseOut = () => {
    if (!isOpen) {
      setIconState(IconState.Default);
    }
  };

  // const [iconColor, setIconColor] = useState('#868E96');

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        className={classNames(
          'calendar-button',
          'text-xx-gray-500',
          { 'calendar-button--active': isOpen }
        )}
      >
        <div className='calendar-button__img'>
          {type === 'up'
            ? (<CalendarUpIcon state={iconSate} />)
            : (<CalendarDownIcon state={iconSate} />)}
        </div>
        {title}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className='calendar-button__dropdown'
        >
          {dropdown}
        </div>
      )}
    </>
  )

};
