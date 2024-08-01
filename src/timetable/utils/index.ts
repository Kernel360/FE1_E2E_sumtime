import { formatList as properFormatList } from '../constants';

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

const isFormatString = (formatType: string) => properFormatList.includes(formatType);

const parseHeightFormat = (heightWithFormat: string) => {
  const formatList = heightWithFormat.match(/[a-z%]+/);

  if (!formatList || formatList.length >= 2) {
    throw new Error('Unsupported format');
  }

  const format = formatList[0];

  if (!isFormatString(format)) {
    throw new Error('Unsupported format');
  }

  return format;
};

const parseHeightValue = (heightWithFormat: string) => {
  const value = parseFloat(heightWithFormat);

  if (Number.isNaN(value)) {
    throw new Error('No numeric value found in input');
  }

  return value;
};

const parseHeight = (heightWithFormat: string) => {
  const format = parseHeightFormat(heightWithFormat);
  const value = parseHeightValue(heightWithFormat);

  return { value, format };
};

const distributeHeight = (totalHeight: number, length: number, format: string = 'px') => {
  if (!isFormatString(format)) {
    throw new Error('wrong format');
  }

  if (length === 0 || totalHeight <= 0) {
    throw new Error('wrong number');
  }

  const height = totalHeight / length;
  return `${height}${format}`;
};

const hasKey = (map: Map<unknown, unknown>, key: unknown): boolean => {
  if (!key) {
    return false;
  }
  return map.has(key);
};

const insertKey = (map: Map<unknown, unknown>, key: unknown, value: unknown): void => {
  if (!key) {
    return;
  }
  map.set(key, value);
};

export {
  getHourAndMinutesFormat,
  sumHoursAndMinutes,
  calculateTaskOffsetAndHeightPercent,
  parseHeightFormat,
  parseHeightValue,
  parseHeight,
  distributeHeight,
  hasKey,
  insertKey,
};
