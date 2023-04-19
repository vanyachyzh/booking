import React from 'react';
import './Field.scss';
import classNames from 'classnames';

import { Warning, Error } from '../../types';

type Props = {
  type?: 'text' | 'password',
  placeholder: string,
  label?: string,
  helper?: string,
  password?: boolean,
  error?: string | null,
  warning?: string,
  value: string,
  setValue: (value: string) => void,
  setWarning?: React.Dispatch<React.SetStateAction<Warning>>
  setError?: React.Dispatch<React.SetStateAction<Error>>
  pattern?: RegExp,
  number?: boolean,
  maxLength?: number,
  isPassword?: boolean
};

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
  type = 'text',
  maxLength,
  isPassword
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (label) {
      if (setWarning) {
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
  }

  return (
    <div className='field'>
      {label && (
        <span className='field__label text-x-black-500'>
          {label[0].toUpperCase() + label.slice(1)}
        </span>
      )}

      <input
        autoComplete='off'
        name={label}
        maxLength={maxLength}
        value={value}
        onChange={(e) => {
          onChange(e)
        }}
        className={classNames(
          'field__input',
          { 'field__input--success': pattern?.test(value) && password },
        )}
        type={type}
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
