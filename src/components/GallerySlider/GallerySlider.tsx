import React, { useState } from 'react';
import './GallerySlider.scss'
import { Link } from 'react-router-dom';

interface Props {
  images: string[];
  currentImage: number;
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>
}

export const GallerySlider: React.FC<Props> = ({ images, currentImage, setCurrentImage }) => {
  const handleClick = (index: number) => {
    setCurrentImage(index + 1);
  };

  return (
    <div
      className='gallery-slider__container'
    >

      <button
        onClick={() => setCurrentImage(0)}
        className='gallery-slider__btn--close'
      >
      </button>

      <div className='gallery-slider__section'>
        <img
          className='gallery-slider__main'
          src={images[currentImage - 1]}
          alt="Gallery"
        />

        {currentImage !== 1 && (
          <button
            className='gallery-slider__btn--prev'
            onClick={() => setCurrentImage(prev => prev - 1 === 0 ? 1 : prev - 1)}>
          </button>
        )}

        {currentImage !== images.length && (
          <button
            className='gallery-slider__btn--next'
            onClick={() => setCurrentImage(prev => prev + 1 === images.length + 1 ? images.length : prev + 1)}>
          </button>
        )}

      </div>

      <span className='gallery-slider__amount text-xx-white-400'>
        {`${currentImage} / ${images.length}`}
      </span>

      <div className='gallery-slider__photos'>
        {images.map((image, index) => (
          <img
            className='gallery-slider__photo'
            key={index}
            src={image}
            alt={`Gallery ${index}`}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};




