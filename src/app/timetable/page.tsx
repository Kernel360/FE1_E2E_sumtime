'use client';

import Timetable from './components/Timetable';

import { taskList, startTime, endTime, slotTime } from './mocks/timetableMockData';

export default function TimetablePage() {
  return (
    <Timetable
      startTime={startTime}
      endTime={endTime}
      slotTime={slotTime}
      taskList={taskList}
      height="1400px"
      displayCurrentTime
      timetableType="COLUMN"
    />
  );
}
