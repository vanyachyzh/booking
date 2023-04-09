import { RoomInfo } from "./RoomInfo";

export interface HotelInfo {
  name: string,
  address: string,
  city: string,
  description: string,
  id: number,
  picturesUrl: string[],
  rating: number,
  stars: number,
  telephone: string,
  amenities: string[],
  allReviews: number,
  price: string 
};

export interface ExtendedHotelInfo extends HotelInfo {
  rooms: RoomInfo[],
};



