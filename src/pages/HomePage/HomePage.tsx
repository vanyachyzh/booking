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


    fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/all')
      .then(r => r.json())
      .then(r => setHotelList(r))

  }, [])


  const login = () => {
    const data = new URLSearchParams({
      email: "johny-j1990@gmail.com",
      password: "joohnyJ29",
    });
    fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "username=Kwfwhle1@gmail.com&password=Kwfwhle1gmailcom"
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


      const url1 = `http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/filters?city=New%25York&dateFrom=2023-04-12&dateTo=2023-05-23&capacity=1`;
      console.log(url, url1)

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
