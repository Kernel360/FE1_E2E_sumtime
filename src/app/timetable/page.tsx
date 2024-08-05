'use client';

import Timetable from './components/Timetable';
import { taskList, startTime, endTime, slotTime } from './mocks/timetableMockData';

export default function TimetablePage() {
  return (
    <div style={{ width: '800px' }}>
      <Timetable
        startTime={startTime}
        endTime={endTime}
        slotTime={slotTime}
        taskList={taskList}
        height="2000px"
        timetableType="ROW"
        // timetableType="COLUMN"
        displayCurrentTime
        timeTableStyle={{ backgroundColor: 'black' }}
        timeSlotStyle={{ color: 'red' }}
        taskSlotStyle={{ color: 'white' }}
      />
    </div>
  );
}
