'use client';

import { eachMinuteOfInterval } from 'date-fns';
import { parseHeight, distributeHeight, hasKey, insertKey } from '../utils';
import styled from './Timetable.module.scss';
import Slot from './Slot';
import CurrentTimeLine from './CurrentTimeLine';

interface TimetableProps {
  startTime: Date;
  endTime: Date;
  slotTime: number;
  height: string;
  timetableType: 'CURCLE' | 'ROW' | 'COLUMN';
  displayCurrentTime: boolean;
  taskList: Task[];
}

interface Task {
  id: number;
  title: string;
  subTitle: string;
  slotColor: string;
  startTime: Date;
  endTime: Date;
}

const calculateSlotHeight = (height: string, totalSlots: number) => {
  // 각 slot의 높이를 계산하는 함수 (각 slot이 동일한 height를 가지고 있어야하기에)
  if (height.endsWith('px')) {
    // px 단위인 경우
    const totalHeightPx = parseInt(height, 10);
    return `${totalHeightPx / totalSlots}px`;
  }
  if (height.endsWith('%')) {
    // % 단위인 경우
    const totalHeightPercent = parseInt(height, 10);
    return `${totalHeightPercent / totalSlots}%`;
  }
  // 기본 높이 설정 (예: px)
  const defaultHeight = 1000; // px
  return `${defaultHeight / totalSlots}px`;
};

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

function Timetable({ startTime, endTime, slotTime, height, timetableType, displayCurrentTime, taskList }: TimetableProps) {
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
      <div className={styled.container} style={{ height }}>
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default Timetable;
