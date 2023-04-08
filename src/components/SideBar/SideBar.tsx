import React, { useEffect, useState } from 'react';
import './SideBar.scss';
import { RegularCategory } from '../RegularCategory';
import { RatingCategory } from '../RatingCategory';

const initialSelectedGroups = {
  'Type of property': 0,
  'Guest rating': 0,
  'Meals': 0,
  "Cancellation policy": 0,
  'Property class': 0,
  'Budjet': 0
}

export const SideBar: React.FC = () => {

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

  // const [value, setValue] = useState("");

  // function handleFocus() {
  //   setValue("$");
  // }

  const handleUncheck = (type: string) => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][name="${type}"]`);
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };


  const clearBudget = () => {
    const budgets = document.querySelectorAll<HTMLInputElement>(`input[name="Budget"]`);
    budgets.forEach((checkbox) => {
      checkbox.value = "";
    });
  }


  useEffect(() => {
    console.log(budgetFrom)
  }, [selectedGroups, budgetFrom])

  // const hasSelectedGroup = () => {
  //   return Object.values(selectedGroups).some((value) => value);
  // };

  // const renderMessage = () => {
  //   if (hasSelectedGroup()) {
  //     const selectedGroupNames = Object.entries(selectedGroups)
  //       .filter(([_, value]) => value)
  //       .map(([group, _]) => group)
  //       .join(", ");
  //     return <div>{`Selected groups: ${selectedGroupNames}`}</div>;
  //   } else {
  //     return null;
  //   }
  // };

  const onBudgetFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    budgetFrom = event.target.value;
    if (budgetFrom && budgetTo) {
      setSelectedGroups(prev => ({
        ...prev,
        "Budjet": 1,
      }))
    } 

    console.log( budgetFrom === "")
    if (budgetFrom === "") {
      clearBudget()
      setSelectedGroups(prev => ({
        ...prev,
        "Budjet": 0,
      }))
    }
  }

  const onBudgetToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    budgetTo = event.target.value;
    if (budgetFrom && budgetTo) {
      setSelectedGroups(prev => ({
        ...prev,
        "Budjet": 1,
      }))
    } 

    if (budgetTo === "") {
      clearBudget()
      setSelectedGroups(prev => ({
        ...prev,
        "Budjet": 0,
      }))
    }
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
            handleUncheck("Type of property")
            setSelectedGroups(prev => ({
              ...prev,
              "Type of property": 0,
            }))
            handleUncheck("Guest rating")
            setSelectedGroups(prev => ({
              ...prev,
              "Guest rating": 0,
            }))
            handleUncheck("Cancellation policy")
            setSelectedGroups(prev => ({
              ...prev,
              "Cancellation policy": 0,
            }))
            handleUncheck("Property class")
            setSelectedGroups(prev => ({
              ...prev,
              "Property class": 0,
            }))
            clearBudget()
            setSelectedGroups(prev => ({
              ...prev,
              "Budjet": 0,
            }))

            handleUncheck("Meals")
            setSelectedGroups(prev => ({
              ...prev,
              "Meals": 0,
            }))
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
        <input              type="number"
          min={0}
          step={1} name='Budget'       defaultValue={budgetTo}
          onChange={onBudgetToChange} className='side-bar__budget-to'  placeholder='To' />
      </div>

      <div className='side-bar__category'>
        <RegularCategory
          handleCheckboxChange={handleCheckboxChange}
          points={["Free cancellation", "No prepayment"]}
          title="Cancellation policy"
        />
      </div>



      <div className='side-bar__category'>
        <RegularCategory
          handleCheckboxChange={handleCheckboxChange}
          title='Type of property'
          points={["SPA", "Pool", "Restaurant", "Parking", "Gym", "WiFi"]}
        />
      </div>

      <div className='side-bar__category'>
        <RatingCategory handleCheckboxChange={handleCheckboxChange} />
      </div>

      <div className='side-bar__category'>
        <RegularCategory
          handleCheckboxChange={handleCheckboxChange}
          title='Guest rating'
          points={["Bad", "Very bad"]}
        />
      </div>

      <div className='side-bar__category'>
        <RegularCategory
          handleCheckboxChange={handleCheckboxChange}
          title='Meals'
          points={["Self catering", "Breakfast included", "Lunch included", "Dinner included"]}
        />
      </div>
    </form>
  )
};
