import React from 'react';
import Box from '@mui/material/Box';
import * as S from '@/components/todo/Todo.styled';
import TodoComponent from '@/components/todo/TodoComponent';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { setTodoId } from '@/lib/todos/todoDataSlice';
import { openModal, closeModalByFAB, openModalByFAB, setModalMode } from '@/lib/todos/todoUISlice';
import { SkeletonRectangle } from '../common/SkeletonRectangle';

function TodoList() {
  const dispatch = useDispatch();

  // redux store에서 todoListData, isLoading 가져오기
  const { todoListData } = useSelector((state: RootState) => state.todoData);
  const { isLoading } = useSelector((state: RootState) => state.todoData);

  const handleOpenModalByFAB = () => {
    dispatch(setTodoId(0)); // 새 Todo 생성 시 ID는 0으로 설정
    dispatch(openModalByFAB()); // FAB 버튼으로 모달 열림
    dispatch(openModal()); // 모달 열기
    dispatch(setModalMode('create')); // 모드 설정
  };

  const handleOpenModalByTodo = (id: number) => {
    dispatch(setTodoId(id)); // 선택한 Todo의 ID를 설정
    dispatch(closeModalByFAB()); // FAB로 열리지 않은 모달
    dispatch(openModal()); // 모달 열기
    dispatch(setModalMode('update')); // 수정 모드로 설정
  };

  return (
    <Box position="relative" width="100%" height="50%">
      <S.TodoComponentsSection>
        {isLoading ? (
          <>
            <SkeletonRectangle />
            <SkeletonRectangle />
            <SkeletonRectangle />
          </>
        ) : (
          <Box>
            {todoListData &&
              todoListData.map((todo) => (
                <TodoComponent key={todo.id} todoId={todo.id} title={todo.title} setTodoId={handleOpenModalByTodo} />
              ))}
          </Box>
        )}
      </S.TodoComponentsSection>
      <S.FloatingButton>
        <Fab color="primary" size="small" aria-label="add" onClick={handleOpenModalByFAB}>
          <AddIcon />
        </Fab>
      </S.FloatingButton>
    </Box>
  );
}

export default TodoList;
