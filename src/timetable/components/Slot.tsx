import TimeSlot from '@/timetable/components/TimeSlot';
import TaskSlot from '@/timetable/components/TaskSlot';
import type { Task } from './Timetable.type';
import styled from './Slot.module.scss';

interface SlotProps {
  headerDate: Date;
  slotTime: number;
  taskItem: Task | undefined;
  height: string;
  shouldDisplayTaskContent: boolean;
}

function Slot({ headerDate, slotTime, taskItem, height, shouldDisplayTaskContent = false }: SlotProps) {
  return (
    <div className={styled.slot} style={{ height }}>
      <TimeSlot headerDate={headerDate} />
      <TaskSlot
        headerDate={headerDate}
        slotTime={slotTime}
        taskItem={taskItem}
        shouldDisplayTaskContent={shouldDisplayTaskContent}
      />
    </div>
  );
}

export default Slot;
