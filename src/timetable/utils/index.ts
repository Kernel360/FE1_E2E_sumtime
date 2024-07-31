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

  let offset = 0;
  let endPercent = 100;

  if (slotStartMinutes < taskStartMinutes) {
    // 슬롯의 시작시간보다 task의 시작 시간이 늦었다면(즉 slot 도중에 시작했다면)
    offset = ((taskStartMinutes - slotStartMinutes) / slotTime) * 100;
  }

  if (taskEndMinutes < slotEndMinutes) {
    // task의 끝나는 시간이 slot의 종료 시간보다 늦다면(즉 slot 도중에 끝난다면)
    endPercent = ((taskEndMinutes - slotStartMinutes) / slotTime) * 100;
  }

  const heightPercent = endPercent - offset;

  return { offset, heightPercent };
};

export { getHourAndMinutesFormat, sumHoursAndMinutes, calculateTaskOffsetAndHeightPercent };
