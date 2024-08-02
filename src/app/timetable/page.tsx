'use client';

import Timetable from './components/Timetable';

import { taskListWithoutSlotColor, taskList, startTime, endTime, slotTime } from './mocks/timetableMockData';

export default function TimetablePage() {
  return (
    <Timetable
      startTime={startTime}
      endTime={endTime}
      slotTime={slotTime}
      taskList={taskListWithoutSlotColor}
      height="1400px"
      displayCurrentTime
      timetableType="COLUMN"
      timeTableStyle={{ backgroundColor: 'black' }}
      timeSlotStyle={{ color: 'green' }}
      taskSlotStyle={{ color: 'red' }}
    />
  );
}
