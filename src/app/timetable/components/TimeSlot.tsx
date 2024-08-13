import { useContext } from 'react';
import styles from './Timetable.module.scss';
import { generateClassNameWithType, formatHourAndMinutes } from '../utils';
import { TypeContext } from '../contexts';

interface TimeSlotProps {
  headerDate: Date;
  timeSlotStyle: React.CSSProperties;
}

function TimeSlot({ headerDate, timeSlotStyle }: TimeSlotProps) {
  const type = useContext(TypeContext);
  const currentTime = formatHourAndMinutes(headerDate);
  const timeSlotLayout = generateClassNameWithType(styles, 'timeSlotLayout', type);
  const title = generateClassNameWithType(styles, 'title', type);

  return (
    <div className={`${timeSlotLayout} ${title}`} style={timeSlotStyle}>
      <p className={generateClassNameWithType(styles, 'headerDate', type)}>{currentTime}</p>
    </div>
  );
}

export default TimeSlot;
