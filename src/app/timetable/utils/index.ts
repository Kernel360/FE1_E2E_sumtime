import { Task } from '../components/Timetable.type';

const getHourAndMinutesFormat = (data: Date) => {
  const hours = data.getHours();
  const minutes = data.getMinutes();
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const currentTime = minutes === 0 ? hours : `${hours}:${minutesFormat}`;

  return currentTime; // HH:MM
};

// 시간을 분단위로 바꿔버리고 더해주는 함수
const sumHoursAndMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes();

const calculateTaskOffsetAndHeightPercent = (
  slotStartTime: Date,
  slotEndTime: Date,
  taskStartTime: Date,
  taskEndTime: Date,
  slotTime: number,
) => {
  const slotStartMinutes = sumHoursAndMinutes(slotStartTime);
  const slotEndMinutes = sumHoursAndMinutes(slotEndTime);
  const taskStartMinutes = sumHoursAndMinutes(taskStartTime);
  const taskEndMinutes = sumHoursAndMinutes(taskEndTime);

  let offsetPercent = 0;
  let endPercent = 100;

  if (slotStartMinutes < taskStartMinutes) {
    // 슬롯의 시작시간보다 task의 시작 시간이 늦었다면(즉 slot 도중에 시작했다면)
    offsetPercent = ((taskStartMinutes - slotStartMinutes) / slotTime) * 100;
  }

  if (taskEndMinutes < slotEndMinutes) {
    // task의 끝나는 시간이 slot의 종료 시간보다 늦다면(즉 slot 도중에 끝난다면)
    endPercent = ((taskEndMinutes - slotStartMinutes) / slotTime) * 100;
  }

  const heightPercent = endPercent - offsetPercent;

  return { offsetPercent, heightPercent };
};

const isTimeOverlap = (startTime1: Date, endTime1: Date, startTime2: Date, endTime2: Date): boolean => {
  const startTime1Minutes = sumHoursAndMinutes(startTime1);
  const endTime1Minutes = sumHoursAndMinutes(endTime1);
  const startTime2Minutes = sumHoursAndMinutes(startTime2);
  const endTime2Minutes = sumHoursAndMinutes(endTime2);

  return startTime1Minutes < endTime2Minutes && startTime2Minutes < endTime1Minutes;
};

const getDateFromTime = (hours: number, minutes: number, second: number) => {
  const yearMonthDay = '2024-08-06';

  const hourFormat = hours < 10 ? `0${hours}` : hours;
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const secondeFormat = second < 10 ? `0${second}` : second;

  return new Date(`${yearMonthDay}T${hourFormat}:${minutesFormat}:${secondeFormat}`);
};

const checkTimeOverlapFromTaskList = (taskList: Task[]) => {
  let isOverlap = false;

  for (let i = 0; i < taskList.length; i += 1) {
    for (let j = i + 1; j < taskList.length; j += 1) {
      if (isTimeOverlap(taskList[i].startTime, taskList[i].endTime, taskList[j].startTime, taskList[j].endTime)) {
        isOverlap = true;
        return isOverlap;
      }
    }
  }

  return false;
};

const calculateCurrentTimeOffset = (currentTime: Date, slotStartTime: Date, endTime: Date) => {
  let offsetPercent = 0;

  const currentMinutes = sumHoursAndMinutes(currentTime); // 현재 시간
  const slotStartMinutes = sumHoursAndMinutes(slotStartTime); // 슬롯의 시작 시간
  const slotEndMinutes = sumHoursAndMinutes(endTime); // 슬롯의 종료 시간
  offsetPercent = ((currentMinutes - slotStartMinutes) / (slotEndMinutes - slotStartMinutes)) * 100;

  return { offsetPercent };
};

export {
  getHourAndMinutesFormat,
  sumHoursAndMinutes,
  calculateTaskOffsetAndHeightPercent,
  isTimeOverlap,
  getDateFromTime,
  checkTimeOverlapFromTaskList,
  calculateCurrentTimeOffset,
};

export { hasKey, insertKey } from './map';
export { distributeHeight, isFormatString, parseHeight, parseHeightFormat, parseHeightValue } from './height';
export { getColor } from './color';
