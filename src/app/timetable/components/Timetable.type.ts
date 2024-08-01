interface Task {
  id: number;
  title: string;
  subTitle: string;
  slotColor: string;
  startTime: Date;
  endTime: Date;
}

interface Style {
  color: string;
  backgroundColor: string;
}

export type { Task, Style };
