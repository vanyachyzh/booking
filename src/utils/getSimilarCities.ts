import { ExtendedHotelInfo, HotelInfo } from "../types/HotelInfo";

// export function getSimilarCities(cities: ExtendedHotelInfo[] | null, query: string): string[] {
//   const filteredCities = cities?.filter((city) =>
//     city.city.toLowerCase().includes(query.toLowerCase())
//   );

//   const names = filteredCities?.map(city => city.city)

//   return names?.slice(0, 4) || [];
// }

export function getSimilarCities(
  cities: ExtendedHotelInfo[] | null,
  query: string
): string[] {
  const filteredCities = cities?.filter(
    (city) => city.city.toLowerCase().includes(query.toLowerCase())
    // city.country.toLowerCase().includes(query.toLowerCase()) ||
    // city.region?.toLowerCase().includes(query.toLowerCase()) ||
    // city.neighborhood?.toLowerCase().includes(query.toLowerCase())
  );

  const names = filteredCities?.map((city) => city.city);

  return names || [];
}

// function searchCityByQuery(hotels: ExtendedHotelInfo[], query: string): string[] {
//   const matchingCities = hotels.filter(hotel => hotel.city.toLowerCase().includes(query.toLowerCase()))
//                                .map(hotel => hotel.city);
//   return matchingCities;
// }

export function searchCityByQuery(
  hotels: HotelInfo[] | null,
  query: string
): string[] {
  if (!hotels) {
    return [];
  }

  const matchingCities = hotels
    .filter((hotel) => hotel.city.toLowerCase().includes(query.toLowerCase()))
    .map((hotel) => hotel.city)
    .filter((city, index, cities) => cities.indexOf(city) === index)
    .slice(0, 4);
  return matchingCities;
}

// function removeDuplicates(arr: string[] | undefined): string[] {
//   return Array.from(new Set(arr));
// }

// export const getSimilarCities = (hotels: HotelInfo[] | null, query: string): string[] => {
//   const lowerQuery = query.toLowerCase();
//   const filteredHotel = hotels?.filter((hotel) => {
//     const lowerCity = hotel.city.toLocaleLowerCase();
//     if (lowerCity.includes(lowerQuery)) {
//       return hotel.city;
//     }
//   });

//   const cities = filteredHotel?.map((hotel) => hotel.city);

//   return removeDuplicates(cities).slice(0, 4);
// };
