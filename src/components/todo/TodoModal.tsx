import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

interface TodoModalProps {
  open: boolean;
  handleClose: () => void;
  tempText: string;
  startTime: string;
  endTime: string;
  handleTempTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // modal에 입력되는 Text는 변경되어야함
  handleSave: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TodoModal({
  open,
  handleClose,
  tempText,
  startTime,
  endTime,
  handleTempTextChange,
  handleSave,
}: TodoModalProps) {
  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            수정하기
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="내용"
            value={tempText} // tempText넘겨주니 여기에 tempText로 바뀜?
            onChange={handleTempTextChange}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            시작 시간: {startTime}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            종료 시간: {endTime}
          </Typography>
          <Button onClick={handleSave} variant="contained" color="primary">
            수정
          </Button>
          <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ ml: 2 }}>
            취소
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
