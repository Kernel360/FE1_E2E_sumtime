import React from 'react';
import * as S from './Todo.styled';
import { Text } from '../common';

interface TodoComponentProps {
  todoId: number;
  title: string;
  handleOpenModal: (todoId: number) => void; // id를 매개변수로 받도록 수정
  handleStart: (todoId: number) => void; // id를 매개변수로 받도록 수정
  handleEnd: (todoId: number) => void; // id를 매개변수로 받도록 수정
}

function TodoComponent({ todoId, title, handleOpenModal, handleStart, handleEnd }: TodoComponentProps) {
  return (
    <S.ATodoComponentContainer>
      <S.TodoContainer onClick={() => handleOpenModal(todoId)}>
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
