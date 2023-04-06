import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSomething, postComment } from '../../api/booking';
import './HomePage.scss'
import { SideBar } from '../../components/SideBar';
import { Header } from '../../components/Header';
import { HotelCard } from '../../components/HotelCard';
import { HotelList } from '../../components/HotelList';
import { ExtendedHotelInfo } from '../../types/HotelInfo';

export const HomePage: React.FC = () => {

  const [hotels, setHotels] = useState<ExtendedHotelInfo[] | null>(null);


  useEffect(() => {
    fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/all')
      .then(r => r.json())
      // .then(r => console.log(r))
      .then(r => setHotels(r))
  }, [])


  const hotelTemp = {
    id: 1,
    picturesUrl: [
      "https://www.ahstatic.com/photos/1276_ho_00_p_1024x768.jpg",
      "https://www.murhotels.com/cache/40/b3/40b3566310d686be665d9775f59ca9cd.jpg",
      "https://media.radissonhotels.net/image/metropolitan-hotel-sofia-a-member-of-radisson-individuals/exteriorview/16256-145921-f72742573_3xl.jpg?impolicy=Card&gravity=North"
    ],
    address: "1919 Madison Ave",
    city: "New York",
    telephone: "(123)456-7890",
    name: "The Peninsula",
    description: "Luxury hotel in the heart of the city",
    rating: 4.9,
    stars: 5,
    rooms: [
      {
        "id": 121,
        "number": 1,
        "price": 100.00,
        "capacity": 3,
        "picturesUrl": [
          "https://www.althoffcollection.com/fileadmin/_processed_/8/3/csm_althoff-collection-hotel-am-schlossgarten-aussenansicht-rendering-umbau-tag-web_67cee1fd7f.jpg"
        ],
        "amenities": [
          "POOL",
          "RESTAURANT"
        ],
        "hotelName": "The Waldorf Astoria"
      },
      {
        "id": 122,
        "number": 2,
        "price": 500.00,
        "capacity": 1,
        "picturesUrl": [
          "https://www.murhotels.com/cache/40/b3/40b3566310d686be665d9775f59ca9cd.jpg"
        ],
        "amenities": [
          "SPA",
          "POOL"
        ],
        "hotelName": "The Waldorf Astoria"
      }
    ]
  }


  return (
    <>
      <div className='homepage'>
        <Header
          cards={hotels}
          setCards={setHotels}
        />

        <div className="containerr">

          <SideBar />

          <div className='homepage__cards'>
            {/* <HotelList
              hotels={[hotelTemp, hotelTemp, hotelTemp, hotelTemp, hotelTemp, hotelTemp, hotelTemp, hotelTemp, hotelTemp, hotelTemp, hotelTemp]}
            /> */}

            <HotelList
              hotels={hotels}
            /> 

            {/* <HotelCard hotel={hotelTemp}/>

            <HotelCard hotel={hotelTemp}/>

            <HotelCard hotel={hotelTemp}/>

            <HotelCard hotel={hotelTemp}/>

            <HotelCard hotel={hotelTemp}/> */}

          </div>



        </div>


      </div>

    </>
  )
};



{/* <div>
<h1>HOMEPAGE</h1>
</div>

<div>
<Link to="/hotel">go to hotel</Link>
</div>

<div>
<Link to="/auth">AUTH</Link>
</div>

<button onClick={onPressButton}>SEND POST REQEUST</button>

<a href='https://google.com/maps/search/Odesa, Kanatna 128' target="_blank">
Odesa
</a> */}



// const onPressButton = () => {
//   fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/1/reviews', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json, text/plain, */*',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(
//       {
//         authorName: "John Doe",
//         date: new Date('1995-12-17T03:24:00'),
//         rating: 4,
//         text: "Nice hotel, would stay again"
//       })
//   })
//     .then(res => console.log(res));
// }
