import { taskList } from '@/timetable/mocks/timetableMockData';
import Timetable from '@/timetable/components/Timetable';

export default function Home() {
  const data = new Date();

  console.log('page  sample', data.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
  return (
    <Timetable
      startTime={data}
      endTime={data}
      slotTime={60}
      height="800px"
      timetableType="COLUMN"
      displayCurrentTime
      taskList={taskList}
    />
  );
}
