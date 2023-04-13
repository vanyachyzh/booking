import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './PhotoPage.scss'
import { Header } from '../../components/Header';
import { User } from '../../types';
import { Navigation } from '../../components/Navigation';
import { GallerySlider } from '../../components/GallerySlider/GallerySlider';
import { AuthContext } from '../../App';

let natureLinks = [
  'https://media.gettyimages.com/id/1044029654/photo/lady-gaga-arrives-at-the-premiere-of-warner-bros-pictures-a-star-is-born-at-the-shrine.jpg?s=612x612&w=gi&k=20&c=a8Fwy96QxY25mX1IFlRhKyqYyaLHoJxb7HHU3lI0Q-4=',
  'https://img.huffingtonpost.com/asset/63ec9aa72100005600950bbe.jpeg?cache=NW6hQ1GoIB&ops=1778_1000',
  'https://www.gannett-cdn.com/presto/2018/08/15/USAT/42994e1a-aa6f-4e96-9d3e-c663a8b6826c-GTY_978196460.jpg',
  'https://images.hellomagazine.com/horizon/square/d42ae2344afa-lady-gaga-emotional-photo-t.jpg',
  'https://media.gettyimages.com/id/1044029654/photo/lady-gaga-arrives-at-the-premiere-of-warner-bros-pictures-a-star-is-born-at-the-shrine.jpg?s=612x612&w=gi&k=20&c=a8Fwy96QxY25mX1IFlRhKyqYyaLHoJxb7HHU3lI0Q-4=',
  'https://img.huffingtonpost.com/asset/63ec9aa72100005600950bbe.jpeg?cache=NW6hQ1GoIB&ops=1778_1000',
];

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const PhotoPage: React.FC<Props> = ({ setUser }) => {
  const context = useContext(AuthContext);

  const [currentImage, setCurrentImage] = useState<number>(0);


  useEffect(() => {
    if (currentImage === 0) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [currentImage])


  return (
    <div
      className='photo-page'
    >
      <Header setUser={setUser} />

      <div className="photo-page__nav">
        <Navigation />
      </div>

      <Link
        className='photo-page__btn text-xx-black-500'
        to='/hotel'
      >
        Back
      </Link>

      <div className="photo-page__photos">
        <span className='photo-page__desc title-x-black-700'>
          All photos
        </span>

        {/* {context?.hotel?.picturesUrl.map((photo, index) => ( */}
        {natureLinks.map((photo, index) => (
          <img
            onClick={() => setCurrentImage(index + 1)}
            className='photo-page__photo'
            key={photo}
            src={photo}
            alt="nature"
          />
        ))}
      </div>

      {currentImage !== 0 && (
        <GallerySlider
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
          // images={context?.hotel?.picturesUrl || []}
          images={natureLinks}
        />
      )}
    </div>
  )
}

