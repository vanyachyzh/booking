import React from "react";
import './Rating.scss'
import { getColor, getRating } from "../../api/booking";

interface Props {
  data: { [key: string]: number };
  average: number
}

export const Rating: React.FC<Props> = ({ data, average }) => {
  const gradeTotal = Object.entries(data).reduce((acc, item) => {
    return acc + item[1];
  }, 0);


  const extendedRatingInfo = [];

  for (const grade in data) {
    extendedRatingInfo.push([grade, data[grade], data[grade] * 100 / gradeTotal, getRating(+grade)])
  }

  return (
    <div className="rating">
      <span
        style={{ color: getColor(average) }}
        className="rating__value"
      >
        {average}
      </span>
      <span className="rating__title">
        {getRating(average)}
      </span>

      <div className="rating__range">
        {extendedRatingInfo.reverse().map(item => (

          <div
            key={item[0]}
            className="rating__item"
          >

            <span className="rating__desc text-xx-black-500">
              {item[0] === "5"
                ? `${item[0].slice(0, 1)} ${item[3]}`
                : `${String(item[0]).slice(0, 1)}+ ${item[3]}`}
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

