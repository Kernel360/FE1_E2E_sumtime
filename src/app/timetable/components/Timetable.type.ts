interface Task {
  id: number;
  title: string;
  subTitle: string;
  taskColor?: string;
  startTime: Date;
  endTime: Date;
  seed?: Seed;
}

type TaskThemeType = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'random' | `#${string}` | undefined; // HEX
type Seed = string | number | 'no-seed'; // no seed면 taskId이용

interface TaskSlotContextProps {
  defaultValue: string;
}
type TimetableType = 'CIRCLE' | 'ROW' | 'COLUMN';
type PopoverType = 'CLICK' | 'HOVER';

export type { Task, TimetableType, PopoverType, TaskSlotContextProps, TaskThemeType, Seed };
