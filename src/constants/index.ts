// 필요할 때마다 현재 시간을 가져오도록

// export const getToday = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

import { toZonedTime } from 'date-fns-tz';

export const getToday = () => {
  const timeZone = 'Asia/Seoul'; // 서울 타임존
  const now = new Date();
  // UTC 시간을 서울 시간으로 변환
  return toZonedTime(now, timeZone);
};
export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
