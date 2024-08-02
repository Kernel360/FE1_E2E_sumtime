'use client';

import { useCallback } from 'react';
import { eachMinuteOfInterval } from 'date-fns';
import { parseHeight, distributeHeight, hasKey, insertKey, checkTimeOverlapFromTaskList } from '../utils';
import styled from './Timetable.module.scss';
import Slot from './Slot';
import CurrentTimeLine from './CurrentTimeLine';
import { Task } from './Timetable.type';

interface TimetableProps {
  startTime: Date;
  endTime: Date;
  slotTime: number;
  height: string;
  timetableType: 'CURCLE' | 'ROW' | 'COLUMN';
  displayCurrentTime?: boolean;
  taskList: Task[];
  timeTableStyle?: React.CSSProperties;
  timeSlotStyle?: React.CSSProperties;
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

function Timetable({
  startTime,
  endTime,
  slotTime,
  height,
  timetableType,
  displayCurrentTime = false,
  taskList,
  timeTableStyle = { backgroundColor: 'white' },
  timeSlotStyle = { color: 'black' },
  taskSlotStyle = { color: 'white' },
}: TimetableProps) {
  console.log(timetableType);

  const hasOverlapFromTaskList = useCallback(
    (currentTaskList: Task[]) => checkTimeOverlapFromTaskList(currentTaskList),
    [taskList],
  );

  if (hasOverlapFromTaskList(taskList)) {
    throw new Error('task time is overlap. please check your taskList');
  }

  const timeSlots = eachMinuteOfInterval(
    {
      start: startTime,
      end: endTime,
    },
    { step: slotTime },
  );
  const { value, format } = parseHeight(height);
  const slotHeight = distributeHeight(value, timeSlots.length, format);
  const uniqueTaskIdMap = new Map();

  return (
    <div>
      <div className={styled.container} style={{ ...timeTableStyle, height }}>
        {displayCurrentTime && <CurrentTimeLine timeSlots={timeSlots.length} startTime={startTime} endTime={endTime} />}
        {timeSlots.map((time: Date, index) => {
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
              slotTime={slotTime}
              taskItemList={taskItemList}
              height={slotHeight}
              shouldDisplayTaskContentList={shouldDisplayTaskContentList}
              timeSlotStyle={timeSlotStyle}
              taskSlotStyle={taskSlotStyle}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Timetable;
