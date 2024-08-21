// src/types/todo.d.ts
export type TodoModalMode = 'create' | 'update' | '';

export interface TodoDateType {
  id: number;
  categoryId: number;
  userId: number;
  date: string;
  startTime: Date | null;
  endTime: Date | null;
  taskColor: string | null;
  title: string;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  color: string | null;
}
