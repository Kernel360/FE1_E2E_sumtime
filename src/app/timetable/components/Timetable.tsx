'use client';

import { useCallback } from 'react';
import { eachMinuteOfInterval } from 'date-fns';
import { parseSize, distributeSize, checkTimeOverlapFromTaskList } from '../utils';
import { Task, TimetableType } from './Timetable.type';
import TypeContext from '../TypeContext';
import TypeTimeTable from './TypeTimeTable';

interface TimetableProps {
  startTime: Date;
  endTime: Date;
  slotTime: number;
  timeTableSize: string;
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
  timeTableSize,
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
  const { value, format } = parseSize(timeTableSize);
  const slotSize = distributeSize(value, timeSlots.length, format);

  return (
    <TypeContext.Provider value={timetableType}>
      <TypeTimeTable
        timeSlots={timeSlots}
        slotSize={slotSize}
        taskList={taskList}
        slotTime={slotTime}
        displayCurrentTime={displayCurrentTime}
        timeSlotStyle={timeSlotStyle}
        taskSlotStyle={taskSlotStyle}
        timeTableStyle={timeTableStyle}
        size={timeTableSize}
        startTime={startTime}
        endTime={endTime}
      />
    </TypeContext.Provider>
  );
}

export default Timetable;
