import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './RegularCategory.scss'
import { NUM_ITEMS_TO_SHOW } from '../../api/booking';
import { Category } from '../../types';

type Props = {
  title: string,
  points: [string, string][],
  handleCheckboxChange: (group: string, value: number) => void,
  handler: (value: string[] | string) => void,
  type: 'mult' | 'single'
}



export const RegularCategory: React.FC<Props> = ({
  points: items,
  title,
  handleCheckboxChange,
  handler,
  type
}) => {
  const [numItemsToShow, setNumItemsToShow] = useState(NUM_ITEMS_TO_SHOW);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [checkedItem, setCheckedItem] = useState<string[]>([]);

  useEffect(() => {
    if( type === 'mult') {
      handler(checkedItems)
    }
    
    if (type === "single" && checkedItem.length ) {
      handler(checkedItem[checkedItem.length - 1])
    }

    if (type === "single" && !checkedItem.length ) {
      handler([])
    }

    console.log("was changed")
  }, [checkedItems, checkedItem]);


  const onButtonClick = () => {
    setNumItemsToShow(prev => prev + 10);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, point: string[]) => {
    if (e.target.checked) {
      handleCheckboxChange(e.target.name, 1)
      // setCurrentItem(point[1])
      setCheckedItems(prev => ([
        ...prev,
        point[1]
      ]))
      setCheckedItem(prev => ([
        ...prev,
        point[1]
      ]).sort((a, b) => +a - +b) )
    } else {
      handleCheckboxChange(e.target.name, -1)
      console.log('UNchecked')

      setCheckedItems(prev =>{
        const filtered = prev.filter(param => param !== point[1])

        return filtered;
      })

      setCheckedItem(prev =>{
        
        const newArr = [...prev];
        
        prev.pop();

        return newArr;
      })
    }
  }

  return (
    <div className="category">
      <h3 className='category__title text-xx-black-700'>{title}</h3>

      <ul className='category__list'>
        {items.slice(0, numItemsToShow).map(point => {
          return (
            <li
              key={point[0]}
              className='category__item'
            >
              <input
                id={point[0]}
                name={title}
                className='category__checkbox'
                type="checkbox"
                onChange={(e) => onChange(e, point)}
              />
              <label className='category__label' htmlFor={point[0]}>
                {point[1]}
              </label>

              <div className='category__value text-xx-gray-400'>12</div>
            </li>
          )
        })}
      </ul>

      {items.length > 3 && (

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
