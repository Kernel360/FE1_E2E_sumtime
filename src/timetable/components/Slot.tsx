import styled from './Slot.module.scss';
import TimeSlot from '@/timetable/components/TimeSlot';
import TaskSlot from '@/timetable/components/TaskSlot';
import type { Task } from './Timetable.type';

interface SlotProps {
  headerDate: Date;
  slotTime: number;
  taskItem: Task | undefined;
}

function Slot({ headerDate, slotTime, taskItem }: SlotProps) {
  return (
    <div className={styled.slot}>
      <TimeSlot headerDate={headerDate} />
      <TaskSlot headerDate={headerDate} slotTime={slotTime} taskItem={taskItem} />
    </div>
  );
}

export default Slot;
