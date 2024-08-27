import { hoursToMilliseconds, minutesToMilliseconds, secondsToMilliseconds } from 'date-fns';
import { BaseTask } from '@/utils/timetable/types';

const convertToMilliseconds = (date: Date) => {
  const hourMilliseconds = hoursToMilliseconds(date.getHours());
  const minutesMilliseconds = minutesToMilliseconds(date.getMinutes());
  const secondsMilliseconds = secondsToMilliseconds(date.getSeconds());

  return hourMilliseconds + minutesMilliseconds + secondsMilliseconds;
};

const checkTimeOverlap = (
  startTime1: Date | null,
  endTime1: Date | null,
  startTime2: Date | null,
  endTime2: Date | null,
): boolean => {
  if (!startTime1 || !endTime1 || !startTime2 || !endTime2) {
    return false;
  }
  const startTime1Milliseconds = convertToMilliseconds(startTime1);
  const endTime1Milliseconds = convertToMilliseconds(endTime1);
  const startTime2Milliseconds = convertToMilliseconds(startTime2);
  const endTime2Milliseconds = convertToMilliseconds(endTime2);

  return startTime1Milliseconds < endTime2Milliseconds && startTime2Milliseconds < endTime1Milliseconds;
};

const timeTableDateCalc = <T extends BaseTask>(taskList: T[]) => {
  let isOverlap = false;

  for (let i = 0; i < taskList.length; i += 1) {
    for (let j = i + 1; j < taskList.length; j += 1) {
      if (checkTimeOverlap(taskList[i].startTime, taskList[i].endTime, taskList[j].startTime, taskList[j].endTime)) {
        isOverlap = true;
        return isOverlap;
      }
    }
  }
  return false;
};

export { timeTableDateCalc, checkTimeOverlap };
