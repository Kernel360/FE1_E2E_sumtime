import { getHourAndMinutesFormat } from '../../utils';
import styled from './RowTypeTimeTable.module.scss';

interface TimeSlotProps {
  headerDate: Date;
  timeSlotStyle: React.CSSProperties;
}

function TimeSlot({ headerDate, timeSlotStyle }: TimeSlotProps) {
  const currentTime = getHourAndMinutesFormat(headerDate);

  return (
    <div className={`${styled.timeSlotLayout} ${styled.title}`} style={timeSlotStyle}>
      <p className={styled.headerDate}>{currentTime}</p>
    </div>
  );
}

export default TimeSlot;
