'use client';

import { eachMinuteOfInterval } from 'date-fns';
import { parseHeight, distributeHeight } from '../utils';
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

function Timetable({ startTime, endTime, slotTime, height, timetableType, displayCurrentTime, taskList }: TimetableProps) {
  // const now = new Date();
  console.log(timetableType, displayCurrentTime);
  // lint에러 막기 위한 console

  const timeSlots = eachMinuteOfInterval(
    {
      start: startTime,
      end: endTime,
    },
    { step: slotTime },
  );
  // const slotHeight = height / timeSlots.length();

  const { value, format } = parseHeight(height);
  const slotHeight = distributeHeight(value, timeSlots.length, format);

  return (
    <div>
      <div className={styled.container} style={{ height }}>
        {timeSlots.map((time: Date, index) => {
          const key = `${time.toDateString()}${index}`;

          return (
            <Slot
              key={key}
              headerDate={time}
              slotTime={slotTime}
              taskItem={taskListFilter(taskList, time.getHours(), slotTime)[0]}
              height={slotHeight}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Timetable;
