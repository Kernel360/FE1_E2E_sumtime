'use client';

import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { useCreateTodo, useDeleteTodo, useGetAllTodos, useGetOneTodo, useUpdateTodo } from '@/app/apiTest/hooks/todoQueries';
import { SelectTodo } from '@/db/schema/todos';
import TodoComponent from './TodoComponent';
import TodoModal from './TodoModal';
import * as S from './Todo.styled';
import { Text } from '../common';

export default function Todo() {
  const [todos, setTodos] = useState<SelectTodo[]>([]);
  const [todoId, setTodoId] = useState<string>();
  const [modalTodo, setModalTodo] = useState<SelectTodo | null>(null);
  const { value: isModalOpen, setTrue: setIsModalOpenTrue, setFalse: setIsModalOpenFalse } = useBooleanState();
  // TSQuery 사용
  const { data: todoListData, refetch: refetchAllTodos } = useGetAllTodos('1');
  const { data: todoData, isSuccess: isTodoDataSuccess } = useGetOneTodo(todoId ?? '');
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  // todoList 초기 로드
  useEffect(() => {
    if (todoListData) {
      setTodos(todoListData);
    }
  }, [todoListData]);
  // todoId가 변경될 때마다 modalTodo 설정
  useEffect(() => {
    if (isTodoDataSuccess && todoData) {
      setModalTodo(todoData || null);
      setIsModalOpenTrue();
    }
  }, [todoData, isTodoDataSuccess]);

  const handleOpenModal = (todo?: SelectTodo) => {
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
          onSuccess: (updatedTodo) => {
            setTodos((prevTodos) => prevTodos.map((todo) => (todo.todoId === updatedTodo.todoId ? updatedTodo : todo)));
            refetchAllTodos();
            handleCloseModal();
          },
          onError: (error) => {
            console.error('Todo 업데이트 중 문제가 발생했습니다.', error);
          },
        },
      );
    } else {
      createTodo(
        { userId: '1', title, content, startTime, endTime, color },
        {
          onSuccess: (createdTodo) => {
            setTodos((prevTodos) => [...prevTodos, createdTodo]);
            handleCloseModal();
          },
          onError: (error) => {
            console.error('Todo를 생성하는 데 문제가 발생했습니다.', error);
          },
        },
      );
    }
    handleCloseModal();
  };
  const handleDelete = async () => {
    if (modalTodo) {
      deleteTodo(modalTodo.todoId.toString(), {
        onSuccess: () => {
          alert('Todo 삭제가 완료되었습니다.');
          refetchAllTodos();
          handleCloseModal();
        },
        onError: (error) => {
          console.error('Todo를 삭제하는 데 실패했습니다.', error);
        },
      });
    }
  };

  const handleStart = (id: number) => {
    const now = new Date().toLocaleTimeString();

    setTodos(todos.map((todo) => (todo.todoId === id ? { ...todo, startTime: now } : todo)));
  };

  const handleEnd = (id: number) => {
    const now = new Date().toLocaleTimeString();
    setTodos(todos.map((todo) => (todo.todoId === id ? { ...todo, endTime: now } : todo)));
  };

  return (
    <S.TodoSection>
      <S.TodoComponentsSection>
        <Text $fontSize="xl" $fontWeight="bold" $color="black">
          2024년 8월 1일 목요일
        </Text>
        {todos.map((todo) => (
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
  );
}
