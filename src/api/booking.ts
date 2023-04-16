import { BookingDate, ExtendedHotelInfo, HotelInfo } from "../types";
import { client } from "../utils";

const BASE_URL = 'https://innjoy.space/';


export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"
);
export const nameRegex = new RegExp("^[a-zA-Z]{4,}$");
export const dateRegex = new RegExp("^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|30)$");
export const phoneRegex = /^\d{9}$/;
export const cvcRegex = /^\d{3}$/;
export const cardRegex = /^\d{14}$/;

export const fees = 3;

export const MIN_AMOUNT_PEOPLE = 1;
export const MAX_AMOUNT_PEOPLE = 20;

export const SORT_TYPES = [
  { key: 'price', order: 'asc', name: 'Price (lowest first)' },
  { key: 'price', order: 'desc', name: 'Price (highest first)' },
  { key: 'rating', order: 'asc', name: 'Guest rating (lowest first)' },
  { key: 'rating', order: 'desc', name: 'Guest rating (highest first)' },
  { key: 'recommended', order: 'asc', name: 'Recommended (lowest first)' },
  { key: 'recommended', order: 'desc', name: 'Recommended (highest first)' },
  { key: 'stars', order: 'asc', name: 'Property class (lowest first)' },
  { key: 'stars', order: 'desc', name: 'Property class (highest first)' },
];

export function capitalizeWords(str: string): string {
  const words = str.split(' ');
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return capitalizedWords.join(' ');
}

// export function reverseTransformString(str: string) {
//   str = str.replace(/%20/g, ' ');
//   const words = str.split(' ');
//   const transformedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
//   const transformedString = transformedWords.join(' ');

//   return transformedString;
// }


export const COUNTRY_CODES = ["+1", "+44", "+49", "+33", "+39", "+34", "+81", "+86", "+61", "+55", "+91", "+62", "+52", "+82", "+20", "+90", "+92", "+234"]

export function reverseTransformString(str: string) {
  str = str.replace(/%20/g, ' ');
  const words = str.split(' ');
  const transformedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  const transformedString = transformedWords.join(' ');

  return transformedString;
}

export const NUM_ITEMS_TO_SHOW = 3;
const baseHotelUrl =
  "http://travelers-env.eba-udpbcph.eu-north-1.elasticbeanstalk.com/hotels/";
const authUrl =
  "https://innjoy.space/";

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

export const logIn = async (email: string, password: string) => {
  const response = await fetch(`${authUrl}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `username=${email}&password=${password}`,
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

// export function reverseTransformString(str: string) {
//   str = str.replace(/%20/g, " ");
//   const words = str.split(" ");
//   const transformedWords = words.map(
//     (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//   );
//   const transformedString = transformedWords.join(" ");
//   return transformedString;
// }

export const getExtendedHotelInfo = async (hotel: HotelInfo) => {
  const response = await fetch(
    `http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/apartments/by_hotel_id?hotelId=${hotel.id}`
  );
  const rooms = await response.json();

  return {
    ...hotel,
    rooms,
  };
};

export const toNumber = (value: number) => {
  return Number(`${String(value)[0]}.${String(value)[2]}`);
};

export const getColor = (number: number) => {
  if (number >= 5) {
    return "#2F9E44";
  }
  if (number >= 4) {
    return "#82C91E";
  }
  if (number >= 3) {
    return "#FCC419";
  }
  if (number >= 2) {
    return "#FF922B";
  }
  if (number >= 1) {
    return "#D9480F";
  }
  if (number >= 0) {
    return "#B12B2B";
  }
};

export const getRating = (number: number) => {
  if (number >= 5) {
    return "Excellent";
  }
  if (number >= 4) {
    return "Very good";
  }
  if (number >= 3) {
    return "Good";
  }
  if (number >= 2) {
    return "Okay";
  }
  if (number >= 1) {
    return "Poor";
  }
  if (number >= 0) {
    return "Terrible";
  }
};

export const getRatingWord = (rating: number) => {
  if (rating > 9 && rating < 10) {
    return "Excellent";
  }
  if (rating > 9 && rating < 10) {
    return "Excellent";
  }
  if (rating > 8 && rating < 9) {
    return "Wonderful";
  }
  if (rating > 7 && rating < 8) {
    return "Very good";
  }
  if (rating > 6 && rating < 7) {
    return "Good";
  }
  if (rating > 4 && rating < 6) {
    return "Okay";
  }
  if (rating > 3 && rating < 4) {
    return "Poor";
  }
  if (rating > 1 && rating < 2) {
    return "Bad";
  }
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = weekdays[date.getDay()];
  const dayOfMonth = date.getDate();

  const monthNumber = date.getMonth();
  const monthName = months[monthNumber];

  const year = date.getFullYear();

  return `${dayOfWeek}, ${dayOfMonth}${
    dayOfMonth % 10 === 1 && dayOfMonth !== 11
      ? "st"
      : dayOfMonth % 10 === 2 && dayOfMonth !== 12
      ? "nd"
      : dayOfMonth % 10 === 3 && dayOfMonth !== 13
      ? "rd"
      : "th"
  } ${monthName} ${year}`;
}

export function getDaysBetweenDates(
  startDate: string,
  endDate: string
): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const differenceInMilliseconds = Math.abs(end.getTime() - start.getTime());
  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 3600 * 24)
  );

  return differenceInDays;
}

interface IBookingCost {
  pricePerNight: number;
  numberOfNights: number;
  taxPercentage: number;
}

interface IBookingTotal {
  subtotal: number;
  taxAmount: number;
  total: number;
}

export function calculateBookingCosts({
  pricePerNight,
  numberOfNights,
  taxPercentage,
}: IBookingCost): IBookingTotal {
  const subtotal = pricePerNight * numberOfNights;
  const taxAmount = subtotal * (taxPercentage / 100);
  const total = subtotal + taxAmount;

  return { subtotal, taxAmount, total };
}
