import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './HomePage.scss';

import { SideBar } from '../../components/SideBar';
import { Header } from '../../components/Header';
import { HotelList } from '../../components/HotelList';
import { ExtendedHotelInfo } from '../../types/HotelInfo';
import { User } from '../../types';
import { SearchBar } from '../../components/SearchBar';
import { getData } from '../../api/booking';


type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const HomePage: React.FC<Props> = ({ setUser }) => {
  const [searchParams] = useSearchParams();
  const [hotelList, setHotelList] = useState<ExtendedHotelInfo[] | null>(null);
  const [responseError, setResponseError] = useState(false);


  useEffect(() =>
   {
    // getData('all')
    //   .then(console.log)
    // .then(data => setHotelList(data))
    // .catch(error => setResponseError(true))

    fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/all')
      .then(r => r.json())
      .then(console.log)
      // .then(data => setHotelList(data))
      // .catch(error => setResponseError(true))


    fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          firstName: "igor",
          lastName: "igor",
          email: "12hlhlknlkgj4j@com.com",
          telephone: "312122",
          password: "dfsdbkhihuffdjbk1"
        })
    }).then(r => console.log(r))

  }, [])


  const login = () => {
    fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          email: "johny-j1990@gmail.com",
          password: "joohnyJ29",
        })
    }).then(console.log)
  }


  useEffect(() => {
    // const stringSearchParams = searchParams.toString();
    // if (stringSearchParams) {
    //   getData(`filters?${stringSearchParams}`)
    //   .then(data => setHotelList(data))
    //   .catch(error => setResponseError(true))
    // }



    if ("" !== searchParams.toString()) {
      const url = `http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/filters?${searchParams.toString()}`;
      fetch(url)
        .then(r => r.json())
        // .then(r => console.log(r))
        .then(r => setHotelList(r))
    } else {
      const url = 'http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/all'
      fetch(url)
        .then(r => r.json())
        // .then(r => console.log(r))
        .then(r => setHotelList(r))
    }

  }, [searchParams])




  return (
    <>
      {/* <button onClick={login}>
        LOGIN
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
