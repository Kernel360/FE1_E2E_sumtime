import RowSlot from './RowSlot';
import { Task } from '../Timetable.type';
import styled from './RowTypeTimeTable.module.scss';
import { hasKey, insertKey } from '../../utils';

interface RowTypeTimeTableProps {
  timeSlots: Date[];
  width: string;
  slotWidth: string;
  taskList: Task[];
  slotTime: number;
  timeSlotStyle: React.CSSProperties;
  taskSlotStyle?: React.CSSProperties;
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

function RowTypeTimeTable({
  timeSlots,
  width,
  slotWidth,
  timeSlotStyle,
  taskList,
  slotTime,
  taskSlotStyle = {},
}: RowTypeTimeTableProps) {
  // console.log('timeSlots');
  // console.log(timeSlots);
  // console.log(`width: ${width} slotWidth: ${slotWidth} slotTime=${slotTime}`);
  const uniqueTaskIdMap = new Map();

  return (
    <div className={styled.container}>
      {timeSlots.map((time, index) => {
        const key = `${time.toDateString()}${index}`;
        const taskItemList = taskListFilter(taskList, time.getHours(), slotTime);
        const shouldDisplayTaskContentList: boolean[] = taskItemList.map((taskItem) => {
          const shouldDisplayTaskContent = !!(taskItem?.id && !hasKey(uniqueTaskIdMap, taskItem.id));
          insertKey(uniqueTaskIdMap, taskItem?.id, taskItem?.id);
          return shouldDisplayTaskContent;
        });

        return (
          <RowSlot
            key={key}
            headerDate={time}
            width={slotWidth}
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

export default RowTypeTimeTable;
