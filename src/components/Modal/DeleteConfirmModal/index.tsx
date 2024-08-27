import { Box, Button, Modal, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { modalStyle } from '../modal.styled';

interface DeleteConfirmModalProps {
  id: number;
  open: boolean;
  handleClose: () => void;
  deleteFn: UseMutateFunction<string, Error, number, unknown>;
  handleCloseParentModal?: () => void;
}

function DeleteConfirmModal({ id, open, handleClose, deleteFn, handleCloseParentModal }: DeleteConfirmModalProps) {
  const queryClient = useQueryClient();
  const { data } = useSession();
  const sessionId = data?.user.id;

  const handleDelete = async () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
    }

    deleteFn(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
        handleClose();
        if (handleCloseParentModal) {
          handleCloseParentModal();
        }
      },
      onError: (error) => {
        alert(`Todo를 삭제하는 데 실패했습니다.${error}`);
      },
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle }} display="flex" flexDirection="column" justifyContent="space-between" gap={1} padding={1}>
        <Typography variant="h6" gutterBottom>
          정말 삭제하시겠습니까?
        </Typography>
        <Typography variant="subtitle1">한번 삭제하시면 복구할 수 없습니다.</Typography>

        <Box display="flex" gap={1} justifyContent="flex-end">
          <Button onClick={handleClose} variant="outlined" size="medium" color="primary">
            취소
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            삭제
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteConfirmModal;
