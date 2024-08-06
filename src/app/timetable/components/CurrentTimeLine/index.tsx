import { useEffect, useState } from 'react';
import styled from './CurrentTimeLine.module.scss';
import { calculateCurrentTimeOffset, parseHeight } from '../../utils';

interface CurrentTimeLineProps {
  startTime: Date;
  endTime: Date;
  height: string;
}

function CurrentTimeLine({ startTime, endTime, height }: CurrentTimeLineProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  const { value, format } = parseHeight(height);

  // 여기서 전체 offset을 정리해서 두자.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 매 1분마다 현재 시간 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  const { offsetPercent } = calculateCurrentTimeOffset(currentTime, startTime, endTime);
  const test = (offsetPercent * value) / 100 + format;

  return (
    <div className={styled.currentTimeLine} style={{ top: test }}>
      <div className={styled.line} />
    </div>
  );
}

export default CurrentTimeLine;
