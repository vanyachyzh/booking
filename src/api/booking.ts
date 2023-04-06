import { client } from '../utils';

export const USER_ID = 6657;
export const links = ['All', 'Active', 'Completed'];

export const getSomething = (url: string) => {
  return client.get(url);
};

export const postComment = (url: string, todo: {}) => {
  return client.post(url, todo);
};

// export const deleteTodo = (todoId: number) => {
//   return client.delete(`/todos/${todoId}`);
// };

// export const patchTodo = (
//   todoId: number,
//   data: Property,
// ): Promise<Todo> => {
//   return client.patch(`/todos/${todoId}`, data);
// };
