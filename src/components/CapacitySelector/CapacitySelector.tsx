/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import './CapacitySelector.scss'
import Carousel from '../Carousel/Carousel';
import { ExtendedHotelInfo } from '../../types';
import Image from './../../images/iconss/calendar-up.svg'
import { MinusIcon, CalendarUpIcon, PlusIcon } from '../Icon/Icon';
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

const MIN_AMOUNT_PEOPLE = 1;
const MAX_AMOUNT_PEOPLE = 20;


export const CapacitySelector = () => {
  const [iconSateL, setIconStateL] = useState<IconState>(IconState.DefaultGray)
  const [iconSateR, setIconStateR] = useState<IconState>(IconState.DefaultGray)
  const [amount, setAmount] = useState(MIN_AMOUNT_PEOPLE);


  return (
    <div
      className='capacity-selector text-xx-gray-500'>
      <button
        onMouseOver={() => setIconStateL(IconState.HoverGray)}
        onMouseLeave={() => setIconStateL(IconState.DefaultGray)}
        className='capacity-selector__btn'
        type="button"
        onClick={() => setAmount(prev => prev - 1 > MIN_AMOUNT_PEOPLE
          ? prev - 1
          : MIN_AMOUNT_PEOPLE)}
      >
        <MinusIcon state={iconSateL} />
      </button>

      <span className='capacity-selector__amount'>
        {amount}
      </span>

      <button
        onMouseOver={() => setIconStateR(IconState.HoverGray)}
        onMouseLeave={() => setIconStateR(IconState.DefaultGray)}
        className='capacity-selector__btn'
        type="button"
        onClick={() => setAmount(prev => prev + 1 < MAX_AMOUNT_PEOPLE
          ? prev + 1
          : MAX_AMOUNT_PEOPLE)}
      >
        <PlusIcon state={iconSateR} />
      </button>
    </div>
  )

};
