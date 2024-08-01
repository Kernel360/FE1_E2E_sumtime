import React, { useState } from 'react';
import * as S from './Todo.styled';
import { Text } from '../common';

function TodoComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const text = '이것은 투두입니다';
  const handleTextClick = () => {
    setIsModalOpen(true);
  };

  return (
    <S.ATodoComponentContainer>
      <S.TodoContainer>
        <Text $width="90%" $fontSize="small" text-wrap="wrap" onClick={handleTextClick}>
          {text}
        </Text>
        <button type="button">▶</button>
        <button type="button">❚❚</button>
      </S.TodoContainer>
      {isModalOpen && <div>{/* Modal content here */}</div>}
    </S.ATodoComponentContainer>
  );
}

export default TodoComponent;
