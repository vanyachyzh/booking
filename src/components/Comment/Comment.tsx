import React, { useState } from "react";
import './Comment.scss'
import personIcon from './../../images/iconss/Ellipse 8.png';
import happyIcon from './../../images/iconss/icon (tabler)/mood-happy.svg';
import emptyIcon from './../../images/iconss/icon (tabler)/mood-empty.svg';
import smileIcon from './../../images/iconss/icon (tabler)/mood-smile-beam.svg';
import sadIcon from './../../images/iconss/icon (tabler)/mood-sad.svg';


// type Props = {
//   data: string
// }

const text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, corporis! Officia, facilis distinctio. Tempore sunt officia accusantium laborum nisi distinctio! Rerum ex hic quos nihil accusamus blanditiis architecto illo optio?"

const maxLength = 180;

const rating = 5;

const getIcon = (rating: number) => {
  if (rating <= 2) {return sadIcon}
  if (rating <= 3) {return emptyIcon}
  if (rating <= 4) {return smileIcon}
  if (rating <= 5) {return happyIcon}
}

interface Comment {
  authorName: string,
  id: number,
  rating: number,
  text: string
}

type Props = {
  data: Comment
}

export const Comment: React.FC<Props> = ({ data }) => {
  return (
    <div className="comment">
      <div className="comment__info">
        <img
          className="comment__photo"
          src={personIcon}
          alt="User"
        />

        <span className="comment__name text-xx-black-500">
          {data.authorName}
        </span>

        <img
          className="comment__icon"
          src={getIcon(data.rating)}
          alt="Smile"
        />
      </div>



      <span className="comment__text text-xx-black-400">
        {data.text}
      </span>


      <button className="comment__button">
        Read more
      </button>


    </div>
  )
};

