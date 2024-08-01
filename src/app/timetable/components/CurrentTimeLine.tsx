import { useEffect, useState } from 'react';
import styled from './CurrentTImeLine.module.scss';
import { sumHoursAndMinutes } from '../utils';

interface CurrentTimeLineProps {
  timeSlots: number;
  startTime: Date;
  endTime: Date;
}

function CurrentTimeLine({ timeSlots, startTime, endTime }: CurrentTimeLineProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 매 1분마다 현재 시간 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  const currentMinutes = sumHoursAndMinutes(currentTime);
  const totalMinutes = timeSlots * 60;

  const topPosition = `${(currentMinutes / totalMinutes) * 100}%`;

  const isCurrentTimeVisible = currentTime >= startTime && currentTime <= endTime;

  return (
    isCurrentTimeVisible && (
      <div className={styled.currentTimeLine} style={{ top: topPosition }}>
        <div className={styled.line} />
      </div>
    )
  );
}

export default CurrentTimeLine;
