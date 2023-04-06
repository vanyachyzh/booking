import React from 'react';
import './RatingCategory.scss';
import Star from './../../images/iconss/star-filled-gold.svg';


type Props = {
  handleCheckboxChange: (group: string, value: number) => void
}


export const RatingCategory: React.FC<Props> = ({handleCheckboxChange}) => {
  const grades = [1, 2, 3, 4, 5];

  return (
    <div className="rcategory">
      <h3 className='rcategory__title text-xx-black-700'>Property class</h3>

      <ul className='rcategory__list'>
        {grades.map(point => {
          return (
            <li
              key={point}
              className='rcategory__item'
            >
              <input
                id={String(point)}
                className={`rcategory__checkbox rcategory__checkbox--${point}`}
                type="checkbox"
                name='Property class'
                onChange={(e) => {
                  if (e.target.checked) {
                    handleCheckboxChange(e.target.name, 1)
                  } else {
                    handleCheckboxChange(e.target.name, -1)
                  }
                  }
                }
              />
              <label
                className='rcategory__label'
                htmlFor={String(point)}
              >
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
};
