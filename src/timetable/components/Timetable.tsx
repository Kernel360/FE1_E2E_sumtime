import { eachMinuteOfInterval, endOfDay, startOfDay } from 'date-fns';
import styled from './Timetable.module.scss';

interface TimetableProps {
  startTime: Date;
  endTime: Date;
  slotTime: number;
  height: string;
  timetableType: 'CURCLE' | 'ROW' | 'COLUMN';
  displayCurrentTime: boolean;
  taskList: Task[];
}

// 타입 관련해서 nullable한 값 고려하기
interface Task {
  id: number;
  title: string;
  subTitle: string;
  slotColor: string;
  startTime: Date;
  endTime: Date;
}

function Timetable({
  startTime,
  endTime,
  slotTime,
  height,
  timetableType,
  displayCurrentTime,
  taskList,
}: TimetableProps) {
  const now = new Date();
  console.log(startTime, endTime, slotTime, height, timetableType, displayCurrentTime, taskList);
  // lint에러 막기 위한 console

  const startTimeDateObject = startOfDay(now); // 오늘의 시작 시간 (00:00)

  const endTimeDateObject = endOfDay(now); // 오늘의 끝 시간 (23:59)

  // const START_TIME = set(now, {
  //   // 시작 시작 시간을 찾는 것
  //   hours: 9,
  //   minutes: 0,
  //   seconds: 0,
  //   milliseconds: 0,
  // }); // 09:00
  // const END_TIME = set(now, {
  //   hours: 17,
  //   minutes: 0,
  //   seconds: 0,
  //   milliseconds: 0,
  // }); // 17:00

  const timeSlots = eachMinuteOfInterval(
    {
      start: startTimeDateObject,
      end: endTimeDateObject,
    },
    { step: slotTime },
  );

  const taskListFilter = (taskListInput: Task[], checkHour: number, slotTimeInput: number) =>
    taskListInput.filter(task => {
      // 작업의 시작 시간과 종료 시간을 24시간 형식으로 가져오기
      const taskStartHour = task.startTime.getHours();
      const taskEndHour = task.endTime.getHours();
      const taskEndMinute = task.endTime.getMinutes();

      // 필터링 조건
      // 시작 시간이 checkHour보다 작고 종료 시간이 checkHour보다 큰 작업
      // 종료 시간의 분(taskEndMinute)이 slotTimeInput과 같지 않은 경우를 제외
      return (
        taskStartHour <= checkHour &&
        taskEndHour >= checkHour &&
        !(taskEndHour === checkHour && taskEndMinute === slotTimeInput)
      );
    });

  console.log('taskListFiltertaskListFilter', taskListFilter(taskList, 17, slotTime)); // 이게 slot으로 넘길 녀석

  return (
    <div>
      <div className={styled.container}>
        <h1>Timetable</h1>
      </div>
      <div>
        {timeSlots.map(time => (
          // key 고려필요
          <div key={time}>{time.getHours()}</div>
        ))}
        {/* props => headerDate, soltTime, 필더링 된 taskitem?가 넘어올 예정. */}
      </div>
      {/* <div>
        {taskList.map(task => (
          <div key={task.id}>
            <p>{task.title}</p>
            <p>{task.subTitle}</p>
            <p>{task.slotColor}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Timetable;

// <Timetable
//   startTime={data}
//   endTime={data}
//   slotTime={30}
//   height="800px"
//   timetableType="COLUMN"
//   displayCurrentTime
//   taskList={taskList}
// />;
