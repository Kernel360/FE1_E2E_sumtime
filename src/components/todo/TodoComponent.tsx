import React from 'react';
import { SelectTodo } from '@/db/schema/todos';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateTodoTime } from '@/app/apiTest/hooks/todoQueries';
import * as S from './Todo.styled';
import { Text } from '../common';

interface TodoComponentProps {
  todoId: number;
  title: string;
  todo: SelectTodo;

  setModalTodo: (todo: SelectTodo | null) => void;
  setIsModalOpenTrue: () => void;
  setIsModalOpenFalse: () => void;
  setTodoId: (s: string | undefined) => void;
}

function TodoComponent({
  todoId,
  setTodoId,
  todo,
  title,
  setIsModalOpenTrue,
  setIsModalOpenFalse,
  setModalTodo,
}: TodoComponentProps) {
  const queryClient = useQueryClient();
  const { mutate: updateTodoTime } = useUpdateTodoTime();

  const handleOpenModal = () => {
    // TodoList를 클릭한 경우
    if (todo) setTodoId(todo?.todoId.toString());
    // FAB 클릭한 경우
    else setIsModalOpenTrue();
  };
  const handleCloseModal = () => {
    setIsModalOpenFalse();
    setModalTodo(null);
    setTodoId('');
  };
  const handleStart = (id: number) => {
    const startTime = new Date().toLocaleTimeString();
    const endTime = null;

    updateTodoTime(
      { todoId: id.toString(), startTime, endTime },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
          handleCloseModal();
        },
        onError: (error) => {
          alert(`Todo 업데이트에 실패했습니다.${error}`);
        },
      },
    );
  };

  const handleEnd = (id: number) => {
    const startTime = null;
    const endTime = new Date().toLocaleTimeString();

    updateTodoTime(
      { todoId: id.toString(), startTime, endTime },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
          handleCloseModal();
        },
        onError: (error) => {
          alert(`Todo 업데이트에 실패했습니다.${error}`);
        },
      },
    );
  };

  return (
    <S.ATodoComponentContainer>
      <S.TodoContainer
        onClick={() => {
          handleOpenModal();
        }}
      >
        <Text $width="90%" $fontSize="small" title-wrap="wrap">
          {title}
        </Text>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleStart(todoId);
          }}
        >
          ▶
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleEnd(todoId);
          }}
        >
          ❚❚
        </button>
      </S.TodoContainer>
    </S.ATodoComponentContainer>
  );
}

export default TodoComponent;
