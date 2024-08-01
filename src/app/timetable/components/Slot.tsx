import TimeSlot from '@/app/timetable/components/TimeSlot';
import TaskSlot from '@/app/timetable/components/TaskSlot';
import type { Task } from './Timetable.type';
import styled from './Slot.module.scss';

interface SlotProps {
  headerDate: Date;
  slotTime: number;
  taskItemList: Task[];
  height: string;
  shouldDisplayTaskContentList: boolean[];
}

function Slot({ headerDate, slotTime, taskItemList, height, shouldDisplayTaskContentList = [] }: SlotProps) {
  return (
    <div className={styled.slot} style={{ height }}>
      <TimeSlot headerDate={headerDate} />
      <TaskSlot
        headerDate={headerDate}
        slotTime={slotTime}
        taskItemList={taskItemList}
        shouldDisplayTaskContentList={shouldDisplayTaskContentList}
      />
    </div>
  );
}

export default Slot;
