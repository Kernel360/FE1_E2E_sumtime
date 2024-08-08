import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectTodo } from '@/db/schema/todos';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from '@/app/apiTest/hooks/todoQueries';
import { TodoModalStyle } from './Todo.styled';

interface TodoModalProps {
  open: boolean;
  // handleClose: () => void;
  currentTodo: SelectTodo | null;
  // handleSave: (title: string, startTime: string, endTime: string) => void;
  // handleDelete: () => void;
  modalTodo: SelectTodo | null;
  setModalTodo: (todo: SelectTodo | null) => void;
  setIsModalOpenFalse: () => void;
  setTodoId: (s: string | undefined) => void;
}

export default function TodoModal({
  open,
  currentTodo,
  setIsModalOpenFalse,
  modalTodo,
  setModalTodo,
  setTodoId,
}: TodoModalProps) {
  const [title, setTitle] = React.useState(currentTodo?.title || '');
  const [content, setContent] = React.useState(currentTodo?.content || '');
  const [startTime, setStartTime] = React.useState(currentTodo?.startTime || '');
  const [endTime, setEndTime] = React.useState(currentTodo?.endTime || '');
  const [color, setColor] = React.useState(currentTodo?.color || '');

  const queryClient = useQueryClient();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  useEffect(() => {
    setTitle(currentTodo?.title || '');
    setStartTime(currentTodo?.startTime || '');
    setEndTime(currentTodo?.endTime || '');

    console.log('currentTodo', currentTodo);
  }, [currentTodo]);

  const handleCloseModal = () => {
    setIsModalOpenFalse();
    setModalTodo(null);
    setTodoId('');
  };

  const handleSave = () => {
    if (modalTodo) {
      updateTodo(
        { todoId: modalTodo.todoId.toString(), title, content, startTime, endTime, color },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
            handleCloseModal();
          },
          onError: (error) => {
            alert(`Todo 업데이트에 실패했습니다.${error}`);
          },
        },
      );
    } else {
      createTodo(
        { userId: '1', title, content, startTime, endTime, color },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
            handleCloseModal();
          },
          onError: (error) => {
            alert(`Todo를 생성하는 데 실패했습니다.${error}`);
          },
        },
      );
    }
    handleCloseModal();
  };
  const handleDelete = () => {
    if (modalTodo) {
      deleteTodo(modalTodo.todoId.toString(), {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
          handleCloseModal();
        },
        onError: (error) => {
          queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
          alert(`Todo를 삭제하는 데 실패했습니다.${error}`);
        },
      });
    }
  };

  return (
    <Modal open={open} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
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
        <TextField fullWidth margin="normal" label="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField fullWidth margin="normal" label="설명" value={content} onChange={(e) => setContent(e.target.value)} />
        <TextField fullWidth margin="normal" label="시작 시간" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <TextField fullWidth margin="normal" label="종료 시간" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <TextField fullWidth margin="normal" label="색" value={color} onChange={(e) => setColor(e.target.value)} />
        <Button onClick={() => handleSave()} variant="contained" color="primary">
          저장
        </Button>

        <Button onClick={handleCloseModal} variant="outlined" color="secondary" sx={{ ml: 2 }}>
          취소
        </Button>
      </Box>
    </Modal>
  );
}
