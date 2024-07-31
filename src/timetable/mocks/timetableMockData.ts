const getDateFromTime = (hours: number, minutes: number, second: number) => {
  const yearMonthDay = '2024-07-30';

  const hourFormat = hours < 10 ? `0${hours}` : hours;
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const secondeFormat = second < 10 ? `0${second}` : second;

  return new Date(`${yearMonthDay}T${hourFormat}:${minutesFormat}:${secondeFormat}`);
};

const startTime = getDateFromTime(0, 0, 1);
const endTime = getDateFromTime(23, 59, 59);
const slotTime = 60;

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
];

// const taskList = [
//   {
//     id: 1,
//     title: 'title1',
//     subTitle: 'subTitle1',
//     slotColor: 'red',
//     startTime: new Date('2024-07-31T06:30:00'),
//     endTime: new Date('2024-07-31T06:50:00'),
//   },
//   {
//     id: 2,
//     title: 'title2',
//     subTitle: 'subTitle2',
//     slotColor: 'blue',
//     startTime: new Date('2024-07-31T07:00:00'),
//     endTime: new Date('2024-07-31T07:30:00'),
//   },
//   {
//     id: 3,
//     title: 'title3',
//     subTitle: 'subTitle3',
//     slotColor: 'perple',
//     startTime: new Date('2024-07-31T07:40:00'),
//     endTime: new Date('2024-07-31T09:30:00'),
//   },
//   {
//     id: 4,
//     title: 'title4',
//     subTitle: 'subTitle4',
//     slotColor: 'yellow',
//     startTime: new Date('2024-07-31T11:00:00'),
//     endTime: new Date('2024-07-31T12:00:00'),
//   },
// ];

export { startTime, endTime, taskList, slotTime };
