import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSpring, animated } from 'react-spring';
import './SideBar.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils';
import { Category } from '../Category';
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

  const style = useSpring({
    opacity: filteredKeysArray.length ? 1 : 0,
    height: filteredKeysArray.length ? "auto" : 0,
    overflow: 'hidden',
    config: { duration: 300 }
  });

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
        <TransitionGroup>
          {filteredKeysArray.map(key => {
            if (key === 'priceMin'
              || key === 'priceMax'
              || key === 'apartmentType'
              || key === 'stars'
              || key === 'rating'
            ) {
              return (
                <CSSTransition
                  key={key}
                  classNames='fade'
                  timeout={100}
                >
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
                </CSSTransition>
              )
            }
          })}
        </TransitionGroup>
      </div>



      <span className='side-bar__title text-xx-black-700'>Budget</span>
      <div className='side-bar__budget'>

        <input
          name='priceMin'
          value={priceMin}
          onChange={(event) => inputHandler("priceMin", event.target.value)}
          className='side-bar__budget-from'
          type="number"
          // pattern="[1-9]"
          // onKeyDown={}
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
          // pattern="[1-9]"
          min={0}
          step={1}
          placeholder='To'
        />
      </div>


      <div className='side-bar__category'>
        <Category
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
            ["Sleep place",
              "Hotel",
              "Apartment",
              "Villa",
              "Room",
              "Townhouse"]
          }
        />
      </div>


      <div className='side-bar__category'>
        <Category
          handler={singleCheckboxHandler}
          title="Guest rating"
          searchParameterKey="rating"
          searchParameterValues={
            ["5",
              "4",
              "3",
              "2",
              "1",
              "0"
            ]
          }
          values={
            ["5 Excellent",
              "4+ Very good",
              "3+ Good",
              "2+ Okay",
              "1+ Poor",
              "0+ Terrible"]
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
