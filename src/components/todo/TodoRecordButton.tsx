import React from 'react';
import Box from '@mui/material/Box';

interface TodoRecordButtonProps {
  toggleRecord: (todoId: number) => void;
  todoId: number;
  isProgress?: boolean;
}

function TodoRecordButton({ toggleRecord, todoId, isProgress }: TodoRecordButtonProps) {
  return (
    <Box
      margin={1}
      boxSizing="border-box"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ cursor: 'pointer' }}
      onClick={(e) => {
        e.stopPropagation();
        toggleRecord(todoId);
      }}
    >
      <Box
        boxSizing="border-box"
        width="1.5rem"
        height="1.5rem"
        borderRadius="50%"
        border={!isProgress ? '1px solid #CE4934' : '1px solid #CE4934'}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width={!isProgress ? '0.9rem' : '0.6rem'}
          height={!isProgress ? '0.9rem' : '0.6rem'}
          bgcolor={!isProgress ? '#CE4934' : '#CE4934'}
          borderRadius={!isProgress ? '50%' : '20%'}
          sx={{ transition: 'all 0.15s ease' }}
        />
      </Box>
    </Box>
  );
}

export default TodoRecordButton;
