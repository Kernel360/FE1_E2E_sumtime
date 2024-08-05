'use client';

import Timetable from './components/Timetable';

import { taskList, startTime, endTime, slotTime } from './mocks/timetableMockData';

export default function TimetablePage() {
  return (
    <Timetable
      startTime={startTime}
      endTime={endTime}
      slotTime={60}
      taskList={taskList}
      height="2000px"
      timetableType="ROW"
      displayCurrentTime
      timeTableStyle={{ backgroundColor: 'black' }}
      timeSlotStyle={{ color: 'red' }}
      taskSlotStyle={{ color: 'white' }}
    />
  );
}

// slotTime
