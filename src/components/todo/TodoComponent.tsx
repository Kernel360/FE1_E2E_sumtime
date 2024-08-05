import React from 'react';
import * as S from './Todo.styled';
import { Text } from '../common';

interface TodoComponentProps {
  id: number;
  text: string;
  handleOpenModal: (id: number) => void; // id를 매개변수로 받도록 수정
  handleStart: (id: number) => void; // id를 매개변수로 받도록 수정
  handleEnd: (id: number) => void; // id를 매개변수로 받도록 수정
}

function TodoComponent({ id, text, handleOpenModal, handleStart, handleEnd }: TodoComponentProps) {
  return (
    <S.ATodoComponentContainer>
      <S.TodoContainer>
        <Text $width="90%" $fontSize="small" text-wrap="wrap" onClick={() => handleOpenModal(id)}>
          {text}
        </Text>
        <button type="button" onClick={() => handleStart(id)}>
          ▶
        </button>
        <button type="button" onClick={() => handleEnd(id)}>
          ❚❚
        </button>
      </S.TodoContainer>
    </S.ATodoComponentContainer>
  );
}

export default TodoComponent;
