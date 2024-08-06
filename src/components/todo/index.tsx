'use client';

import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useBooleanState from '@/hooks/utils/useBooleanState';
import TodoComponent from './TodoComponent';
import TodoModal from './TodoModal';
import * as S from './Todo.styled';
import { Text } from '../common';

interface TodoItem {
  id: number;
  text: string;
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

  const handleSave = (text: string, startTime: string, endTime: string) => {
    if (currentTodo) {
      // 기존 todo 수정
      setTodos(todos.map((todo) => (todo.id === currentTodo.id ? { ...todo, text, startTime, endTime } : todo)));
    } else {
      // 새로운 todo 추가
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text,
          startTime,
          endTime,
        },
      ]);
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    if (currentTodo) {
      setTodos(todos.filter((todo) => todo.id !== currentTodo.id));
      handleCloseModal();
    }
  };

  const handleStart = (id: number) => {
    const now = new Date().toLocaleTimeString();
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, startTime: now } : todo)));
  };

  const handleEnd = (id: number) => {
    const now = new Date().toLocaleTimeString();
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, endTime: now } : todo)));
  };

  return (
    <S.TodoSection>
      <S.TodoComponentsSection>
        <Text $fontSize="xl" $fontWeight="bold" $color="black">
          2024년 8월 1일 목요일
        </Text>
        {todos.map((todo) => (
          <TodoComponent
            id={todo.id}
            key={todo.id}
            text={todo.text}
            handleOpenModal={() => handleOpenModal(todo)}
            handleStart={() => handleStart(todo.id)}
            handleEnd={() => handleEnd(todo.id)}
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
