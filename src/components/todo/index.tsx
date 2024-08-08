'use client';

import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useBooleanState from '@/hooks/utils/useBooleanState';
import {
  useCreateTodo,
  useDeleteTodo,
  useGetAllTodos,
  useGetOneTodo,
  useUpdateTodo,
  useUpdateTodoTime,
} from '@/app/apiTest/hooks/todoQueries';
import { SelectTodo } from '@/db/schema/todos';
import { useQueryClient } from '@tanstack/react-query';
import TodoComponent from './TodoComponent';
import TodoModal from './TodoModal';
import * as S from './Todo.styled';
import { Text } from '../common';

export default function Todo() {
  const [todoId, setTodoId] = useState<string>();
  const [modalTodo, setModalTodo] = useState<SelectTodo | null>(null);
  const { value: isModalOpen, setTrue: setIsModalOpenTrue, setFalse: setIsModalOpenFalse } = useBooleanState();
  const queryClient = useQueryClient();
  // TSQuery 사용
  const { data: todoListData } = useGetAllTodos('1');
  const { data: todoData, isSuccess: isTodoDataSuccess } = useGetOneTodo(todoId ?? '');
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodoTime } = useUpdateTodoTime();

  useEffect(() => {
    if (isTodoDataSuccess && todoData) {
      setModalTodo(todoData);
      setIsModalOpenTrue();
    }
  }, [todoData, isTodoDataSuccess]);

  const handleOpenModal = async (todo?: SelectTodo) => {
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

  const handleSave = async (title: string, content: string, startTime: string, endTime: string, color: string) => {
    if (modalTodo) {
      updateTodo(
        { todoId: modalTodo.todoId.toString(), title, content, startTime, endTime, color },
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
    } else {
      createTodo(
        { userId: '1', title, content, startTime, endTime, color },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
            handleCloseModal();
          },
          onError: (error) => {
            alert(`Todo를 생성하는 데 실패했습니다.${error}`);
          },
        },
      );
    }
    handleCloseModal();
  };
  const handleDelete = () => {
    if (modalTodo) {
      deleteTodo(modalTodo.todoId.toString(), {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
          handleCloseModal();
        },
        onError: (error) => {
          queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
          alert(`Todo를 삭제하는 데 실패했습니다.${error}`);
        },
      });
    }
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
    todoListData && (
      <S.TodoSection>
        <S.TodoComponentsSection>
          <Text $fontSize="xl" $fontWeight="bold" $color="black">
            2024년 8월 1일 목요일
          </Text>
          {todoListData.map((todo) => (
            <TodoComponent
              key={todo.todoId}
              todoId={todo.todoId}
              title={todo.title}
              handleOpenModal={() => handleOpenModal(todo)}
              handleStart={() => handleStart(todo.todoId)}
              handleEnd={() => handleEnd(todo.todoId)}
            />
          ))}
        </S.TodoComponentsSection>
        <S.FloatingButton>
          <Fab color="primary" size="small" aria-label="add" onClick={() => handleOpenModal()}>
            <AddIcon />
          </Fab>
        </S.FloatingButton>
        <TodoModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          currentTodo={modalTodo}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      </S.TodoSection>
    )
  );
}
