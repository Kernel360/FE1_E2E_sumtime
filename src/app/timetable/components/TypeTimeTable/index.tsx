import { useContext } from 'react';
import Slot from './Slot';
import { Task } from '../Timetable.type';
import { hasKey, insertKey, generateClassNameWithType } from '../../utils';
import TypeContext from '../../TypeContext';
import styles from './TypeTimeTable.module.scss';

interface TypeTimeTableProps {
  timeSlots: Date[];
  slotWidth: string;
  taskList: Task[];
  slotTime: number;
  timeSlotStyle: React.CSSProperties;
  taskSlotStyle?: React.CSSProperties;
  timeTableStyle?: React.CSSProperties;
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

  taskSlotStyle = {},
  timeTableStyle = {},
}: TypeTimeTableProps) {
  const uniqueTaskIdMap = new Map();
  const type = useContext(TypeContext);

  return (
    <div className={generateClassNameWithType(styles, 'container', type)} style={timeTableStyle}>
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
