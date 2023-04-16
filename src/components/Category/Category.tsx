import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Category.scss';

import { NUM_ITEMS_TO_SHOW } from '../../api/booking';
import { IconState } from '../../types';
import { DownIcon, UpIcon } from '../Icon/Icon';

type Props = {
  title: string,
  values: string[],
  searchParameterKey: string,
  searchParameterValues: string[],
  handler: (
    searchParameterKey: string,
    searchParameterValue: string,
    checked: boolean
  ) => void,
}

export const Category: React.FC<Props> = ({
  title,
  values,
  searchParameterKey,
  searchParameterValues,
  handler,
}) => {
  const [numItemsToShow, setNumItemsToShow] = useState(NUM_ITEMS_TO_SHOW);
  const [iconSate, setIconState] = useState(IconState.Active);
  const [searchParams] = useSearchParams();
  const currentSearchParametersValues = searchParams.getAll(searchParameterKey);

  const onClick = () => {
    setNumItemsToShow(values.length);
    setIconState(IconState.Active)
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    handler(searchParameterKey, name, checked);
  }

  return (
    <div className="category">
      <h3 className='category__title text-xx-black-700'>
        {title}
      </h3>


      <ul className='category__list'>
        {/* <TransitionGroup> */}
        {values.slice(0, numItemsToShow).map((value, index) => {
          return (
            // <CSSTransition
            //   key={index}
            //   classNames='fade'
            //   timeout={300}
            //   unmountOnExit
            // >
            <li
              key={value}
              className='category__item'
            >
              <input
                checked={(currentSearchParametersValues.includes(searchParameterValues[index]))}
                id={value}
                name={searchParameterValues[index]}
                className='category__checkbox'
                type="checkbox"
                onChange={onChange}
              />

              <label
                className='category__label'
                htmlFor={value}
              >
                {value}
              </label>
            </li>
            //  </CSSTransition>
          )
        })}
        {/* </TransitionGroup> */}
      </ul>

      {values.length > NUM_ITEMS_TO_SHOW && (
        <div>
          {numItemsToShow === 3
            ? (
              <button
                onMouseLeave={() => setIconState(IconState.Active)}
                onMouseEnter={() => setIconState(IconState.DarkBlue)}
                onClick={onClick}
                className='category__btn-show text-xx-blue-500'>
                <DownIcon state={iconSate} />
                Show all
              </button>
            ) : (
              <button
                onMouseLeave={() => setIconState(IconState.Active)}
                onMouseEnter={() => setIconState(IconState.DarkBlue)}
                onClick={() => {
                  setNumItemsToShow(3)
                  setIconState(IconState.Active)
                }}
                className='category__btn-hide text-xx-blue-500'>
                <UpIcon state={iconSate} />
                Hide
              </button>
            )
          }
        </div>
      )}
    </div>
  )
};
