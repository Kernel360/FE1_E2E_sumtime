interface Task {
  id: number;
  title: string;
  subTitle: string;
  taskColor?: string;
  startTime: Date;
  endTime: Date;
}
interface TaskSlotContextProps {
  defaultValue: string;
}
type TimetableType = 'CIRCLE' | 'ROW' | 'COLUMN';
type PopoverType = 'Click' | 'Hover';

export type { Task, TimetableType, PopoverType, TaskSlotContextProps };
