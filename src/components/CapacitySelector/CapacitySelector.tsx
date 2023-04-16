import React, { useState } from 'react';
import './CapacitySelector.scss';

import { MinusIcon, PlusIcon } from '../Icon/Icon';
import { IconState } from '../../types';
import { MIN_AMOUNT_PEOPLE, MAX_AMOUNT_PEOPLE } from '../../api/booking';

type Props = {
  value: number,
  setValue: React.Dispatch<React.SetStateAction<number>>
};

export const CapacitySelector: React.FC<Props> = ({ value, setValue }) => {
  const [iconSateL, setIconStateL] = useState<IconState>(IconState.DefaultGray)
  const [iconSateR, setIconStateR] = useState<IconState>(IconState.DefaultGray)

  return (
    <div
      className='capacity-selector text-xx-gray-500'>
      <button
        onMouseEnter={() => setIconStateL(IconState.HoverGray)}
        onMouseLeave={() => setIconStateL(IconState.DefaultGray)}
        className='capacity-selector__btn'
        type="button"
        name="left"
        disabled={value === 1}
        onClick={() => {
          setValue(prev => prev - 1 > MIN_AMOUNT_PEOPLE
            ? prev - 1
            : MIN_AMOUNT_PEOPLE)

          if (value === 2) {
            setIconStateL(IconState.DefaultGray)
          }
        }}
      >
        <MinusIcon state={iconSateL} />
      </button>

      <span className='capacity-selector__amount'>
        {value}
      </span>

      <button
        onMouseEnter={() => setIconStateR(IconState.HoverGray)}
        onMouseLeave={() => setIconStateR(IconState.DefaultGray)}
        className='capacity-selector__btn'
        type="button"
        name="right"
        disabled={value === 20}
        onClick={() => {
          setValue(prev => prev + 1 < MAX_AMOUNT_PEOPLE
            ? prev + 1
            : MAX_AMOUNT_PEOPLE)

          if (value === 19) {
            setIconStateR(IconState.DefaultGray)
          }
        }}
      >
        <PlusIcon state={iconSateR} />
      </button>
    </div>
  )

};
