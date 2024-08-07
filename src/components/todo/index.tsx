'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { useGetAllTodos, useGetOneTodo } from '@/app/apiTest/hooks/todoQueries';
import { SelectTodo } from '@/db/schema/todos';
import TodoComponent from './TodoComponent';
import TodoModal from './TodoModal';
import * as S from './Todo.styled';
import { Text } from '../common';

export default function Todo() {
  const [todos, setTodos] = useState<SelectTodo[]>([]);
  const [todoId, setTodoId] = useState<string>();
  const [modalTodo, setModalTodo] = useState<SelectTodo | null>(null);
  const { value: isModalOpen, setTrue, setFalse } = useBooleanState();
  // TSQuery 사용
  const { data: todoListData } = useGetAllTodos('1');
  const { data: todoData, isSuccess: isTodoDataSuccess } = useGetOneTodo(todoId ?? '');

  // todoList 초기 로드
  useEffect(() => {
    if (todoListData) {
      setTodos(todoListData);
    }
  }, [todoListData]);
  useEffect(() => {
    if (isTodoDataSuccess && todoData) {
      setModalTodo(todoData || null);

      setTrue();
    }
  }, [todoData, isTodoDataSuccess]);

  // const handleOpenModal = (todo?: SelectTodo) => {
  //   setTodoId(todo?.todoId.toString());
  //   setModalTodo(todoData || null);
  //   console.log('투두데이터', todoData);
  //   if () setTrue();
  // };
  const handleOpenModal = (todo?: SelectTodo) => {
    setTodoId(todo?.todoId.toString());
    console.log('투두데이터', todoData);
  };

  const handleCloseModal = () => {
    setFalse();
    setModalTodo(null);
  };

  const handleSave = async (title: string, startTime: string, endTime: string) => {
    try {
      let response;
      if (modalTodo) {
        // 기존 todo 수정
        response = await axios.put('/api/todo/update', {
          todoId: modalTodo.todoId,
          title,
          startTime,
          endTime,
        });
      } else {
        // 새로운 todo 추가
        response = await axios.post(
          '/api/todo/create',
          {
            userId: '1',
            title,
            startTime,
            endTime,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }
      console.log(response); // 변수 미사용 Lint에러 방지 위한 response 사용하는 console.log 추가
      handleCloseModal();
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };
  const handleDelete = async () => {
    if (modalTodo) {
      const response = await axios.delete('/api/todo/delete', {
        data: {
          todoId: modalTodo.todoId,
        },
      });
      console.log(response); // 변수 미사용 Lint에러 방지 위한 response 사용하는 console.log 추가

      handleCloseModal();
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

  // userId에 해당하는 todo 목록이 화면에 렌더링 됨
  // useEffect(() => {
  //   // const fetchTodos = async () => {
  //   //   try {
  //   //     const response = await axios.post('/api/todo/getAllByUserId', {
  //   //       userId: 1,
  //   //
  //   //       headers: {
  //   //         'Content-Type': 'application/json',
  //   //       },
  //   //     });
  //   //
  //   //     setTodos(response.data.todos);
  //   //   } catch (error) {
  //   //     console.error('Error fetching todos:', error);
  //   //   }
  //   // };
  //   // fetchTodos();
  // }, []);
  return (
    <S.TodoSection>
      <S.TodoComponentsSection>
        <Text $fontSize="xl" $fontWeight="bold" $color="black">
          2024년 8월 1일 목요일
        </Text>
        {todos.map((todo) => (
          <TodoComponent
            todoId={todo.todoId}
            key={todo.todoId}
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
