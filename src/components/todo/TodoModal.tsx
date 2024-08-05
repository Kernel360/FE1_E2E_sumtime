import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoModalStyle } from './Todo.styled';

interface TodoItem {
  id: number;
  text: string;
  startTime: string;
  endTime: string;
}
interface TodoModalProps {
  open: boolean;
  handleClose: () => void;
  currentTodo: TodoItem | null;
  handleSave: (text: string, startTime: string, endTime: string) => void;
  handleDelete: () => void;
}

export default function TodoModal({ open, handleClose, currentTodo, handleSave, handleDelete }: TodoModalProps) {
  const [text, setText] = React.useState(currentTodo?.text || '');
  const [startTime, setStartTime] = React.useState(currentTodo?.startTime || '');
  const [endTime, setEndTime] = React.useState(currentTodo?.endTime || '');

  useEffect(() => {
    setText(currentTodo?.text || '');
    setStartTime(currentTodo?.startTime || '');
    setEndTime(currentTodo?.endTime || '');
  }, [currentTodo]);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={TodoModalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-title" variant="h6" component="h2">
            {currentTodo ? 'Todo 수정' : '새로운 Todo 생성'}
          </Typography>
          {currentTodo && (
            <IconButton onClick={handleDelete} color="secondary">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
        <TextField fullWidth margin="normal" label="내용" value={text} onChange={(e) => setText(e.target.value)} />
        <TextField fullWidth margin="normal" label="시작 시간" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <TextField fullWidth margin="normal" label="종료 시간" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <Button onClick={() => handleSave(text, startTime, endTime)} variant="contained" color="primary">
          저장
        </Button>

        <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ ml: 2 }}>
          취소
        </Button>
      </Box>
    </Modal>
  );
}