import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteTodo, useGetOneTodo, useUpdateTodo } from '@/api/hooks/todoHooks';
import { TimePicker } from '@mui/x-date-pickers';
import { parseISO, isValid, isBefore, isToday, isAfter } from 'date-fns';
import randomColor from 'randomcolor';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { closeModal, selectTodoUI } from '@/lib/todos/todoUISlice'; // Redux 상태 추가
import { selectTodoData } from '@/lib/todos/todoDataSlice'; // Redux 상태 추가
import DeleteIcon from '@mui/icons-material/Delete';
import useBooleanState from '@/hooks/utils/useBooleanState';
import DeleteConfirmModal from '@/components/Modal/DeleteConfirmModal';
import { checkTaskListOverlap } from 'react-custom-timetable';
import { convertTodosForTimetable } from '@/utils/timetable/convertTodosForTimetable';
import CategoryField from './CategoryField';
import { TodoModalStyle } from '../Todo.styled';

export default function UpdateTodoModal() {
  // Redux hook 사용: 기존 props로 주입된 값들은 Redux에서 가져옴
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector(selectTodoUI);
  const { sessionId, todoId, displayingDate, todoListData } = useAppSelector(selectTodoData);

  // 데이터 가져오기
  const { data: todoData, isSuccess: isSuccessGetOneTodo } = useGetOneTodo(todoId);
  const [title, setTitle] = useState(todoData?.title || '');
  const [content, setContent] = useState<string | null>(todoData?.content || '');
  const [startTime, setStartTime] = useState<string | null>(todoData?.startTime || null);
  const [endTime, setEndTime] = useState<string | null>(todoData?.endTime || null);
  const color = todoData?.color ?? randomColor();
  const [categoryId, setCategoryId] = useState<number | undefined>(todoData?.categoryId);

  useEffect(() => {
    setTitle(todoData?.title || '');
    setContent(todoData?.content || '');
    setStartTime(todoData?.startTime || null);
    setEndTime(todoData?.endTime || null);
    setCategoryId(todoData?.categoryId);
  }, [todoData]);

  const queryClient = useQueryClient();
  const { mutate: updateTodo } = useUpdateTodo();

  const now = new Date(); // 현재 시간
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘의 시작 시점

  const isPastDate = isBefore(displayingDate ?? new Date(), today);
  const isTodayDate = isToday(displayingDate ?? new Date());
  const isFutureDate = isAfter(displayingDate ?? new Date(), today);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleUpdate = async () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
      return;
    }

    const updatedTodo = {
      todoId,
      title,
      content,
      startTime,
      endTime,
      isProgress: false,
      color,
      categoryId,
    };

    console.log(updatedTodo);

    const updatedTodoList = [
      ...todoListData,
      {
        ...updatedTodo,
        date: displayingDate instanceof Date ? displayingDate.toISOString() : displayingDate || '',
        id: todoId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: sessionId,
        categoryId: categoryId!,
        isProgress: 0,
      },
    ];
    if (checkTaskListOverlap(convertTodosForTimetable(updatedTodoList))) {
      alert('시간표가 중복됩니다. 시간을 다시 확인해주세요.');
      return;
    }

    updateTodo(updatedTodo, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todo', todoId] });
        queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
        handleCloseModal();
      },
      onError: (error) => {
        alert(`Todo 업데이트에 실패했습니다.${error}`);
      },
    });
  };

  const getTimePickerProps = () => {
    if (isFutureDate) {
      return { minTime: undefined, maxTime: undefined };
    }
    if (isPastDate) {
      return { minTime: undefined, maxTime: undefined };
    }
    if (isTodayDate) {
      return { minTime: today, maxTime: now };
    }
    return { minTime: undefined, maxTime: undefined };
  };

  const { minTime, maxTime } = getTimePickerProps();

  const { value: isDeleteModalOpen, setTrue: deleteModalOpen, setFalse: deleteModalClose } = useBooleanState(false);

  const { mutate: deleteTodo } = useDeleteTodo();

  const handelDeleteTodo = (id: number) => {
    return deleteTodo(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
        deleteModalClose();
        handleCloseModal();
      },
      onError: (error) => {
        alert(`Todo를 삭제하는 데 실패했습니다.${error}`);
      },
    });
  };

  return (
    isSuccessGetOneTodo && (
      <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={TodoModalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography id="modal-title" variant="h6" component="h2">
              Todo 수정
            </Typography>
            <IconButton onClick={deleteModalOpen} color="secondary">
              <DeleteIcon sx={{ color: 'red[400]', fontSize: 25 }} />
            </IconButton>
            <DeleteConfirmModal id={todoId} open={isDeleteModalOpen} handleClose={deleteModalOpen} deleteFn={handelDeleteTodo} />
          </Box>
          <Box m={1}>
            <TextField
              sx={{ width: '100%', margin: '10px 0' }}
              label="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTitle((prev) => prev.trim())}
            />
            <TextField
              sx={{ width: '100%', margin: '10px 0' }}
              label="설명"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={() => setTitle((prev) => prev.trim())}
            />

            <Box display="flex" gap={1}>
              <TimePicker
                sx={{ width: '100%', margin: '10px 0' }}
                views={['hours', 'minutes']}
                label="시작 시간"
                value={startTime ? parseISO(startTime) : null}
                minTime={minTime} // 설정된 minTime 사용
                maxTime={endTime ? parseISO(endTime) : maxTime} // 설정된 maxTime 사용
                onChange={(value) => setStartTime(value && isValid(value) ? value.toISOString() : null)}
              />
              <TimePicker
                sx={{ width: '100%', margin: '10px 0' }}
                views={['hours', 'minutes']}
                label="종료 시간"
                value={endTime ? parseISO(endTime) : null}
                minTime={startTime ? parseISO(startTime) : minTime} // 설정된 minTime 사용
                maxTime={maxTime} // 설정된 maxTime 사용
                onChange={(value) => setEndTime(value && isValid(value) ? value.toISOString() : null)}
              />
            </Box>
            {categoryId && <CategoryField categoryId={categoryId} setCategoryId={setCategoryId} />}
          </Box>
          <Box display="flex" gap={1} m={1} justifyContent="flex-end">
            <Button onClick={handleCloseModal} variant="text" size="medium" color="error" sx={{ border: '1px solid pink' }}>
              취소
            </Button>
            <Button onClick={handleUpdate} variant="contained" color="primary">
              저장
            </Button>
          </Box>
        </Box>
      </Modal>
    )
  );
}
