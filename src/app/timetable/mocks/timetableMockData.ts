import { getDateFromTime } from '../utils';

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
    startTime: getDateFromTime(2, 0, 0),
    endTime: getDateFromTime(3, 0, 0),
  },
  // {
  //   id: 2,
  //   title: 'title2',
  //   subTitle: 'subTitle2',
  //   slotColor: 'blue',
  //   startTime: getDateFromTime(15, 0, 0),
  //   endTime: getDateFromTime(16, 0, 0),
  // },
  // {
  //   id: 3,
  //   title: 'title3',
  //   subTitle: 'subTitle3',
  //   slotColor: 'purple',
  //   startTime: getDateFromTime(18, 0, 0),
  //   endTime: getDateFromTime(20, 0, 0),
  // },
  // {
  //   id: 5,
  //   title: '02:30',
  //   subTitle: '02:50',
  //   slotColor: 'green',
  //   startTime: getDateFromTime(2, 30, 0),
  //   endTime: getDateFromTime(2, 50, 0),
  // },
  // {
  //   id: 4,
  //   title: '01:00',
  //   subTitle: '02:20',
  //   slotColor: 'brown',
  //   startTime: getDateFromTime(1, 0, 0),
  //   endTime: getDateFromTime(2, 20, 0),
  // },
];

const duplicatedTimeTaskList = [
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
    startTime: getDateFromTime(12, 10, 0),
    endTime: getDateFromTime(12, 30, 0),
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
    startTime: getDateFromTime(17, 30, 0),
    endTime: getDateFromTime(18, 30, 0),
  },
  {
    id: 4,
    title: '01:00',
    subTitle: '02:20',
    slotColor: 'brown',
    startTime: getDateFromTime(19, 30, 0),
    endTime: getDateFromTime(21, 20, 0),
  },
];

const taskListWithoutSlotColor = [
  {
    id: 1,
    title: 'title1',
    subTitle: 'subTitle1',
    startTime: getDateFromTime(12, 0, 0),
    endTime: getDateFromTime(13, 0, 0),
  },
  {
    id: 2,
    title: 'title2',
    subTitle: 'subTitle2',
    startTime: getDateFromTime(15, 0, 0),
    endTime: getDateFromTime(16, 0, 0),
  },
  {
    id: 3,
    title: 'title3',
    subTitle: 'subTitle3',
    startTime: getDateFromTime(18, 0, 0),
    endTime: getDateFromTime(20, 0, 0),
  },
  {
    id: 5,
    title: '02:30',
    subTitle: '02:50',
    startTime: getDateFromTime(2, 30, 0),
    endTime: getDateFromTime(2, 50, 0),
  },
  {
    id: 4,
    title: '01:00',
    subTitle: '02:20',
    startTime: getDateFromTime(1, 0, 0),
    endTime: getDateFromTime(2, 20, 0),
  },
];

export { startTime, endTime, taskList, duplicatedTimeTaskList, slotTime, height, taskListWithoutSlotColor };
