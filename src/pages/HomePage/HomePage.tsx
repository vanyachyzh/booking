import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import './HomePage.scss';

import { SideBar } from '../../components/SideBar';
import { Header } from '../../components/Header';
import { HotelList } from '../../components/HotelList';
import { ExtendedHotelInfo } from '../../types/HotelInfo';
import { User } from '../../types';
import { SearchBar } from '../../components/SearchBar';
import { getData } from '../../api/booking';
import { AuthContext } from '../../App';


type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const HomePage: React.FC<Props> = ({ setUser }) => {
  const context = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [hotelList, setHotelList] = useState<ExtendedHotelInfo[] | null>(null);
  const [responseError, setResponseError] = useState(false);


  useEffect(() => {
    fetch('https://innjoy.space/hotels/all')
    .then(r => r.json())
    .then(r => setHotelList(r))
    .catch(r => setResponseError(true))
  }, [])


  const login = () => {
    fetch(`https://innjoy.space/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "username=johny-j1990@gmail.com&password=joohnyJ29"
    })
      .then(r => console.log(r))
  }


  const afterlogin = () => {
    fetch(`https://innjoy.space/users/user`)
      .then(r => r.json())
      .then(console.log)
  }




  const book = () => {
    // fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/sort_reviews_by_hotel2')
    // .then(r => r.json())
    // .then(console.log)

    // fetch('https://innjoy.space/hotels/all').then(r => r.json()).then(console.log)

    fetch(`https://innjoy.space/orders/complete`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          apartmentsIds: [17],
          dateFrom: "2023-06-02",
          dateTo: "2023-06-05"
        })
    })
      .then(r => console.log(r))
  }


  useEffect(() => {
    // const stringSearchParams = searchParams.toString();
    // if (stringSearchParams) {
    //   getData(`filters?${stringSearchParams}`)
    //   .then(data => setHotelList(data))
    //   .catch(error => setResponseError(true))
    // }



    if ("" !== searchParams.toString()) {
      const url = `https://innjoy.space/hotels/filters?${searchParams.toString()}`;


      const url1 = `https://innjoy.space/hotels/filters?city=New%25York&dateFrom=2023-04-12&dateTo=2023-05-23&capacity=1`;
      console.log(url, url1)

      fetch(url)
        .then(r => r.json())
        .then(r => setHotelList(r))
              .catch(r => setResponseError(true))
    } else {
      // const url = 'http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/all'
      const url = 'https://innjoy.space/hotels/all'
      fetch(url)
        .then(r => r.json())
        // .then(r => console.log(r))
        .then(r => setHotelList(r))
        .catch(r => setResponseError(true))
    }

  }, [searchParams])

  return (
    <>
      {/* <button onClick={book}>
        Book
      </button>

      <button onClick={afterlogin}>
        get user
      </button>

      <button onClick={login}>
        Login
      </button> */}
      <div className='homepage'>
        <Header
          setUser={setUser}
        />
        <SearchBar
          cards={hotelList}
          setCards={setHotelList}
          setUser={setUser}
        />
        <div className="containerr">
          <SideBar />
          <div className='homepage__cards'>
            <HotelList
              responseError={responseError}
              hotels={hotelList}
              setHotels={setHotelList}
            />
          </div>
        </div>
      </div>
    </>
  )
};
