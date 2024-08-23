import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateTodoTime } from '@/api/hooks/todoHooks';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { useAppSelector } from '@/lib/hooks';
import { selectTodoData } from '@/lib/todos/todoDataSlice';
import * as S from './Todo.styled';
import { Text } from '../common';

interface TodoComponentProps {
  todoId: number;
  title: string;
  setTodoId: (todoId: number) => void;
  startTime: string | null;
  endTime: string | null;
}

function TodoComponent({ todoId, title, setTodoId, startTime, endTime }: TodoComponentProps) {
  const queryClient = useQueryClient();
  const { mutate: updateTodoTime } = useUpdateTodoTime();
  const { sessionId } = useAppSelector(selectTodoData);

  const handleOpenModal = () => {
    // TodoList를 클릭한 경우
    setTodoId(todoId); // props로 받아온 handleOpenModalByTodo함수가 setTodoId함수로 동작하게 만듦
  };

  const handleStart = async (id: number) => {
    const newStartTime = new Date().toISOString();
    const newEndTime = null;

    updateTodoTime(
      {
        todoId: id,
        startTime: newStartTime,
        endTime: newEndTime,
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

  const handleEnd = async (id: number) => {
    const newStartTime = null;
    const newEndTime = new Date().toISOString();

    updateTodoTime(
      {
        todoId: id,
        startTime: newStartTime,
        endTime: newEndTime,
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
    <S.TodoWrapper inProgress={!!startTime && !endTime}>
      <S.TodoContainer
        onClick={() => {
          handleOpenModal();
        }}
      >
        <Text $width="90%" $fontSize="small" title-wrap="wrap">
          {title}
        </Text>
        <Box display="flex" alignItems="center" justifyContent="center">
          {!endTime && (
            <>
              <IconButton
                sx={{ padding: '0' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStart(todoId);
                }}
              >
                <PlayCircleFilledWhiteOutlinedIcon color="action" />
              </IconButton>
              <IconButton
                sx={{ padding: '0' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnd(todoId);
                }}
              >
                <CheckCircleOutlinedIcon color="action" />
              </IconButton>
            </>
          )}
        </Box>
      </S.TodoContainer>
    </S.TodoWrapper>
  );
}

export default TodoComponent;
