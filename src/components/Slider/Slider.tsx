import React, { useEffect, useState } from 'react';
import './Slider.scss';

type Props = {
  items: React.ReactNode[],
  width: number,
  step: number,
}

export const Slider: React.FC<Props> = ({ items, width, step }) => {

  const [segment, setSegment] = useState({
    start: 0,
    end: step
  })
  const itemsAmount = items.length;
  const isShort = itemsAmount <= step;

  const onNextClick = () => {
    if (segment.end + step >= itemsAmount - 1) {
      setSegment({
        start: itemsAmount - 1 - step,
        end: itemsAmount - 1
      });

      return;
    }

    setSegment(prev => ({
      start: prev.start + step,
      end: prev.end + step
    }))
  }

  const onPrevClick = () => {
    if (segment.start - step <= 0) {
      setSegment({
        start: 0,
        end: step,
      });

      return;
    }

    setSegment(prev => ({
      start: prev.start - step,
      end: prev.end - step
    }))
  }

  return (
    <div
      style={{ width: `${width}px` }}
      className='slider'
    >
      {segment.start !== 0 && !isShort && (
        <button
          className="slider__prev-button"
          onClick={onPrevClick}
        >
          {/* PREV */}
        </button>
      )}

      <div className="slider__items-container">
        {items.slice(segment.start, segment.end).map((item, index) => (
          <div key={index} className='slider__item'>
            {item}
          </div>
        ))}
      </div>

      {segment.end !== items.length - 1 && !isShort && (
        <button
          className='slider__next-button'
          onClick={onNextClick}
        >
          {/* NEXT */}
        </button>
      )}
    </div>
  )
};
