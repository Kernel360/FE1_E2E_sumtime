'use client';

import React, { useEffect, useState } from 'react';
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
  const [todoId, setTodoId] = useState<string>();
  const [modalTodo, setModalTodo] = useState<SelectTodo | null>(null);
  const { value: isModalOpen, setTrue: setIsModalOpenTrue, setFalse: setIsModalOpenFalse } = useBooleanState();

  // TSQuery 사용
  const { data: todoListData } = useGetAllTodos('1');
  const { data: todoData, isSuccess: isTodoDataSuccess } = useGetOneTodo(todoId ?? '');

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
              setTodoId={setTodoId}
              title={todo.title}
              todo={todo}
              setIsModalOpenTrue={setIsModalOpenTrue}
              setIsModalOpenFalse={setIsModalOpenFalse}
              setModalTodo={setModalTodo}
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
          currentTodo={modalTodo}
          setIsModalOpenFalse={setIsModalOpenFalse}
          setModalTodo={setModalTodo}
          modalTodo={modalTodo}
          setTodoId={setTodoId}
        />
      </S.TodoSection>
    )
  );
}
