import React, { Dispatch, SetStateAction, useState } from 'react';
import './RegularCategory.scss'

type Props = {
  title: string,
  points: string[],
  handleCheckboxChange: (group: string, value: number) => void
}

export const RegularCategory: React.FC<Props> = ({ points, title, handleCheckboxChange }) => {
  const [numItemsToShow, setNumItemsToShow] = useState(3);


  const onButtonClick = () => {
    setNumItemsToShow(prev => prev + 10);
  };

  return (
    <div className="category">
      <h3 className='category__title text-xx-black-700'>{title}</h3>

      <ul className='category__list'>
        {points.slice(0, numItemsToShow).map(point => {
          return (
            <li
              key={point}
              className='category__item'
            >
              <input
                id={point}
                name={title}
                className='category__checkbox'
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    handleCheckboxChange(e.target.name, 1)
                    console.log('checked')
                  } else {
                    handleCheckboxChange(e.target.name, -1)
                    console.log('UNchecked')
                  }
                }
                }
              />
              <label className='category__label' htmlFor={point}>
                {point}
              </label>

              <div className='category__value text-xx-gray-400'>12</div>
            </li>
          )
        })}
      </ul>

      {points.length > 3 && (

        <div>
          {numItemsToShow === 3
            ? (
              <button
                onClick={onButtonClick}
                className='category__btn-show text-xx-blue-500'>
                Show all
              </button>
            ) : (
              <button
                onClick={() => setNumItemsToShow(3)}
                className='category__btn-hide text-xx-blue-500'>
                Hide
              </button>
            )
          }
        </div>
      )}
    </div>
  )
};
