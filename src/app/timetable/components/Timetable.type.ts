interface Task {
  id: number;
  title: string;
  subTitle: string;
  taskColor?: string;
  startTime: Date;
  endTime: Date;
}
type TimetableType = 'CIRCLE' | 'ROW' | 'COLUMN';

interface TaskSlotContextProps {
  hoverable: boolean;
  defaultValue: string;
}

export type { Task, TimetableType, TaskSlotContextProps };
