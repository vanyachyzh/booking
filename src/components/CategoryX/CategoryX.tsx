import React, { useState } from 'react';
import './CategoryX.scss'
import { NUM_ITEMS_TO_SHOW } from '../../api/booking';
import { useSearchParams } from 'react-router-dom';

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

export const CategoryX: React.FC<Props> = ({
  title,
  values,
  searchParameterKey,
  searchParameterValues,
  handler,
}) => {
  const [numItemsToShow, setNumItemsToShow] = useState(NUM_ITEMS_TO_SHOW);
  const [searchParams] = useSearchParams();
  const currentSearchParametersValues = searchParams.getAll(searchParameterKey);


  console.log(currentSearchParametersValues)
  const onClick = () => {
    setNumItemsToShow(values.length);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    handler(searchParameterKey, name, checked);
  }

  // const getAmount = async (searchParameterKey: string, searchParameterValue: string) => {
  //   const response = await fetch(`http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/filter?${searchParameterKey}=${searchParameterValue}`);
  //   const data = await response.json();
  //   const amount = data.length;
  //   return amount;
  // }

  // function fetchData(index: number, searchParameterKey: string, searchParameterValue: string) {
  //   return getAmount(searchParameterKey, searchParameterValues[index])
  //     .then(amount => {
  //       return amount;
  //     });
  // }

  return (
    <div className="category">
      <h3 className='category__title text-xx-black-700'>
        {title}
      </h3>

      <ul className='category__list'>
        {values.slice(0, numItemsToShow).map((value, index) => {
          return (
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

              {/* <span>
                {fetchData(index, searchParameterKey, searchParameterValues[index])}
              </span> */}
            </li>
          )
        })}
      </ul>

      {values.length > NUM_ITEMS_TO_SHOW && (
        <div>
          {numItemsToShow === 3
            ? (
              <button
                onClick={onClick}
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
