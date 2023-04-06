/* eslint-disable no-unneeded-ternary */
import React, { useState } from 'react';
import './Button.scss'


type Props = {
  text: string,
  hight: number,
  width: number,
}

export const Button: React.FC<Props> = ({text}) => {
  return (
      <div className='button'>
        {text}
      </div>
  );
};