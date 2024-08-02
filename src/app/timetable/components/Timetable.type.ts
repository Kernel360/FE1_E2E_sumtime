interface Task {
  id: number;
  title: string;
  subTitle: string;
  slotColor?: string;
  startTime: Date;
  endTime: Date;
}

export type { Task };
