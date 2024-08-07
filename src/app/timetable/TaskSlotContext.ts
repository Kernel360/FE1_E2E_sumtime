import { createContext } from 'react';
import { TaskSlotContextProps } from './components/Timetable.type';

const defaultContext: TaskSlotContextProps = {
  hoverable: false,
  defaultValue: '',
};
const TaskSlotContext = createContext<TaskSlotContextProps>(defaultContext);

export default TaskSlotContext;
