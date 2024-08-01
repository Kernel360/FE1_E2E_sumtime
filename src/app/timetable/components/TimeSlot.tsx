import { getHourAndMinutesFormat } from '@/app/timetable/utils';
import styled from './Slot.module.scss';

interface TimeSlotProps {
  headerDate: Date;
}

function TimeSlot({ headerDate }: TimeSlotProps) {
  const currentTime = getHourAndMinutesFormat(headerDate);
  return (
    <div className={`${styled.timeSlotLayout} ${styled.title}`}>
      <p className={styled.headerDate}>{currentTime}</p>
    </div>
  );
}

export default TimeSlot;
