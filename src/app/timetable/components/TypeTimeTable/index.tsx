import { useContext } from 'react';
import Slot from './Slot';
import { Task } from '../Timetable.type';
import { generateClassNameWithType, hasKey, insertKey } from '../../utils';
import TypeContext from '../../TypeContext';
import styles from './TypeTimeTable.module.scss';
import CurrentTimeLine from '../CurrentTimeLine';

interface TypeTimeTableProps {
  timeSlots: Date[];
  slotWidth: string;
  taskList: Task[];
  slotTime: number;
  displayCurrentTime?: boolean;
  timeSlotStyle: React.CSSProperties;
  taskSlotStyle?: React.CSSProperties;
  timeTableStyle?: React.CSSProperties;
  height: string;
}

const taskListFilter = (taskListInput: Task[], checkHour: number, slotTimeInput: number) =>
  taskListInput.filter((task: Task) => {
    const taskStartHour = task.startTime.getHours();
    const taskEndHour = task.endTime.getHours();
    const taskEndMinute = task.endTime.getMinutes();

    return (
      taskStartHour <= checkHour &&
      taskEndHour >= checkHour &&
      !(taskEndHour === checkHour && taskEndMinute === slotTimeInput % 60)
    );
  });

function TypeTimeTable({
  timeSlots,
  slotWidth,
  timeSlotStyle,
  taskList,
  slotTime,
  displayCurrentTime,
  taskSlotStyle = {},
  timeTableStyle = {},
  height,
}: TypeTimeTableProps) {
  const uniqueTaskIdMap = new Map();
  const type = useContext(TypeContext);

  const currentTime = new Date();

  const isCurrentTimeVisible = timeSlots[0] <= currentTime && currentTime <= timeSlots[timeSlots.length - 1];
  return (
    <div className={generateClassNameWithType(styles, 'container', type)} style={timeTableStyle}>
      {displayCurrentTime && isCurrentTimeVisible && (
        <CurrentTimeLine startTime={timeSlots[0]} endTime={timeSlots[timeSlots.length - 1]} height={height} />
      )}
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
            size={slotWidth}
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
