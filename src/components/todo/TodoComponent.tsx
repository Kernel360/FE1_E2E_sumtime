import React, { useState } from 'react';
import * as S from './Todo.styled';
import { Text } from '../common';
import TodoModal from './TodoModal';

interface TodoComponentProps {
  initialText: string;
}

function TodoComponent({ initialText }: TodoComponentProps) {
  const [text, setText] = useState(initialText);
  const [tempText, setTempText] = useState(text);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleTempTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempText(event.target.value);
  };

  const handleSave = () => {
    // Save the updated text and close the modal
    // setText(text);
    setText(tempText);
    setIsModalOpen(false);
  };

  const handleStart = () => {
    const now = new Date().toLocaleTimeString();
    setStartTime(now);
  };

  const handleEnd = () => {
    const now = new Date().toLocaleTimeString();
    setEndTime(now);
  };

  return (
    <S.ATodoComponentContainer>
      <S.TodoContainer>
        <Text $width="90%" $fontSize="small" text-wrap="wrap" onClick={handleOpenModal}>
          {text}
        </Text>
        <button type="button" onClick={handleStart}>
          ▶
        </button>
        <button type="button" onClick={handleEnd}>
          ❚❚
        </button>
      </S.TodoContainer>
      <TodoModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        tempText={tempText}
        handleTempTextChange={handleTempTextChange}
        startTime={startTime}
        endTime={endTime}
        handleSave={handleSave}
      />
    </S.ATodoComponentContainer>
  );
}

export default TodoComponent;
