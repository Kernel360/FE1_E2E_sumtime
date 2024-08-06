import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getAllByUserId, getOneByTodoId } from '@/app/apiTest/calls/todoCalls';
import { SelectTodo } from '@/db/schema/todos';

export const useGetAll = (userId: string): UseQueryResult<SelectTodo[], Error> =>
  useQuery({ queryKey: ['todos', userId], queryFn: () => getAllByUserId(userId), enabled: true });

export const useGetOne = (todoId: string): UseQueryResult<SelectTodo, Error> =>
  useQuery({ queryKey: ['todo', todoId], queryFn: () => getOneByTodoId(todoId), enabled: true });
