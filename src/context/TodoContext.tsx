import React, { createContext, useMemo, useState } from 'react';
import { useGetTodosMatchingDate } from '@/api/hooks/todoHooks';
import { useSession } from 'next-auth/react';
import { SelectTodo } from '@/db/schema/todos';

interface TodoContextType {
  sessionId: number | undefined;
  displayingDate: Date;
  setDisplayingDate: (date: Date) => void;
  todoListData: SelectTodo[];
}
const initialValue = {
  sessionId: undefined,
  displayingDate: new Date(),
  setDisplayingDate: () => {},
  todoListData: [],
};

export const TodoContext = createContext<TodoContextType>(initialValue);

export function TodoProvider({ children }: React.PropsWithChildren) {
  const [displayingDate, setDisplayingDate] = useState<Date>(new Date());
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  const { data: todoListData = [] } = sessionId ? useGetTodosMatchingDate(sessionId, displayingDate) : { data: [] };

  const value = useMemo(
    () => ({
      sessionId,
      displayingDate,
      setDisplayingDate,
      todoListData,
    }),
    [sessionId, displayingDate, todoListData],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
