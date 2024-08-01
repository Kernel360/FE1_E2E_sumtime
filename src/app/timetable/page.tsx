'use client';

import Timetable from './components/Timetable';
import { taskList, startTime, endTime, slotTime } from './mocks/timetableMockData';

export default function Login() {
  return (
    <Timetable
      startTime={startTime}
      endTime={endTime}
      slotTime={slotTime}
      taskList={taskList}
      height="800px"
      displayCurrentTime
      timetableType="COLUMN"
    />
  );
}
