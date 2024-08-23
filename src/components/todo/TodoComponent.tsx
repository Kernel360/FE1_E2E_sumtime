import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateTodoTime } from '@/api/hooks/todoHooks';
import Box from '@mui/material/Box';
import { useAppSelector } from '@/lib/hooks';
import { selectTodoData } from '@/lib/todos/todoDataSlice';
import * as S from './Todo.styled';
import { Text } from '../common';
import TodoRecordButton from '@/components/todo/TodoRecordButton';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import GlowingBorder from '@/components/todo/GlowingBorder';

interface TodoComponentProps {
  todoId: number;
  title: string;
  setTodoId: (todoId: number) => void;
  startTime: string | null;
  endTime: string | null;
  isProgress?: boolean;
}

function TodoComponent({ todoId, title, setTodoId, startTime, endTime, isProgress }: TodoComponentProps) {
  const queryClient = useQueryClient();
  const { mutate: updateTodoTime } = useUpdateTodoTime();
  const { sessionId } = useAppSelector(selectTodoData);

  const handleOpenModal = () => {
    // TodoList를 클릭한 경우
    setTodoId(todoId); // props로 받아온 handleOpenModalByTodo함수가 setTodoId함수로 동작하게 만듦
  };

  const toggleRecord = async (id: number) => {
    const newStartTime = !isProgress ? new Date().toISOString() : null;
    const newEndTime = isProgress ? new Date().toISOString() : null;

    updateTodoTime(
      {
        todoId: id,
        startTime: newStartTime,
        endTime: newEndTime,
        isProgress: !isProgress,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todo', todoId] });
          queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
        },
        onError: (error) => {
          alert(`Todo 업데이트에 실패했습니다.${error}`);
        },
      },
    );
  };

  return (
    <S.TodoWrapper>
      {isProgress ? (
        <GlowingBorder isProgress={isProgress}>
          <Box width="100%" padding="2px" display="flex" alignItems="center" justifyContent="center">
            <S.TodoContainer
              onClick={() => {
                handleOpenModal();
              }}
            >
              <Text $width="90%" $fontSize="small" title-wrap="wrap">
                {title}
              </Text>
              <TodoRecordButton todoId={todoId} isProgress={isProgress} toggleRecord={() => toggleRecord(todoId)} />
            </S.TodoContainer>
          </Box>
        </GlowingBorder>
      ) : (
        <Box width="100%" padding="2px" display="flex" alignItems="center" justifyContent="center">
          <S.TodoContainer
            onClick={() => {
              handleOpenModal();
            }}
          >
            <Text $width="90%" $fontSize="small" title-wrap="wrap">
              {title}
            </Text>
            <TodoRecordButton todoId={todoId} isProgress={isProgress} toggleRecord={() => toggleRecord(todoId)} />
          </S.TodoContainer>
        </Box>
      )}
    </S.TodoWrapper>
  );
}

export default TodoComponent;
