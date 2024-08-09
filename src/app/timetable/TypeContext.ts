import { createContext } from 'react';
import { TimetableType, PopoverType, TaskSlotContextProps } from './components/Timetable.type';

const TypeContext = createContext<TimetableType>('COLUMN');
const PopoverTypeContext = createContext<PopoverType>('Click');
const defaultContext: TaskSlotContextProps = {
  defaultValue: '',
};
const TaskSlotContext = createContext<TaskSlotContextProps>(defaultContext);

export { TypeContext, PopoverTypeContext, TaskSlotContext };
