import Timetable from '@/timetable/components/Timetable';
import { taskList, startTime, endTime, slotTime } from '@/timetable/mocks/timetableMockData';

export default function Home() {
  return (
    <>
      <div>sumday</div>
      <Timetable
        startTime={startTime}
        endTime={endTime}
        slotTime={slotTime}
        taskList={taskList}
        height="1400px"
        displayCurrentTime
        timetableType="COLUMN"
      />
    </>
  );
}
