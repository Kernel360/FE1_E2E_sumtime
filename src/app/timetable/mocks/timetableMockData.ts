const getDateFromTime = (hours: number, minutes: number, second: number) => {
  const yearMonthDay = '2024-08-02';

  const hourFormat = hours < 10 ? `0${hours}` : hours;
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const secondeFormat = second < 10 ? `0${second}` : second;

  return new Date(`${yearMonthDay}T${hourFormat}:${minutesFormat}:${secondeFormat}`);
};

const startTime = getDateFromTime(0, 0, 1);
const endTime = getDateFromTime(23, 59, 59);
const slotTime = 60;
const height = '1000px';

const taskList = [
  {
    id: 1,
    title: 'title1',
    subTitle: 'subTitle1',
    slotColor: 'red',
    startTime: getDateFromTime(12, 0, 0),
    endTime: getDateFromTime(13, 0, 0),
  },
  {
    id: 2,
    title: 'title2',
    subTitle: 'subTitle2',
    slotColor: 'blue',
    startTime: getDateFromTime(15, 0, 0),
    endTime: getDateFromTime(16, 0, 0),
  },
  {
    id: 3,
    title: 'title3',
    subTitle: 'subTitle3',
    slotColor: 'purple',
    startTime: getDateFromTime(18, 0, 0),
    endTime: getDateFromTime(20, 0, 0),
  },
  {
    id: 5,
    title: '02:30',
    subTitle: '02:50',
    slotColor: 'green',
    startTime: getDateFromTime(2, 30, 0),
    endTime: getDateFromTime(2, 50, 0),
  },
  {
    id: 4,
    title: '01:00',
    subTitle: '02:20',
    slotColor: 'brown',
    startTime: getDateFromTime(1, 0, 0),
    endTime: getDateFromTime(2, 20, 0),
  },
];

export { startTime, endTime, taskList, slotTime, height };
