'use client';

import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TodoComponent from './TodoComponent';
import * as S from './Todo.styled';
import { Text } from '../common';

export default function Todo() {
  return (
    <S.TodoSection>
      <S.TodoComponentsSection>
        <Text $fontSize="xl" $fontWeight="bold" $color="black">
          2024년 8월 1일 목요일
        </Text>
        <TodoComponent initialText="이것은 첫 번째 투두입니다" />
        <TodoComponent initialText="이것은 두 번째 투두입니다" />
        <TodoComponent initialText="이것은 세 번째 투두입니다" />
        <TodoComponent initialText="이것은 네 번째 투두입니다" />
        <TodoComponent initialText="이것은 다섯 번째 투두입니다" />
      </S.TodoComponentsSection>
      <S.FloatingButton>
        <Fab color="primary" size="small" aria-label="add">
          <AddIcon />
        </Fab>
      </S.FloatingButton>
    </S.TodoSection>
  );
}
