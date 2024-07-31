const getHourAndMinutesFormat = (data: Date) => {
  const hours = data.getHours();
  const minutes = data.getMinutes();
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const currentTime = minutes === 0 ? hours : `${hours}:${minutesFormat}`;

  return currentTime; // HH:MM
};

// 시간을 분단위로 바꿔버리고 더해주는 함수
const sumHoursAndMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes();

export { getHourAndMinutesFormat, sumHoursAndMinutes };
