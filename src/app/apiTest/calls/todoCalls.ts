import axios from 'axios';

export const createTodo = async (
  userId: string,
  title: string,
  content: string,
  startTime: string,
  endTime: string,
  color: string,
) => {
  const response = await axios.post('/api/todo/create', { userId, title, content, startTime, endTime, color });
  return response.data.todo;
};

export const getAllByUserId = async (userId: string) => {
  const response = await axios.post('/api/todo/getAllByUserId', { userId });
  return response.data.todos;
};

export const getOneByTodoId = async (todoId: string) => {
  const response = await axios.post('/api/todo/getOneByTodoId', { todoId });
  return response.data.todo;
};

export const update = async (
  todoId: string,
  title: string,
  content: string,
  startTime: string,
  endTime: string,
  color: string,
) => {
  const response = await axios.put('/api/todo/update', { todoId, title, content, startTime, endTime, color });
  return response.data.todo;
};
export const remove = async (todoId: string) => {
  const response = await axios.delete('/api/todo/delete/', { data: { todoId } });
  return response.data.message;
};
