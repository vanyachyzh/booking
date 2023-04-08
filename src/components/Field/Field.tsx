import React, { Dispatch, SetStateAction, useState } from 'react';
import './Field.scss'
import Alert from './../../images/iconss/alert-circle.svg';
import classNames from 'classnames';
import { Warning, Error } from '../../types';


type Props = {
  placeholder: string,
  label: string,
  helper: string,
  password?: boolean,
  error?: string | null,
  warning: string,
  value: string,
  setValue: (value: string) => void,
  setWarning:  React.Dispatch<React.SetStateAction<Warning>>
  setError?:  React.Dispatch<React.SetStateAction<Error>>
  pattern?: RegExp
}


export const Field: React.FC<Props> = ({
  placeholder,
  label,
  helper,
  password = true,
  error,
  warning,
  setWarning,
  value,
  setValue,
  setError,
  pattern,

}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if(setWarning) {
      setWarning(prev => ({
        ...prev,
        [label]: '',
      }));
    }

    if (setError) {
      setError(prev => ({
        ...prev,
        [label]: '',
      }));
    }
  }


  return (
    <div className='field'>
      <span className='field__label text-x-black-400'>
        {label[0].toUpperCase() + label.slice(1)}
      </span>

      <input
        autoComplete='off'
        name={label}
        value={value}
        onChange={onChange}
        className={classNames(
          'field__input',
          {'field__input--success': pattern?.test(value) && password}
        )}
        type="text"
        placeholder={placeholder}
      />

      {error && (
        <span className='field__error'>
          {error}
        </span>
      )}

      {warning && (
        <span className='field__warning'>
          {warning}
        </span>
      )}

    </div>

  )
};
