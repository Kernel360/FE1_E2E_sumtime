import { useContext } from 'react';
import { getHourAndMinutesFormat } from '../../utils';
import rowStyled from './RowTypeTimeTable.module.scss';
import styled from '../Slot.module.scss';
import TypeContext from '../../TypeContext';

interface TimeSlotProps {
  headerDate: Date;
  timeSlotStyle: React.CSSProperties;
}

function TimeSlot({ headerDate, timeSlotStyle }: TimeSlotProps) {
  const type = useContext(TypeContext);
  const styles = type === 'ROW' ? rowStyled : styled;
  const currentTime = getHourAndMinutesFormat(headerDate);

  return (
    <div className={`${styles.timeSlotLayout} ${styles.title}`} style={timeSlotStyle}>
      <p className={styles.headerDate}>{currentTime}</p>
    </div>
  );
}

export default TimeSlot;
