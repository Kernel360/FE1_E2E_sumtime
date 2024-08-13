import { BaseTask } from '../components/Timetable.type';

const formatHourAndMinutes = (data: Date) => {
  // format하는 함수
  const hours = data.getHours();
  const minutes = data.getMinutes();
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const currentTime = minutes === 0 ? hours : `${hours}:${minutesFormat}`;

  return currentTime; // HH:MM
};

// 시간을 분단위로 바꿔버리고 더해주는 함수

const convertToMilliseconds = (date: Date) => {
  // 변환
  const hourToMilliseconds = date.getHours() * 60 * 60 * 1000;
  const minutesToMilliseconds = date.getMinutes() * 60 * 1000;
  const secondsToMilliseconds = date.getSeconds() * 1000;

  return hourToMilliseconds + minutesToMilliseconds + secondsToMilliseconds;
};

const calculateTargetPosition = (totalStartTime: Date, totalEndTime: Date, targetStartTime: Date, targetEndTime: Date) => {
  // 계산.
  const totalStartMilliseconds = convertToMilliseconds(totalStartTime);
  const totalEndMilliseconds = convertToMilliseconds(totalEndTime);
  const targetStartMilliseconds = convertToMilliseconds(targetStartTime);
  const targetEndMilliseconds = convertToMilliseconds(targetEndTime);
  const slotTime = totalEndMilliseconds - totalStartMilliseconds;
  let startPercent = 0;
  let totalEndPercent = 100;

  if (totalStartMilliseconds < targetStartMilliseconds) {
    // 슬롯의 시작시간보다 task의 시작 시간이 늦었다면(즉 slot 도중에 시작했다면)
    startPercent = ((targetStartMilliseconds - totalStartMilliseconds) / slotTime) * 100;
  }

  if (targetEndMilliseconds < totalEndMilliseconds) {
    // task의 끝나는 시간이 slot의 종료 시간보다 늦다면(즉 slot 도중에 끝난다면)
    totalEndPercent = ((targetEndMilliseconds - totalStartMilliseconds) / slotTime) * 100;
  }

  const endPercent = totalEndPercent - startPercent;

  return { startPercent, endPercent };
};

const checkTimeOverlap = (
  // 계산
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

const getDateFromTime = (hours: number, minutes: number, second: number) => {
  // mock data용으로 배포시 삭제 될 예정.
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = now.getDate().toString().padStart(2, '0');

  const yearMonthDay = `${year}-${month}-${day}`;
  const hourFormat = hours < 10 ? `0${hours}` : hours;
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const secondeFormat = second < 10 ? `0${second}` : second;

  return new Date(`${yearMonthDay}T${hourFormat}:${minutesFormat}:${secondeFormat}`);
};

const checkTaskListOverlap = <T extends BaseTask>(taskList: T[]) => {
  // 계산
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

const calculateCurrentTimePosition = (currentTime: Date | null, startTime: Date, endTime: Date) => {
  // 계산
  let currentTimePosition = 0;

  if (!currentTime) {
    return { currentTimePosition };
  }

  const currentMilliseconds = convertToMilliseconds(currentTime); // 현재 시간
  const startMilliseconds = convertToMilliseconds(startTime); // 슬롯의 시작 시간
  const endMilliseconds = convertToMilliseconds(endTime); // 슬롯의 종료 시간
  currentTimePosition = ((currentMilliseconds - startMilliseconds) / (endMilliseconds - startMilliseconds)) * 100;

  return { currentTimePosition };
};

const selectTaskListByTimeRange = <T extends BaseTask>(taskList: T[], startHour: number, timeRangeByMinutes: number): T[] =>
  // 계산
  taskList.filter((task: T) => {
    if (!task.startTime || !task.endTime) {
      return false;
    }

    const taskStartHour = task.startTime.getHours();
    const taskEndHour = task.endTime.getHours();
    const taskEndMinute = task.endTime.getMinutes();

    return (
      taskStartHour <= startHour &&
      taskEndHour >= startHour &&
      !(taskEndHour === startHour && taskEndMinute === timeRangeByMinutes % 60)
    );
  });

const checkDateInRange = (startDate: Date, date: Date, endDate: Date) => startDate <= date && date <= endDate;
// 계산

const getShouldDisplayTaskContentList = <T extends BaseTask>(
  // 여기서부터 다시 해야함 here todo
  taskItemList: T[],
  uniqueTaskIdMap: Map<unknown, unknown>,
): boolean[] =>
  taskItemList.map((taskItem) => {
    const shouldDisplayTaskContent = !!(taskItem?.id && !uniqueTaskIdMap.has(taskItem.id));
    if (taskItem?.id) {
      uniqueTaskIdMap.set(taskItem.id, taskItem.id);
    }
    return shouldDisplayTaskContent;
  });

export {
  formatHourAndMinutes,
  calculateTargetPosition,
  checkTimeOverlap,
  getDateFromTime,
  checkTaskListOverlap,
  calculateCurrentTimePosition,
  selectTaskListByTimeRange,
  checkDateInRange,
  getShouldDisplayTaskContentList,
};

export { hasKey, insertKey } from './map';
export { distributeSize, isFormatString, parseSize, parseSizeFormat, parseSizeValue } from './height';
export { getRandomColor, getTaskColor } from './color';
export { generateClassNameWithType } from './css';
