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
  dropdown?: React.ReactNode,
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAnother: React.Dispatch<React.SetStateAction<boolean>>,
};

// function handleClick(event) {
//   console.log("Натиснуто на елемент з класом:", event.target.className);
// }


export const CalendarButton: React.FC<Props> = ({ title, dropdown, isActive, setIsActive: setIsOpen, setIsAnother, type }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [iconSate, setIconState] = useState<IconState>(IconState.Default)

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    console.log(clickedElement)
    if (!clickedElement.classList.contains('calendar-button')
      && !clickedElement.classList.contains('calendar')
      && !clickedElement.classList.contains('weekday')
      && !clickedElement.classList.contains('title')
      && !clickedElement.classList.contains('calendar__number')
      && !clickedElement.classList.contains('search-bar__button--prev')
      && !clickedElement.classList.contains('search-bar__button--next')
      && !clickedElement.classList.contains('calendar__number-out')
      && !clickedElement.classList.contains('calendar')
      && !clickedElement.classList.contains('search-bar__calendars')
      && !clickedElement.classList.contains('day')
      && !clickedElement.classList.contains('calendar-button__dropdown')
      ) {
      setIsOpen(false)
    }
  };


  const handleClick = (): void => {
    setIsOpen(prev => !prev);
    setIsAnother(false);
  };


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

  const handleBlur = () => {
    setIsFocused(false);
    setIconState(IconState.Default);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='calendar-button text-xx-gray-500'
      >
        <div className='calendar-button__img'>
          {type === 'up'
            ? (<CalendarUpIcon state={iconSate} />)
            : (<CalendarDownIcon state={iconSate} />)}
        </div>
        {title}
      </button>

      {isActive && (
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
