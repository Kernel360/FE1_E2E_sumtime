import { add } from 'date-fns';
import { calculateTaskOffsetAndHeightPercent } from '@/timetable/utils';
import styled from './Slot.module.scss';
import type { Task } from './Timetable.type';

interface TaskSlotProps {
  headerDate: Date;
  slotTime: number;
  taskItem: Task | undefined;
}

function TaskSlot({ headerDate, slotTime, taskItem }: TaskSlotProps) {
  if (!taskItem) {
    return <div className={styled.taskSlotLayout} />;
  }

  const { startTime, endTime, slotColor, title, subTitle } = taskItem;

  const slotStartTime = headerDate;
  const slotEndTime = add(headerDate, { minutes: slotTime });

  const { offset, heightPercent } = calculateTaskOffsetAndHeightPercent(
    slotStartTime,
    slotEndTime,
    startTime,
    endTime,
    slotTime,
  );

  return (
    <div className={styled.taskSlotLayout}>
      <div
        className={styled.taskSlotBackground}
        style={{
          top: `${offset}%`,
          left: '0',
          height: `${heightPercent}%`,
          backgroundColor: `${slotColor}`,
        }}
      />
      <div className={styled.taskSlotContent}>
        <p className={styled.title}>{title}</p>
        <p className={styled.description}>{subTitle}</p>
      </div>
    </div>
  );
}

export default TaskSlot;
