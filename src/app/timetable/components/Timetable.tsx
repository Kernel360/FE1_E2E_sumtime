'use client';

import { useCallback } from 'react';
import { eachMinuteOfInterval } from 'date-fns';
import { parseHeight, distributeHeight, hasKey, insertKey, checkTimeOverlapFromTaskList } from '../utils';
import styled from './Timetable.module.scss';
import RowSlot from './RowTypeTimeTable/Slot';
import CurrentTimeLine from './CurrentTimeLine';
import RowTypeTimeTable from './RowTypeTimeTable';
import { Task, TimetableType } from './Timetable.type';
import TypeContext from '../TypeContext';

interface TimetableProps {
  startTime: Date;
  endTime: Date;
  slotTime: number;
  height: string;
  timetableType: TimetableType;
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
  taskSlotStyle = { color: 'black' },
}: TimetableProps) {
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
    <TypeContext.Provider value={timetableType}>
      <RowTypeTimeTable
        timeSlots={timeSlots}
        width={height}
        slotWidth={slotHeight}
        taskList={taskList}
        timeSlotStyle={timeSlotStyle}
        slotTime={slotTime}
        taskSlotStyle={taskSlotStyle}
        timeTableStyle={timeTableStyle}
      />
    </TypeContext.Provider>
  );

  // if (timetableType === 'ROW') {
  //   return (
  //     <TypeContext.Provider value={timetableType}>
  //       <RowTypeTimeTable
  //         timeSlots={timeSlots}
  //         width={height}
  //         slotWidth={slotHeight}
  //         taskList={taskList}
  //         timeSlotStyle={timeSlotStyle}
  //         slotTime={slotTime}
  //         taskSlotStyle={taskSlotStyle}
  //         timeTableStyle={timeTableStyle}
  //       />
  //     </TypeContext.Provider>
  //   );
  // }

  return (
    <TypeContext.Provider value={timetableType}>
      <div className={styled.container} style={timeTableStyle}>
        {/* {displayCurrentTime && <CurrentTimeLine timeSlots={timeSlots.length} startTime={startTime} endTime={endTime} />} */}
        {timeSlots.map((time: Date, index) => {
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
              slotTime={slotTime}
              taskItemList={taskItemList}
              size={slotHeight}
              shouldDisplayTaskContentList={shouldDisplayTaskContentList}
              timeSlotStyle={timeSlotStyle}
              taskSlotStyle={taskSlotStyle}
            />
          );
        })}
      </div>
    </TypeContext.Provider>
  );
}

export default Timetable;
