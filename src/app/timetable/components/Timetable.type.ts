interface Task {
  id: number;
  title: string;
  subTitle: string;
  taskColor?: string;
  startTime: Date;
  endTime: Date;
}
type TimetableType = 'CIRCLE' | 'ROW' | 'COLUMN';

export type { Task, TimetableType };
