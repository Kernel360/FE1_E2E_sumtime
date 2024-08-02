interface Task {
  id: number;
  title: string;
  subTitle: string;
  taskColor?: string;
  startTime: Date;
  endTime: Date;
}

export type { Task };
