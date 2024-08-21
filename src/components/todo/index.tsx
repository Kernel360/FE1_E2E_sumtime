'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { setDisplayingDate, setLoading, setTodoListData } from '@/lib/todos/todoDataSlice';
import TodoHeader from '@/components/todo/TodoHeader';
import TodoPagination from '@/components/todo/TodoPagination';
import TodoCalendar from '@/components/todo/TodoCalendar';
import TodoReport from '@/components/todo/TodoReport';
import TodoList from '@/components/todo/TodoList';
import * as S from '@/components/todo/Todo.styled';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useGetTodosMatchingDate } from '@/api/hooks/todoHooks';
import { useMemo } from 'react';

export default function Todo() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  // pagination, calendar에서 선택한 날짜를 가져옴
  const params = useParams();
  const { year, month, day } = params;

  // 선택한 날짜를 메모이제이션하여 렌더링마다 새로운 객체가 생성되지 않도록 함
  const displayingDate = useMemo(() => {
    return year && month && day ? new Date(Number(year), Number(month) - 1, Number(day)) : new Date();
    // return year && month && day ? new Date(Number(year), Number(month) - 1, Number(day)) : null;
  }, [year, month, day]);

  // displayingDate가 변경될 때마다 redux store에 저장
  useEffect(() => {
    dispatch(setDisplayingDate(displayingDate));
  }, [displayingDate, dispatch]);

  // sessionId가 존재할 때만 데이터를 가져옴
  const { data: todoListData = [], isLoading } = useGetTodosMatchingDate(sessionId, displayingDate);
  console.log('todoListData', todoListData);
  console.log('isLoading', isLoading);
  // todoListData가 변경될 때마다 todoListData를 업데이트
  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (!isLoading && todoListData) {
      dispatch(setTodoListData(todoListData));
      console.log('todoListData', todoListData);
    }
  }, [todoListData, dispatch, isLoading]);

  return (
    <S.TodoSection>
      <TodoHeader />
      <TodoCalendar />
      <TodoPagination />
      <TodoList />
      <TodoReport />
    </S.TodoSection>
  );
}
