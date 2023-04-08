import React, { useRef, useState, useEffect } from 'react';
import './Field.scss'
import Alert from './../../images/iconss/alert-circle.svg';
import classNames from 'classnames';
import { Warning, Error, IconState } from '../../types';
import { EyeIcon } from '../Icon/Icon';


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
  type = 'text',
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


  // const [isPasswordHidden, setIsPasswordHidden] = useState(false);
  // const [iconState, setIconState] = useState(IconState.DefaultEye);
  // const [isActive, setIsActive] = useState(false);
  // const myInput = useRef<HTMLInputElement>(null);


  // const handleButtonClick = () => {
  //   if (myInput.current) {
  //     myInput.current.focus();
  //   }
  // };

  // useEffect(() => {

  //   if (isPasswordHidden) {
  //     setIconState(IconState.ActiveEye)
  //   }
  // }, [isPasswordHidden])

  return (
    <div className='field'>
      {label && (
        <span className='field__label text-x-black-400'>
          {label[0].toUpperCase() + label.slice(1)}
        </span>
      )}


      <input
        autoComplete='off'
        name={label}
        value={value}
        onChange={onChange}
        className={classNames(
          'field__input',
          { 'field__input--success': pattern?.test(value) && password },
          // { 'field__input--active': isActive },
          // { 'field__input--hidden': isPasswordHidden }
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

      {/* <button
        onMouseOver={() => setIconState(IconState.HoverEye)}
        onMouseLeave={() => setIconState(IconState.DefaultEye)}
        onClick={() => {
          setIsPasswordHidden(prev => !prev);
          setIsActive(true);
          handleButtonClick();
        }}
        className='field__eye'>
        <EyeIcon state={iconState} />
      </button> */}

    </div>

  )
};
