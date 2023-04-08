import React from 'react';
import { Link } from 'react-router-dom';
import './PhotoPage.scss'
import { Header } from '../../components/Header';
import { User } from '../../types';
import { Navigation } from '../../components/Navigation';

let natureLinks = [
  'https://media.gettyimages.com/id/1044029654/photo/lady-gaga-arrives-at-the-premiere-of-warner-bros-pictures-a-star-is-born-at-the-shrine.jpg?s=612x612&w=gi&k=20&c=a8Fwy96QxY25mX1IFlRhKyqYyaLHoJxb7HHU3lI0Q-4=',
  'https://img.huffingtonpost.com/asset/63ec9aa72100005600950bbe.jpeg?cache=NW6hQ1GoIB&ops=1778_1000',
  'https://www.gannett-cdn.com/presto/2018/08/15/USAT/42994e1a-aa6f-4e96-9d3e-c663a8b6826c-GTY_978196460.jpg',
  'https://images.hellomagazine.com/horizon/square/d42ae2344afa-lady-gaga-emotional-photo-t.jpg',
  'https://media.gettyimages.com/id/1044029654/photo/lady-gaga-arrives-at-the-premiere-of-warner-bros-pictures-a-star-is-born-at-the-shrine.jpg?s=612x612&w=gi&k=20&c=a8Fwy96QxY25mX1IFlRhKyqYyaLHoJxb7HHU3lI0Q-4=',
  'https://img.huffingtonpost.com/asset/63ec9aa72100005600950bbe.jpeg?cache=NW6hQ1GoIB&ops=1778_1000',
  'https://www.gannett-cdn.com/presto/2018/08/15/USAT/42994e1a-aa6f-4e96-9d3e-c663a8b6826c-GTY_978196460.jpg',
  'https://images.hellomagazine.com/horizon/square/d42ae2344afa-lady-gaga-emotional-photo-t.jpg',
  'https://images.hellomagazine.com/horizon/square/d42ae2344afa-lady-gaga-emotional-photo-t.jpg',
];

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const PhotoPage: React.FC<Props> = ({ setUser }) => (
  <div className='photo-page'>
    <Header setUser={setUser} />

    <div className="photo-page__nav">
      <Navigation />
    </div>

    <div className="photo-page__photos">
      <span className='photo-page__desc title-x-black-700'>
        All photos
      </span>

      {natureLinks.map(photo => (
        <img
          className='photo-page__photo'
          key={photo}
          src={photo}
          alt="nature"
        />
      ))}

    </div>

    {/* <Link
      className='error-page__btn button'
      to='/'
    >
      Back to main page
    </Link> */}

  </div>
)

