import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectTodo } from '@/db/schema/todos';
import { toZonedTime } from 'date-fns-tz';

interface TodoDataState {
  sessionId: number | undefined;
  displayingDate: Date | null;
  todoId: number;
  todoListData: SelectTodo[];
  isLoading: boolean;
  todayDate: Date;
  timeZone: string;
}

const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const initialState: TodoDataState = {
  sessionId: undefined,
  displayingDate: toZonedTime(new Date(), clientTimeZone),
  todoId: 0,
  todoListData: [],
  isLoading: false,
  todayDate: toZonedTime(new Date(), clientTimeZone),
  timeZone: clientTimeZone,
};

const todoDataSlice = createSlice({
  name: 'todoData',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<number | undefined>) => {
      state.sessionId = action.payload;
    },
    setDisplayingDate: (state, action: PayloadAction<Date | null>) => {
      state.displayingDate = action.payload; // sessionId 및 displayingDate가 외부에서 주입됨
    },
    setTodoId: (state, action: PayloadAction<number>) => {
      state.todoId = action.payload;
    },
    setTodoListData: (state, action: PayloadAction<SelectTodo[]>) => {
      state.todoListData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setSessionId, setDisplayingDate, setTodoId, setTodoListData, setLoading } = todoDataSlice.actions;

export const selectTodoData = (state: { todoData: TodoDataState }) => state.todoData;

export default todoDataSlice.reducer;
