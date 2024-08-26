import React, { useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import TodoComponent from '@/components/todo/TodoComponent';
import { useDispatch } from 'react-redux';
import { selectTodoData, setLoading, setTodoId, setTodoListData } from '@/lib/todos/todoDataSlice';
import { openModal, closeModalByFAB, setModalMode } from '@/lib/todos/todoUISlice';
import { useGetTodosMatchingDate } from '@/api/hooks/todoHooks';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/lib/hooks';
import * as TodoStyle from './TodoList.styled';
import * as CommonStyle from '../../common';
import EmptyTodoList from './EmptyTodoList';
import OpenCreateTodoModalButton from './OpenCreateTodoModalButton';

const S = { ...TodoStyle, ...CommonStyle };

function TodoList() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  const { displayingDate } = useAppSelector(selectTodoData);
  const { data: todoListData = [], isLoading } = useGetTodosMatchingDate(sessionId, displayingDate);

  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (!isLoading && todoListData) {
      dispatch(setTodoListData(todoListData));
    }
  }, [todoListData, dispatch, isLoading]);

  const handleOpenModalByTodo = (id: number) => {
    dispatch(setTodoId(id));
    dispatch(closeModalByFAB());
    dispatch(openModal());
    dispatch(setModalMode('update'));
  };

  if (isLoading) {
    return (
      <Box position="relative" width="100%" height="50%">
        <S.TodoComponentsSection>
          <Skeleton width="100%" height="100%" sx={{ transform: 'scale(1, 1)', transformOrigin: '0 0%' }} />
        </S.TodoComponentsSection>
      </Box>
    );
  }

  if (todoListData.length === 0) {
    return <EmptyTodoList />;
  }

  return (
    <Box position="relative" width="100%" height="50%">
      <S.TodoComponentsSection>
        <Box>
          {todoListData.map((todo) => (
            <TodoComponent key={todo.id} todoId={todo.id} title={todo.title} setTodoId={handleOpenModalByTodo} />
          ))}
        </Box>
      </S.TodoComponentsSection>
      <OpenCreateTodoModalButton />
    </Box>
  );
}

export default TodoList;
