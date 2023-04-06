import { HotelInfo } from "../types/HotelInfo";

export const getSimilarCities = (hotels: HotelInfo[] | null, query: string): string[] => {
  const lowerQuery = query.toLowerCase();
  const filteredHotel = hotels?.filter((hotel) => {
    const lowerCity = hotel.city.toLocaleLowerCase();
    if (lowerCity.includes(lowerQuery)) {
      return hotel.city;
    }
  });

  const cities = filteredHotel?.map((hotel) => hotel.city);

  return cities ? cities : [];
};
