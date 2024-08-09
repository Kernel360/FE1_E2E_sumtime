interface Task {
  id: number;
  title: string;
  content: string;
  taskColor?: string;
  startTime: Date;
  endTime: Date;
}
interface TaskSlotContextProps {
  defaultValue: string;
}
type TimetableType = 'CIRCLE' | 'ROW' | 'COLUMN';
type PopoverType = 'CLICK' | 'HOVER';

export type { Task, TimetableType, PopoverType, TaskSlotContextProps };
