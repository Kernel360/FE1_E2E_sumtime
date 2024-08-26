export interface BaseTask {
  id: number;
  title: string;
  content: string | null;
  startTime: Date | null;
  endTime: Date | null;
  taskColor?: string | null;
  seed?: Seed;
}

export type TaskThemeType =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'random'
  | `#${string}`
  | undefined;
export type Seed = string | number;

export interface TaskSlotContextProps {
  ellipsisText: string;
}
export type TimetableDirectionType = 'ROW' | 'COLUMN';
export type PopoverType = 'CLICK' | 'HOVER';
