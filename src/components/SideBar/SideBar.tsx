import React from 'react';
import './SideBar.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils';
import { CategoryX } from '../CategoryX';
import { RatingCategory } from '../RatingCategory';

export const SideBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keysArray = Array.from(searchParams.keys());
  const filteredKeysArray = keysArray.filter((item, index) => {
    return keysArray.indexOf(item) === index;
  });

  const priceMin = searchParams.get('priceMin') || '';
  const priceMax = searchParams.get('priceMax') || '';
  const rating = searchParams.get('rating') || '';
  const apartmentType = searchParams.get('apartmentType') || '';
  const stars = searchParams.get('stars') || '';

  console.log(filteredKeysArray)

  const multipleCheckboxHandler = (
    searchParameterKey: string,
    searchParameterValue: string,
    checked: boolean,
  ) => {
    const currentSearchValues = searchParams.getAll(searchParameterKey);

    if (checked) {
      setSearchParams(
        getSearchWith(
          searchParams,
          {
            [searchParameterKey]: [
              ...currentSearchValues,
              searchParameterValue
            ]
          },
        ),)
    } else {
      setSearchParams(
        getSearchWith(
          searchParams,
          {
            [searchParameterKey]: currentSearchValues.filter(value => value !== searchParameterValue)
          },
        ),)
    }
  }

  const singleCheckboxHandler = (
    searchParameterKey: string,
    searchParameterValue: string,
    checked: boolean,
  ) => {
    if (checked) {
      setSearchParams(
        getSearchWith(
          searchParams,
          {
            [searchParameterKey]: searchParameterValue
          },
        ),)
    } else {
      setSearchParams(
        getSearchWith(
          searchParams,
          {
            [searchParameterKey]: null
          },
        ),)
    }
  }

  const inputHandler = (
    searchParameterKey: string,
    searchParameterValue: string
  ) => {
    if (searchParameterValue) {
      setSearchParams(
        getSearchWith(
          searchParams,
          {
            [searchParameterKey]: searchParameterValue
          },
        ),)
    } else {
      setSearchParams(
        getSearchWith(
          searchParams,
          {
            [searchParameterKey]: null
          },
        ),)
    }
  }

  const uncheckCategory = (searchParameterKey: string) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        {
          [searchParameterKey]: null
        },
      ),)
  }

  const uncheckAll = () => {
    setSearchParams(
      getSearchWith(
        searchParams,
        {
          rating: null,
          stars: null,
          priceMin: null,
          priceMax: null,
          apartmentType: null
        },
      ),)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className='side-bar'
    >
      <section className='side-bar__header text-xx-black-700'>
        Filters
        <button
          type='button'
          className="side-bar__clear text-xx-blue-500"
          onClick={uncheckAll}
        >
          Clear All
        </button>
      </section>

      <div className='side-bar__filter'>
        {filteredKeysArray.map(key => {
          if (key === 'priceMin'
            || key === 'priceMax'
            || key === 'apartmentType'
            || key === 'stars'
            || key === 'rating'
            ) {
            return (
              <button
                className='side-bar__delete-btn'
                onClick={() => uncheckCategory(key)}
              >
                {key === 'priceMin' && 'Budget'}
                {key === 'priceMax' && 'Budget'}
                {key === 'apartmentType' && 'Type of property'}
                {key === 'stars' && 'Property class'}
                {key === 'rating' && 'Guest rating'}
              </button>
            )
          }
        })}
      </div>

      <span className='side-bar__title text-xx-black-700'>Budget</span>
      <div className='side-bar__budget'>

        <input
          name='priceMin'
          value={priceMin}
          onChange={(event) => inputHandler("priceMin", event.target.value)}
          className='side-bar__budget-from'
          type="number"
          min={0}
          step={1}
          placeholder='From'
        />
        <input
          name='priceMax'
          value={priceMax}
          onChange={(event) => inputHandler("priceMax", event.target.value)}
          className='side-bar__budget-to'
          type="number"
          min={0}
          step={1}
          placeholder='To'
        />
      </div>

      <div className='side-bar__category'>
        <CategoryX
          handler={multipleCheckboxHandler}
          title="Type of property"
          searchParameterKey="apartmentType"
          searchParameterValues={
            ["BED",
              "TEPEE",
              "APARTMENT",
              "VILLA",
              "ROOM",
              "TOWNHOUSE"]
          }
          values={
            ["Bed",
              "Tere",
              "Apartament",
              "Villa",
              "Room",
              "Townhouse"]
          }
        />
      </div>


      <div className='side-bar__category'>
        <CategoryX
          handler={singleCheckboxHandler}
          title="Guest rating"
          searchParameterKey="rating"
          searchParameterValues={
            ["10",
              "8",
              "6",
              "4",
              "2"
            ]
          }
          values={
            ["10 Excellent",
              "8+ Good",
              "6+ Okay",
              "4+ Poor",
              "2+ Terrible"]
          }
        />
      </div>

      <div className='side-bar__category'>
        <RatingCategory
          handler={singleCheckboxHandler}
        />
      </div>
    </form>
  )
};
