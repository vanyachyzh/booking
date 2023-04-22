import React from 'react';
import './Amenity.scss';
import classNames from 'classnames';

import wifiImage from './../../images/iconss/icon (tabler)/wifi.svg';
import poolImage from './../../images/iconss/icon (tabler)/swimming.svg';
import restaurantImage from './../../images/iconss/icon (tabler)/glass-full.svg';
import gymImage from './../../images/iconss/icon (tabler)/barbell.svg';
import parkingImage from './../../images/iconss/icon (tabler)/parking.svg';
import spaImage from './../../images/iconss/icon (tabler)/sparkles.svg';
import bathImage from './../../images/iconss/icon (tabler)/bath.svg';
import coffeeImage from './../../images/iconss/icon (tabler)/coffee.svg';
import deskImage from './../../images/iconss/icon (tabler)/empty.svg';
import fireImage from './../../images/iconss/icon (tabler)/fire1.svg';
import hairImage from './../../images/iconss/icon (tabler)/mood-boy.svg';
import safeImage from './../../images/iconss/icon (tabler)/lock.svg';
import ironImage from './../../images/iconss/icon (tabler)/fire1.svg';
import kitchenImage from './../../images/iconss/icon (tabler)/tools-kitchen-2.svg';
import cookerImage from './../../images/iconss/icon (tabler)/cooker.svg';
import serviceImage from './../../images/iconss/icon (tabler)/mood-happy.svg';
import tvImage from './../../images/iconss/icon (tabler)/device-tv.svg';
import sofaImage from './../../images/iconss/icon (tabler)/sofa.svg';
import gardenImage from './../../images/iconss/icon (tabler)/droplet-half-filled.svg';
import toiletImage from './../../images/iconss/icon (tabler)/info-circle.svg';
import washImage from './../../images/iconss/icon (tabler)/wash-machine.svg';
import balconyImage from './../../images/iconss/Balcony.svg';


type Props = {
  type: string,
  color?: string
}

export const Amenity: React.FC<Props> = ({ type, color }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'SPA':
        return spaImage;
      case 'PARKING':
        return parkingImage;
      case 'WIFI':
        return wifiImage;
      case 'RESTAURANT':
        return restaurantImage;
      case 'POOL':
        return poolImage;
      case 'GYM':
        return gymImage;
      case "AIR CONDITIONING":
        return tvImage;
      case "BALCONY":
        return safeImage;
      case "BATHROBES":
        return bathImage;
      case "COFFEE MAKER":
        return coffeeImage;
      case "DESK":
        return deskImage;
      case "FIREPLACE":
        return fireImage;
      case "HAIR DRYER":
        return hairImage;
      case "IN-ROOM SAFE":
        return safeImage;
      case "IRON AND IRONING BOARD":
        return ironImage;
      case "KITCHENETTE":
        return kitchenImage;
      case "MICROWAVE":
        return cookerImage;
      case "MINIBAR":
        return kitchenImage;
      case "PRIVATE BATHROOM":
        return bathImage;
      case "ROOM SERVICE":
        return serviceImage;
      case "SATELLITE TV":
        return tvImage;
      case "SHOWER":
        return bathImage;
      case "SITTING AREA":
        return sofaImage;
      case "SOUNDPROOFING":
        return sofaImage;
      case "TELEPHONE":
        return tvImage;
      case "TELEVISION":
        return tvImage;
      case "TERRACE":
        return washImage;
      case "TOILETRIES":
        return toiletImage;
      case "TOWELS":
        return tvImage;
      case "WAKE-UP SERVICE":
        return serviceImage;
      case "WASHING MACHINE":
        return washImage;
      case "WHIRLPOOL TUB":
        return poolImage;
      case "WINDOW COVERINGS":
        return deskImage;
      case "WORK DESK":
        return deskImage;
      case "YOGA CLASSES":
        return gardenImage;
      case "ZEN GARDEN":
        return gardenImage;
      default:
        return;
    }
  }

  return (
    <div
      className={classNames(
        'amenity',
        { 'amenity--green': color }
      )}
    >
      <img
        className='amenity__image text-x-black-500'
        src={getIcon(type)}
        alt="Image"
      />
      {type[0] + type.slice(1).toLowerCase()}
    </div>
  )
};
