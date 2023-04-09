import React, { useEffect, useState } from 'react';
import './SideBar.scss';
import { RegularCategory } from '../RegularCategory';
import { RatingCategory } from '../RatingCategory';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils';

const initialSelectedGroups = {
  'apartmentType': 0,
  'priceMin': 0,
  'priceMax': 0,
  'stars': 0,
  'rating': 0
}

export const SideBar: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const priceMin = searchParams.get('priceMin') || '';
  const priceMax = searchParams.get('priceMax') || '';
  const rating = searchParams.get('rating') || '';
  const apartmentType = searchParams.get('apartmentType') || '';
  const stars = searchParams.get('stars') || '';


  const [selectedGroups, setSelectedGroups] = useState(initialSelectedGroups);
  let budgetFrom = ""
  let budgetTo = ""


  const handleCheckboxChange = (group: string, value: number) => {

    setSelectedGroups(prev => (
      {
        ...prev,
        [group]: (prev as any)[group] + value < 0 ? 0 : (prev as any)[group] + value,
      }
    ));
  };



  const handleUncheck = (type: string) => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][name="${type}"]`);
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    console.log(type)

    searchParams.delete(type);
    setSearchParams(searchParams);

  };


  const clearBudget = () => {


    const budgets = document.querySelectorAll<HTMLInputElement>(`input[name="Budget"]`);
    budgets.forEach((checkbox) => {
      checkbox.value = "";
    });

    searchParams.delete('priceMin');
    searchParams.delete('priceMax');
    setSearchParams(searchParams);

  }


  useEffect(() => {
    console.log(budgetFrom)
  }, [selectedGroups, budgetFrom])

  const handleRating = (value: string[] | string) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        { rating: value },
      ),
    );
  }

  const handlePolicy = (value: string[] | string) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        { rating: value },
      ),
    );
  }

  const handleClass = (value: string[] | string) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        { stars: value },
      ),
    );
  }


  const handleType = (value: string[] | string) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        { apartmentType: value },
      ),
    );
  }

  const onBudgetFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    budgetFrom = event.target.value;
    if (priceMin && priceMax) {
      setSelectedGroups(prev => ({
        ...prev,
        "Budjet": 1,
      }))
    }

    console.log(budgetFrom === "")
    if (budgetFrom === null) {
      clearBudget()
      setSelectedGroups(prev => ({
        ...prev,
        "Budjet": 0,
      }))
    }

    setSearchParams(
      getSearchWith(
        searchParams,
        { priceMin: event.target.value || null },
      ),
    );
  }

  const onBudgetToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    budgetTo = event.target.value;
    if (priceMin && priceMax) {
      setSelectedGroups(prev => ({
        ...prev,
        "Budjet": 1,
      }))
    }

    if (budgetTo === null) {
      clearBudget()
      setSelectedGroups(prev => ({
        ...prev,
        "Budjet": 0,
      }))
    }


    setSearchParams(
      getSearchWith(
        searchParams,
        { priceMax: event.target.value || null },
      ),
    );
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
          onClick={() => {
            handleUncheck("apartmentType")
            setSelectedGroups(prev => ({
              ...prev,
              "apartmentType": 0,
            }))

            searchParams.delete('rating');
            searchParams.delete('stars');
            searchParams.delete('apartmentType');
            searchParams.delete('priceMin');
            searchParams.delete('priceMax');
            searchParams.delete('apartmentType');
            searchParams.delete('rating');
            setSearchParams(searchParams);
            handleUncheck("rating")
            setSelectedGroups(prev => ({
              ...prev,
              "rating": 0,
            }))
            // handleUncheck("Cancellation policy")
            // setSelectedGroups(prev => ({
            //   ...prev,
            //   "Cancellation policy": 0,
            // }))
            handleUncheck("stars")
            setSelectedGroups(prev => ({
              ...prev,
              "stars": 0,
            }))
            clearBudget()
            setSelectedGroups(prev => ({
              ...prev,
              "Budjet": 0,
            }))

            // handleUncheck("Meals")
            // setSelectedGroups(prev => ({
            //   ...prev,
            //   "Meals": 0,
            // }))
          }}
        >
          Clear All
        </button>
      </section>

      <div className='side-bar__filter'>
        {Object.entries(selectedGroups).map(item => {
          if (item[1] > 0) {
            return (
              <button
                onClick={() => {

                  if (item[0] === "Budjet") {
                    clearBudget()
                  }
                  handleUncheck(item[0]);
                  
                  setSelectedGroups(prev => ({
                    ...prev,
                    [item[0]]: 0,
                  }))
                }}
                className='side-bar__delete-btn'
              >
                {item[0]}
              </button>
            )
          }
        })}
      </div>


      <span className='side-bar__title text-xx-black-700'>Budget</span>
      <div className='side-bar__budget'>

        <input
          name='Budget'
          defaultValue={budgetFrom}
          onChange={onBudgetFromChange}
          className='side-bar__budget-from'
          type="number"
          min={0}
          step={1}
          placeholder='From'
        />
        <input type="number"
          min={0}
          step={1} name='Budget' defaultValue={budgetTo}
          onChange={onBudgetToChange} className='side-bar__budget-to' placeholder='To' />
      </div>

      {/* <div className='side-bar__category'>
        <RegularCategory
          handler={handleRating}
          handleCheckboxChange={handleCheckboxChange}
          points={[
            ["yes", "yes"],
            ["no", "no"],
          ]
          }
          title="Cancellation policy"
        />
      </div> */}


      <div className='side-bar__category'>
        <RegularCategory
          type='mult'
          handler={handleType}
          handleCheckboxChange={handleCheckboxChange}
          title='apartmentType'
          points={[
            ["TEPEE", "TEPEE"],
            ["BED", "BED"],
            ["APARTMENT", "APARTMENT"],
            ["VILLA", "VILLA"],
            ["ROOM", "ROOM"],
            ["TOWNHOUSE", "TOWNHOUSE"]
          ]
          }
        />
      </div>

      <div className='side-bar__category'>
        <RatingCategory
          handleCheckboxChange={handleCheckboxChange}
          handler={handleClass}
        />
      </div>

      <div className='side-bar__category'>
        <RegularCategory
          type='single'
          handler={handleRating}
          handleCheckboxChange={handleCheckboxChange}
          title='rating'
          points={[
            ["1c", "1"],
            ["2c", "2"],
            ["3c", "3"],
            ["4c", "4"],
            ["5c", "5"],
            ["6c", "6"],
            ["7c", "7"],
            ["8c", "8"],
            ["9c", "9"]
          ]
          }
        />
      </div>

      {/* <div className='side-bar__category'>
        <RegularCategory
          handler={handleRating}
          handleCheckboxChange={handleCheckboxChange}
          title='Meals'
          points={[
            ["1b", "1"],
            ["2b", "2"],
            ["3b", "3"],
            ["4b", "4"],
            ["5b", "5"],
            ["6b", "6"],
            ["7b", "7"],
            ["8b", "8"],
            ["9b", "9"]
          ]
          }
        />
      </div> */}
    </form>
  )
};
