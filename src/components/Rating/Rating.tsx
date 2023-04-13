import React, { useState } from "react";
import './Rating.scss'


const getRating = (number: number) => {
  console.log(number)
  if (number === 0) { return 'Terrible' }
  if (number === 1) { return 'Poor' }
  if (number === 2) { return 'Okay' }
  if (number === 3) { return 'Good' }
  if (number === 4) { return 'Very good' }
  if (number === 5) { return 'Excellent' }
}
//////////////////////////////////////////////////////////////////////////////////

interface Props {
  data: { [key: string]: number };
}

export const Rating: React.FC<Props> = ({ data }) => {
  const gradeAmount = Object.entries(data).reduce((acc, item) => {
    return acc + item[1];
  }, 0);

  const extendedRatingInfo = [];

  for (const grade in data) {
    extendedRatingInfo.push([grade, data[grade], data[grade] * 100 / gradeAmount, getRating(+grade)])
  }

  return (
    <div className="rating">
      <span className="rating__value">8.9</span>
      <span className="rating__title">Excellent</span>

      <div className="rating__range">
        {extendedRatingInfo.reverse().map(item => (

          <div
            key={item[0]}
            className="rating__item"
          >

            <span className="rating__desc text-xx-black-500">
              {item[0] === "5" ? `${item[0]} ${item[3]}` : `${item[0]}+ ${item[3]}`}
            </span>

            <span className="rating__amount">
              {item[1]}
            </span>

            <div
              key={+item}
              className="rating__line"
            >
              <div
                className="rating__fill"
                style={{ width: `${item[2]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

