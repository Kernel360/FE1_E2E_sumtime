import { useContext } from 'react';
import Slot from './Slot';
import { Task } from '../Timetable.type';
import { hasKey, insertKey } from '../../utils';
import TypeContext from '../../TypeContext';
import rowStyled from './RowTypeTimeTable.module.scss';
import styled from '../Timetable.module.scss';

interface TypeTimeTableProps {
  timeSlots: Date[];
  width: string;
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
  width,
  slotWidth,
  timeSlotStyle,
  taskList,
  slotTime,

  taskSlotStyle = {},
  timeTableStyle = {},
}: TypeTimeTableProps) {
  console.log(`width: ${width} slotWidth: ${slotWidth} slotTime=${slotTime}`);
  const uniqueTaskIdMap = new Map();

  const type = useContext(TypeContext);
  // console.log('RowTypeTimeTable', type);

  const styles = type === 'ROW' ? rowStyled : styled;

  return (
    <div className={styles.container} style={timeTableStyle}>
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
