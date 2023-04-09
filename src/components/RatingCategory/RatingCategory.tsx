import React from 'react';
import './RatingCategory.scss';
import { useSearchParams } from 'react-router-dom';


type Props = {
  handler: (searchParameterKey: string, searchParameterValue: string, checked: boolean) => void
}


export const RatingCategory: React.FC<Props> = ({ handler }) => {
  const [searchParams] = useSearchParams();
  const currentStars = searchParams.getAll('stars');
  const values = ['1', '2', '3', '4', '5'];


  return (
    <div className="rating-category">
      <h3 className='rating-category__title text-xx-black-700'>Property class</h3>

      <ul className='rating-category__list'>
        {values.map(value => {
          return (
            <li
              key={value}
              className='rating-category__item'
            >
              <input
                checked={currentStars.includes(value)}
                id={value + 1}
                className={`rating-category__checkbox rating-category__checkbox--${value}`}
                type="checkbox"
                onChange={(event) => handler('stars', value, event.target.checked)}
              />

              <label
                className='rating-category__label'
                htmlFor={value + 1}
              >
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
};
