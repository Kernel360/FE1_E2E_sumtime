import { useContext, useEffect, useState } from 'react';

import styled from './CurrentTimeLine.module.scss';
import { calculateCurrentTimeOffset, parseSize, generateClassNameWithType } from '../../utils';
import { TypeContext } from '../../contexts/TypeContext';

interface CurrentTimeLineProps {
  startTime: Date;
  endTime: Date;
  timeTableSize: string;
  currentTimeLineStyle?: string;
}

function CurrentTimeLine({ startTime, endTime, timeTableSize, currentTimeLineStyle }: CurrentTimeLineProps) {
  const type = useContext(TypeContext);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const { value, format } = parseSize(timeTableSize);

  // 여기서 전체 offset을 정리해서 두자.
  useEffect(() => {
    setCurrentTime(new Date());

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 매 1분마다 현재 시간 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  const { offsetPercent } = calculateCurrentTimeOffset(currentTime, startTime, endTime);
  const currentTimeLinePosition = `${(offsetPercent * value) / 100}${format}`;
  const dynamicStyle: React.CSSProperties = type === 'ROW' ? { left: currentTimeLinePosition } : { top: currentTimeLinePosition };

  const mergedStyle: React.CSSProperties = { ...dynamicStyle, ...{ border: currentTimeLineStyle } };

  return <hr className={generateClassNameWithType(styled, 'line', type)} style={mergedStyle} />;
}

export default CurrentTimeLine;
