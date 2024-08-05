import TimeSlot from './RowTypeTimeTable/TimeSlot';
import TaskSlot from './RowTypeTimeTable/TaskSlot';
import type { Task } from './Timetable.type';
import styled from './Slot.module.scss';

interface SlotProps {
  headerDate: Date;
  height: string;
  slotTime: number;
  taskItemList: Task[];
  shouldDisplayTaskContentList: boolean[];
  timeSlotStyle: React.CSSProperties;
  taskSlotStyle: React.CSSProperties;
}

function Slot({
  headerDate,
  slotTime,
  taskItemList,
  height,
  shouldDisplayTaskContentList = [],
  timeSlotStyle,
  taskSlotStyle,
}: SlotProps) {
  return (
    <div className={styled.slot} style={{ height }}>
      <TimeSlot headerDate={headerDate} timeSlotStyle={timeSlotStyle} />
      <TaskSlot
        headerDate={headerDate}
        slotTime={slotTime}
        taskItemList={taskItemList}
        shouldDisplayTaskContentList={shouldDisplayTaskContentList}
        taskSlotStyle={taskSlotStyle}
      />
    </div>
  );
}

export default Slot;
