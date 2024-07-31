'use client';

import { eachMinuteOfInterval, endOfDay, startOfDay } from 'date-fns';
import styled from '.Timetable.module.scss';

interface TimetableProps {
  startTime: Date;
  endTime: Date;
  slotTime: number;
  height: string;
  timetableType: 'CURCLE' | 'ROW' | 'COLUMN';
  displayCurrentTime: boolean;
  taskList: Task[];
}

interface Task {
  id: number;
  title: string;
  subTitle: string;
  slotColor: string;
  startTime: Date;
  endTime: Date;
}

const taskListFilter = (taskListInput: Task[], checkHour: number, slotTimeInput: number) => {
  taskListInput.filter(task => {
    const taskStartHour = task.startTime.getHours();
    const taskEndHour = task.endTime.getHours();
    const taskEndMinute = task.endTime.getMinutes();

    return (
      taskStartHour <= checkHour &&
      taskEndHour >= checkHour &&
      !(taskEndHour === checkHour && taskEndMinute === slotTimeInput)
    );
  });
};

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

  const timeSlots = eachMinuteOfInterval(
    {
      start: startTimeDateObject,
      end: endTimeDateObject,
    },
    { step: slotTime },
  );

  const filteredTasks = taskListFilter(taskList, 17, slotTime); // 이게 slot으로 넘길 녀석
  console.log('filteredTasks', filteredTasks);
  return (
    <div>
      <div className={styled.container}>
        <h1>Timetable</h1>
      </div>
      <div>
        {timeSlots.map((time: Date, index: number) => (
          <div key={`${time.toString()}${index}`}>
            {time.getHours()}
            {time.getMinutes()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timetable;
