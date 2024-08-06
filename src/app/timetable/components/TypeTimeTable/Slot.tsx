import { useContext } from 'react';
import TimeSlot from './TimeSlot';
import TaskSlot from './TaskSlot';
import { Task } from '../Timetable.type';
import rowStyled from './RowTypeTimeTable.module.scss';
import styled from '../Slot.module.scss';
import TypeContext from '../../TypeContext';

interface SlotProps {
  headerDate: Date;
  size: string;
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
  size,
  shouldDisplayTaskContentList = [],
  timeSlotStyle,
  taskSlotStyle,
}: SlotProps) {
  const type = useContext(TypeContext);

  const style = type === 'ROW' ? { width: size } : { height: size };
  const styles = type === 'ROW' ? rowStyled : styled;

  return (
    <div className={styles.slot} style={style}>
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
