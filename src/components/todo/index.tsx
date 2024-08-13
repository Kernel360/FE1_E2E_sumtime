'use client';

import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { useGetTodosMatchingDate } from '@/api/hooks/todoHooks';
import Box from '@mui/material/Box';
import { IconButton, Pagination } from '@mui/material';
import { getCurrentDate, getFormattedDateKr } from '@/utils/timeUtils';
import { Text } from '@/components/common';
import { theme } from '@/themes';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TodoComponent from './TodoComponent';
import TodoModal from './TodoModal';
import * as S from './Todo.styled';

export default function Todo() {
  const [todoId, setTodoId] = useState<number>(0);
  const { value: isModalOpen, setTrue: setIsModalOpenTrue, setFalse: setIsModalOpenFalse } = useBooleanState();
  const {
    value: isModalOpenedByFAB,
    setTrue: setIsModalOpenedByFABTrue,
    setFalse: setIsModalOpenedByFABFalse,
  } = useBooleanState();
  const { data: todoListData } = useGetTodosMatchingDate(1, new Date());

  const handleOpenFAB = () => {
    setIsModalOpenedByFABTrue();
    setTodoId(0); // 새로 추가하는 경우 todoId를 0으로 설정
    setIsModalOpenTrue();
  };

  const handleOpenTodo = (id: number) => {
    setIsModalOpenedByFABFalse();
    setTodoId(id);
    setIsModalOpenTrue();
  };

  return (
    <S.TodoSection>
      <Box width="100%" height={56} borderRadius={2} display="flex" alignItems="center" boxShadow="1px 1px 10px lightgray">
        <Text $fontSize={`${theme.fontSize.lg}px`} $fontWeight="700" $marginLeft="16px">
          {getFormattedDateKr()}
        </Text>
        <Box marginTop={0.2}>
          <IconButton size="small">
            <ArrowDropDownIcon fontSize="large" color="action" />
          </IconButton>
        </Box>
      </Box>
      <Box
        marginTop={1}
        marginBottom={1}
        padding={1}
        borderRadius={2}
        width="100%"
        display="flex"
        justifyContent="center"
        boxShadow="1px 1px 10px lightgray"
      >
        <Pagination
          defaultPage={getCurrentDate()}
          count={31}
          siblingCount={5}
          boundaryCount={0}
          color="primary"
          size="medium"
          showFirstButton
          showLastButton
          hideNextButton
          hidePrevButton
        />
      </Box>
      <Box position="relative" width="100%" height="50%">
        <S.TodoComponentsSection>
          <Box>
            {todoListData &&
              todoListData.map((todo) => (
                <TodoComponent
                  key={todo.todoId}
                  todoId={todo.todoId}
                  title={todo.title}
                  setTodoId={handleOpenTodo}
                  setIsModalOpenTrue={setIsModalOpenTrue}
                  setIsModalOpenedByFABFalse={setIsModalOpenedByFABFalse}
                />
              ))}
          </Box>
        </S.TodoComponentsSection>
        <S.FloatingButton>
          <Fab color="primary" size="small" aria-label="add" onClick={handleOpenFAB}>
            <AddIcon />
          </Fab>
        </S.FloatingButton>
      </Box>
      <Box width="100%" height="300px" marginTop={2} borderRadius={2} boxShadow="1px 1px 10px lightgray" />

      <TodoModal
        open={isModalOpen}
        setIsModalOpenFalse={setIsModalOpenFalse}
        todoId={todoId}
        isModalOpenedByFAB={isModalOpenedByFAB}
      />
    </S.TodoSection>
  );
}
