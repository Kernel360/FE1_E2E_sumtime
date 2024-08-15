import React, { createContext, useMemo, useState } from 'react';
import { useGetTodosMatchingDate } from '@/api/hooks/todoHooks';
import { useSession } from 'next-auth/react';
import { SelectTodo } from '@/db/schema/todos';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { TodoModalMode } from '@/types/todo';

interface TodoContextType {
  // 세션
  sessionId: number | undefined;
  // 데이터
  displayingDate: Date;
  setDisplayingDate: (date: Date) => void;
  todoId: number;
  setTodoId: (id: number) => void;
  todoListData: SelectTodo[];
  // 달력
  isCalendarOpen: boolean;
  toggleIsCalendarOpen: () => void;
  // 모달
  isModalOpen: boolean;
  setIsModalOpenTrue: () => void;
  setIsModalOpenFalse: () => void;
  isModalOpenedByFAB: boolean;
  setIsModalOpenedByFABTrue: () => void;
  setIsModalOpenedByFABFalse: () => void;
  mode: string;
  setTodoModalMode: (mode: TodoModalMode) => void;
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
  // 달력
  isCalendarOpen: false,
  toggleIsCalendarOpen: () => {},
  // 모달
  isModalOpen: false,
  setIsModalOpenTrue: () => {},
  setIsModalOpenFalse: () => {},
  isModalOpenedByFAB: false,
  setIsModalOpenedByFABTrue: () => {},
  setIsModalOpenedByFABFalse: () => {},
  mode: '',
  setTodoModalMode: () => {},
};

export const TodoContext = createContext<TodoContextType>(initialValue);

export function TodoProvider({ children }: React.PropsWithChildren) {
  // 세션
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  // 사용자가 선택한 날짜
  const [displayingDate, setDisplayingDate] = useState<Date>(new Date());
  // 데이터
  const [todoId, setTodoId] = useState<number>(0);
  const { data: todoListData = [] } = sessionId ? useGetTodosMatchingDate(sessionId, displayingDate) : { data: [] };
  // 달력
  const { value: isCalendarOpen, toggle: toggleIsCalendarOpen } = useBooleanState();
  // 모달
  const [mode, setTodoModalMode] = useState<TodoModalMode>(''); // modal이 열리는 경우 mode로 관리
  const { value: isModalOpen, setTrue: setIsModalOpenTrue, setFalse: setIsModalOpenFalse } = useBooleanState();
  const {
    value: isModalOpenedByFAB,
    setTrue: setIsModalOpenedByFABTrue,
    setFalse: setIsModalOpenedByFABFalse,
  } = useBooleanState();

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
      // 달력
      isCalendarOpen,
      toggleIsCalendarOpen,
      // 모달
      mode,
      setTodoModalMode,
      isModalOpen,
      setIsModalOpenTrue,
      setIsModalOpenFalse,
      isModalOpenedByFAB,
      setIsModalOpenedByFABTrue,
      setIsModalOpenedByFABFalse,
    }),
    [sessionId, displayingDate, todoId, todoListData, isCalendarOpen, isModalOpen, isModalOpenedByFAB, mode],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
