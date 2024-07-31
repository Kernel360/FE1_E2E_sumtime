'use client';

import { eachMinuteOfInterval } from 'date-fns';
import styled from './Timetable.module.scss';
import Slot from './Slot';

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

const taskListFilter = (taskListInput: Task[], checkHour: number, slotTimeInput: number) =>
  taskListInput.filter((task: Task) => {
    const taskStartHour = task.startTime.getHours();
    const taskEndHour = task.endTime.getHours();
    const taskEndMinute = task.endTime.getMinutes();

    return (
      taskStartHour <= checkHour &&
      taskEndHour >= checkHour &&
      !(taskEndHour === checkHour && taskEndMinute === slotTimeInput % 60)
    );
  });

function Timetable({
  startTime,
  endTime,
  slotTime,
  height,
  timetableType,
  displayCurrentTime,
  taskList,
}: TimetableProps) {
  console.log(startTime, endTime, slotTime, height, timetableType, displayCurrentTime, taskList);
  // lint에러 막기 위한 console

  const timeSlots = eachMinuteOfInterval(
    {
      start: startTime,
      end: endTime,
    },
    { step: slotTime },
  );

  return (
    <div>
      <div className={styled.container}>
        <h1>Timetable</h1>
      </div>
      <div>
        {timeSlots.map((time: Date, index) => {
          const key = `${time.toDateString()}${index}`;

          const taskItem = taskListFilter(taskList, time.getHours(), slotTime)[0];

          return <Slot key={key} headerDate={time} slotTime={slotTime} taskItem={taskItem} />;
        })}
      </div>
    </div>
  );
}

export default Timetable;
