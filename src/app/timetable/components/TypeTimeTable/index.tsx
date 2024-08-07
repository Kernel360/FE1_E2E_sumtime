import { useContext } from 'react';
import Slot from './Slot';
import { Task } from '../Timetable.type';
import { generateClassNameWithType, hasKey, insertKey, taskListFilter } from '../../utils';
import TypeContext from '../../TypeContext';
import styles from './TypeTimeTable.module.scss';
import CurrentTimeLine from '../CurrentTimeLine';

interface TypeTimeTableProps {
  timeSlots: Date[];
  slotSize: string;
  taskList: Task[];
  slotTime: number;
  height: string;
  startTime: Date;
  endTime: Date;
  displayCurrentTime?: boolean;
  timeSlotStyle: React.CSSProperties;
  taskSlotStyle?: React.CSSProperties;
  timeTableStyle?: React.CSSProperties;
}

function TypeTimeTable({
  timeSlots,
  slotSize,
  timeSlotStyle,
  taskList,
  slotTime,
  displayCurrentTime,
  taskSlotStyle = {},
  timeTableStyle = {},
  height,
  startTime,
  endTime,
}: TypeTimeTableProps) {
  const uniqueTaskIdMap = new Map();
  const type = useContext(TypeContext);

  const currentTime = new Date();

  const isCurrentTimeVisible = timeSlots[0] <= currentTime && currentTime <= timeSlots[timeSlots.length - 1];
  return (
    <div className={generateClassNameWithType(styles, 'container', type)} style={timeTableStyle}>
      {displayCurrentTime && isCurrentTimeVisible && <CurrentTimeLine startTime={startTime} endTime={endTime} height={height} />}
      {timeSlots.map((time, index) => {
        const key = `${time.toDateString()}${index}`;
        const taskItemList = taskListFilter(taskList, time.getHours(), slotTime);
        const shouldDisplayTaskContentList: boolean[] = taskItemList.map((taskItem) => {
          const shouldDisplayTaskContent = !!(taskItem?.id && !hasKey(uniqueTaskIdMap, taskItem.id));
          insertKey(uniqueTaskIdMap, taskItem?.id, taskItem?.id);
          return shouldDisplayTaskContent;
        });

        return (
          <Slot
            key={key}
            headerDate={time}
            size={slotSize}
            timeSlotStyle={timeSlotStyle}
            shouldDisplayTaskContentList={shouldDisplayTaskContentList}
            slotTime={slotTime}
            taskItemList={taskItemList}
            taskSlotStyle={taskSlotStyle}
          />
        );
      })}
    </div>
  );
}

export default TypeTimeTable;
