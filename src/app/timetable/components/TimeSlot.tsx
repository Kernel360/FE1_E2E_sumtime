import { useContext } from 'react';
import styles from './Timetable.module.scss';
import { getClassNameByType, formatHourAndMinutes } from '../utils';
import { TypeContext } from '../contexts';

interface TimeSlotProps {
  headerDate: Date;
  timeSlotStyle: React.CSSProperties;
}

function TimeSlot({ headerDate, timeSlotStyle }: TimeSlotProps) {
  const type = useContext(TypeContext);
  const currentTime = formatHourAndMinutes(headerDate);
  const timeSlotLayout = getClassNameByType(styles, 'timeSlotLayout', type);
  const title = getClassNameByType(styles, 'title', type);

  return (
    <div className={`${timeSlotLayout} ${title}`} style={timeSlotStyle}>
      <p className={getClassNameByType(styles, 'headerDate', type)}>{currentTime}</p>
    </div>
  );
}

export default TimeSlot;
