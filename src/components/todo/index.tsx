'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useBooleanState from '@/hooks/utils/useBooleanState';
import TodoComponent from './TodoComponent';
import TodoModal from './TodoModal';
import * as S from './Todo.styled';
import { Text } from '../common';

interface TodoItem {
  todoId: number;
  title: string;
  startTime: string;
  endTime: string;
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null);
  const { value: isModalOpen, setTrue, setFalse } = useBooleanState();

  const handleOpenModal = (todo?: TodoItem) => {
    setCurrentTodo(todo || null);
    setTrue();
  };

  const handleCloseModal = () => {
    setFalse();
    setCurrentTodo(null);
  };

  const handleSave = async (title: string, startTime: string, endTime: string) => {
    if (currentTodo) {
      // 기존 todo 수정
      const response = await axios.put('/api/todo/update', {
        todoId: currentTodo.todoId,
        title,
        startTime,
        endTime,
      });
    } else {
      // 새로운 todo 추가
      const response = await axios.post(
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

    handleCloseModal();
  };

  const handleDelete = async () => {
    if (currentTodo) {
      const response = await axios.delete('/api/todo/delete', {
        data: {
          todoId: currentTodo.todoId,
        },
      });
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

  // userId에 해당하는 todo 목록을 화면에 렌더링 됨. 굳이 useState사용하지 않아도 됨.
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('/api/todo/getAllByUserId?userId=1', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setTodos(response.data.todos);
    };

    fetchTodos();
  }, []);
  return (
    <S.TodoSection>
      <S.TodoComponentsSection>
        <Text $fontSize="xl" $fontWeight="bold" $color="black">
          2024년 8월 1일 목요일
        </Text>
        {todos.map((todo) => (
          <TodoComponent
            todoId={todo.todoId}
            key={`sss_${todo.todoId}`}
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
        currentTodo={currentTodo}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </S.TodoSection>
  );
}
