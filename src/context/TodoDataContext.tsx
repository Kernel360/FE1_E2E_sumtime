import React, { createContext, useMemo, useState } from 'react';
import { useGetTodosMatchingDate } from '@/api/hooks/todoHooks';
import { useSession } from 'next-auth/react';
import { SelectTodo } from '@/db/schema/todos';

interface ContextType {
  // 세션
  sessionId: number | undefined;
  // 데이터
  displayingDate: Date;
  setDisplayingDate: (date: Date) => void;
  todoId: number;
  setTodoId: (id: number) => void;
  todoListData: SelectTodo[];
}
const initialValue = {
  // 세션
  sessionId: undefined,
  // 데이터
  displayingDate: new Date(),
  setDisplayingDate: () => {},
  todoId: 0,
  setTodoId: () => {},
  todoListData: [],
};

export const TodoDataContext = createContext<ContextType>(initialValue);

export function TodoDataProvider({ children }: React.PropsWithChildren) {
  // 세션
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  // 사용자가 선택한 날짜
  const [displayingDate, setDisplayingDate] = useState<Date>(new Date());
  // 데이터
  const [todoId, setTodoId] = useState<number>(0);
  const { data: todoListData = [] } = sessionId ? useGetTodosMatchingDate(sessionId, displayingDate) : { data: [] };

  const value = useMemo(
    () => ({
      // 세션
      sessionId,
      // 데이터
      displayingDate,
      setDisplayingDate,
      todoId,
      setTodoId,
      todoListData,
    }),
    [sessionId, displayingDate, todoId, todoListData],
  );

  return <TodoDataContext.Provider value={value}>{children}</TodoDataContext.Provider>;
}
