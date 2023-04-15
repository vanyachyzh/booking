import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PhotoPage.scss'
import { Header } from '../../components/Header';
import { HotelInfo, User } from '../../types';
import { Navigation } from '../../components/Navigation';
import { GallerySlider } from '../../components/GallerySlider/GallerySlider';
import { AuthContext } from '../../App';
// import { getSearchWith } from '../../utils';
import { Loader } from '../../components/Loader';
import { animated, config, useSpring } from 'react-spring';


type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const PhotoPage: React.FC<Props> = ({ setUser }) => {
  const context = useContext(AuthContext);

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [hotel, setHotel] = useState<HotelInfo | null>(null)
  const [searchParams] = useSearchParams();
  const hotel_id = searchParams.get('hotel_id') || '';



  const navigate = useNavigate();

  const onButtonClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('hotel_id', String(hotel_id));
    const updatedSearchParams = newSearchParams.toString();
    navigate(`/hotel?${updatedSearchParams}`)
  }


  useEffect(() => {
    if (hotel_id) {
      fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/all')
        .then(r => r.json())
        .then(r => {
          const hotel: HotelInfo | null = (r as HotelInfo[]).find((hotel) => hotel.id === +hotel_id) || null
          console.log(hotel)
          if (hotel) {
            setHotel(hotel)
          }
        })
    }
  }, [hotel_id])




  useEffect(() => {
    if (currentImage === 0) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [currentImage])

  const fadeAnim = useSpring({
    opacity: hotel ? 1 : 0,
    config: { duration: 100 },
  });

  const fadeAnimA = useSpring({
    opacity: currentImage ? 1 : 0,
    config: { duration: 100 },
  });

  return (
    <div

      className='photo-page'
    >
      <Header setUser={setUser} />

      {!hotel
        ? <Loader />
        : (
          <animated.div style={fadeAnim}>
            <div className="photo-page__nav">
              <Navigation
                city={hotel?.city}
                address={hotel?.address}
                name={hotel?.name}
              />
            </div>
            <button
              className='photo-page__btn text-xx-black-500'
              onClick={onButtonClick}
            >
              Back
            </button>
            <div className="photo-page__photos">
              <span className='photo-page__desc title-x-black-700'>
                All photos
              </span>

              {hotel?.picturesUrl.map((photo, index) => (
                <img
                  onClick={() => setCurrentImage(index + 1)}
                  className='photo-page__photo'
                  key={photo}
                  src={photo}
                  alt="nature"
                />
              ))}
            </div>
          </animated.div>

        )}


      <animated.div style={fadeAnimA}>
      {currentImage !== 0 && (
        <GallerySlider
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
          images={hotel?.picturesUrl || []}
        />
      )}
      </animated.div>
      {/* {currentImage !== 0 && (
        <GallerySlider
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
          images={hotel?.picturesUrl || []}
        />
      )} */}
    </div>
  )
}

