import { client } from '../utils';

export const USER_ID = 6657;
export const links = ['All', 'Active', 'Completed'];

export const getSomething = (url: string) => {
  return client.get(url);
};

export const postComment = (url: string, todo: {}) => {
  return client.post(url, todo);
};

export const NUM_ITEMS_TO_SHOW = 3;
