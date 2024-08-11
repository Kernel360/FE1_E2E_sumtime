import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  createTodo,
  deleteTodo,
  getAllTodosByUserId,
  getOneTodoByTodoId,
  updateTodo,
  updateTodoTime,
} from '@/app/apiTest/calls/todoCalls';
import { SelectTodo, TodoForTimetable } from '@/db/schema/todos';
// TodoForTimetable
export const useCreateTodo = (): UseMutationResult<
  SelectTodo,
  Error,
  { userId: string; title: string; content: string; startTime: string | null; endTime: string; color: string }
> =>
  useMutation({
    mutationFn: ({ userId, title, content, startTime, endTime, color }) =>
      createTodo(userId.toString(), title, content, startTime, endTime, color),
  });

export const useGetAllTodos = (userId: string): UseQueryResult<SelectTodo[], Error> =>
  useQuery({ queryKey: ['todos', userId], queryFn: () => getAllTodosByUserId(userId), enabled: !!userId });

export const useGetAllTodosForTimetable = (userId: string): UseQueryResult<TodoForTimetable[], Error> =>
  useQuery({
    queryKey: ['todos', userId],
    queryFn: () => getAllTodosByUserId(userId),
    enabled: !!userId,
    select: (data) =>
      data.map((todo) => ({
        ...todo,
        startTime: todo.startTime ? new Date(todo.startTime) : null,
        endTime: todo.endTime ? new Date(todo.endTime) : null,
        id: todo.todoId,
        taskColor: todo.color,
      })),
  });

export const useGetOneTodo = (todoId: string): UseQueryResult<SelectTodo, Error> =>
  useQuery({ queryKey: ['todo', todoId], queryFn: () => getOneTodoByTodoId(todoId), enabled: !!todoId });

export const useUpdateTodo = (): UseMutationResult<
  SelectTodo,
  Error,
  { todoId: string; title: string; content: string; startTime: string | null; endTime: string; color: string }
> =>
  useMutation({
    mutationFn: ({ todoId, title, content, startTime, endTime, color }) =>
      updateTodo(todoId, title, content, startTime, endTime, color),
  });

export const useUpdateTodoTime = (): UseMutationResult<
  SelectTodo,
  Error,
  { todoId: string; startTime: string | null; endTime: string | null }
> =>
  useMutation({
    mutationFn: ({ todoId, startTime, endTime }) => updateTodoTime(todoId, startTime, endTime),
  });

export const useDeleteTodo = (): UseMutationResult<string, Error, string> =>
  useMutation({
    mutationFn: (todoId: string) => deleteTodo(todoId),
  });
