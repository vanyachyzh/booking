import { BookingDate, ExtendedHotelInfo, HotelInfo } from "../types";
import { client } from "../utils";

export const NUM_ITEMS_TO_SHOW = 3;
const baseHotelUrl =
  "http://travelers-env.eba-udpbcph.eu-north-1.elasticbeanstalk.com/hotels/";
const authUrl =
  "http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/";

export const getSomething = (url: string) => {
  return client.get(url);
};

export const postComment = (url: string, todo: {}) => {
  return client.post(url, todo);
};

export const getData = async (searchParameters: string) => {
  const response = await fetch(baseHotelUrl + searchParameters);
  const data = await response.json();

  return data;
};

// fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/login', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   body: "username=Kwfwhle1@gmail.com&password=Kwfwhle1gmailcom"
// }).then(console.log)

export const logIn = async (email: string, password: string) => {
  const response = await fetch(`${authUrl}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${email}&password=${password}`
  });

  return response;
};

export const startMonthSetter = new Date();
export const endMonthSetter = new Date(
  startMonthSetter.getTime() + 30 * 24 * 60 * 60 * 1000
);

// type StateHandler = (value: React.SetStateAction<Date>) => void

export const increaseMonthSetter = (
  monthSetter: BookingDate,
  setMonthSetter: React.Dispatch<React.SetStateAction<BookingDate>>
) => {
  setMonthSetter((prev) => ({
    start: prev.start
      ? new Date(prev.start.getTime() + 30 * 24 * 60 * 60 * 1000)
      : null,
    end: prev.end
      ? new Date(prev.end.getTime() + 30 * 24 * 60 * 60 * 1000)
      : null,
  }));
};

export const decreaseMonthSetter = (
  monthSetter: BookingDate,
  setMonthSetter: React.Dispatch<React.SetStateAction<BookingDate>>
) => {
  setMonthSetter((prev) => ({
    start: prev.start
      ? new Date(prev.start.getTime() - 30 * 24 * 60 * 60 * 1000)
      : null,
    end: prev.end
      ? new Date(prev.end.getTime() - 30 * 24 * 60 * 60 * 1000)
      : null,
  }));
};

export const dateToString = (date: Date | null) => {
  return date
    ? `${date.getDate()} ${date.toLocaleString("default", { month: "long" })}`
    : "";
};

export function reverseTransformString(str: string) {
  str = str.replace(/%20/g, " ");
  const words = str.split(" ");
  const transformedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  const transformedString = transformedWords.join(" ");
  return transformedString;
}

export const getExtendedHotelInfo = async (hotel: HotelInfo) => {
  const response = await fetch(
    `http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/apartments/by_hotel_id?hotelId=${hotel.id}`
  );
  const rooms = await response.json();

  return {
    ...hotel,
    rooms
  }
};

export const toNumber = (value: number) => {
  return Number(`${String(value)[0]}.${String(value)[2]}`)
}

export const getRating = (number: number) => {
  if (number >= 5) { return 'Excellent' }
  if (number >= 4) { return 'Very good' }
  if (number >= 3) { return 'Good' }
  if (number >= 2) { return 'Okay' }
  if (number >= 1) { return 'Poor' }
  if (number >= 0) { return 'Terrible' }
}

export const getRatingWord = (rating: number) => {
  if (rating > 9 && rating < 10) {return 'Excellent'}
  if (rating > 9 && rating < 10) { return 'Excellent' }
  if (rating > 8 && rating < 9) { return 'Wonderful' }
  if (rating > 7 && rating < 8) { return 'Very good' }
  if (rating > 6 && rating < 7) { return 'Good' }
  if (rating > 4 && rating < 6) { return 'Okay' }
  if (rating > 3 && rating < 4) { return 'Poor' }
  if (rating > 1 && rating < 2) { return 'Bad' }
}

// function getFirstAndSecondDigit(num: number): number {
//   const numStr = num.toString();
//   const firstDigit = parseInt(numStr[0], 10);
//   const secondDigit = parseInt(numStr[1], 10);
//   const decimal = parseFloat(`${firstDigit}.${secondDigit}`);

//   // Перевіряємо, чи має число правильний вигляд
//   if (decimal.toFixed(2) === numStr.slice(0, 3)) {
//     return parseFloat(numStr.slice(0, 3));
//   }

//   return decimal;
// }
// export function convertNumber(num: number): number {
//   const firstAndSecondDigit = getFirstAndSecondDigit(num);
//   const result = parseFloat(firstAndSecondDigit.toFixed(1));
//   return result;
// }
