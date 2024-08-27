export interface BaseTask {
  id: number;
  title: string;
  content: string | null;
  startTime: Date | null;
  endTime: Date | null;
  taskColor?: string | null;
  seed?: Seed;
}

export type Seed = string | number;
