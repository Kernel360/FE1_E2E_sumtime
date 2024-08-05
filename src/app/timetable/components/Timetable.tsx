'use client';

import { useCallback } from 'react';
import { eachMinuteOfInterval } from 'date-fns';
import { parseHeight, distributeHeight, checkTimeOverlapFromTaskList } from '../utils';
import { Task, TimetableType } from './Timetable.type';
import TypeContext from '../TypeContext';
import TypeTimeTable from './TypeTimeTable';

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

  console.log('displayCurrentTime', displayCurrentTime);

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

  return (
    <TypeContext.Provider value={timetableType}>
      <TypeTimeTable
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
}

export default Timetable;
