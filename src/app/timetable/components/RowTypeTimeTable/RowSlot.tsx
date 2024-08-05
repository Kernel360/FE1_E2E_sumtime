import TimeSlot from './RowTimeSlot';
import RowTaskSlot from './RowTaskSlot';
import { Task } from '../Timetable.type';
import styled from './RowTypeTimeTable.module.scss';

interface SlotProps {
  headerDate: Date;
  width: string;
  slotTime: number;
  taskItemList: Task[];
  shouldDisplayTaskContentList: boolean[];
  timeSlotStyle: React.CSSProperties;
  taskSlotStyle: React.CSSProperties;
}

function RowSlot({
  headerDate,
  slotTime,
  taskItemList,
  width,
  shouldDisplayTaskContentList = [],
  timeSlotStyle,
  taskSlotStyle,
}: SlotProps) {
  console.log('Row Slot in ', taskItemList, headerDate);

  return (
    <div className={styled.slot} style={{ width }}>
      <TimeSlot headerDate={headerDate} timeSlotStyle={timeSlotStyle} />
      <RowTaskSlot
        headerDate={headerDate}
        slotTime={slotTime}
        taskItemList={taskItemList}
        shouldDisplayTaskContentList={shouldDisplayTaskContentList}
        taskSlotStyle={taskSlotStyle}
      />
    </div>
  );
}

export default RowSlot;
