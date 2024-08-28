import { SelectTodo } from '@/db/schema/todos';
import { useAppSelector } from '@/lib/hooks';
import { selectTodoData } from '@/lib/todos/todoDataSlice';
import { toZonedTime } from 'date-fns-tz';

const { timeZone } = useAppSelector(selectTodoData);

export function convertTodosForTimetable(todoList: SelectTodo[]) {
  if (!todoList || todoList.length === 0) return [];

  return todoList.map((todo) => ({
    ...todo,
    startTime: todo.startTime ? toZonedTime(new Date(todo.startTime), timeZone) : null,
    endTime: todo.endTime ? toZonedTime(new Date(todo.endTime), timeZone) : null,
    id: todo.id,
    taskColor: todo.color,
  }));
}
