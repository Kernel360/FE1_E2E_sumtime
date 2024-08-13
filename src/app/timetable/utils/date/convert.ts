const formatHourAndMinutes = (data: Date) => {
  const hours = data.getHours();
  const minutes = data.getMinutes();
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const currentTime = minutes === 0 ? hours : `${hours}:${minutesFormat}`;

  return currentTime; // HH:MM
};

const convertToMilliseconds = (date: Date) => {
  const hourToMilliseconds = date.getHours() * 60 * 60 * 1000;
  const minutesToMilliseconds = date.getMinutes() * 60 * 1000;
  const secondsToMilliseconds = date.getSeconds() * 1000;

  return hourToMilliseconds + minutesToMilliseconds + secondsToMilliseconds;
};

export { formatHourAndMinutes, convertToMilliseconds };
