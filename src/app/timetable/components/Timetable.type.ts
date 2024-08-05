interface Task {
  id: number;
  title: string;
  subTitle: string;
  taskColor?: string;
  startTime: Date;
  endTime: Date;
}
type TimetableType = 'CURCLE' | 'ROW' | 'COLUMN';

export type { Task, TimetableType };
