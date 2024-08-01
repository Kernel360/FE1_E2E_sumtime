import { add } from 'date-fns';
import { calculateTaskOffsetAndHeightPercent } from '@/timetable/utils';
import styled from './Slot.module.scss';
import type { Task } from './Timetable.type';

interface TaskSlotProps {
  headerDate: Date;
  slotTime: number;
  taskItem: Task | undefined;
  shouldDisplayTaskContent: boolean;
}

function TaskSlot({ headerDate, slotTime, taskItem, shouldDisplayTaskContent }: TaskSlotProps) {
  if (!taskItem) {
    return <div className={styled.taskSlotLayout} />;
  }

  const { startTime, endTime, slotColor, title, subTitle } = taskItem;

  const slotStartTime = headerDate;
  const slotEndTime = add(headerDate, { minutes: slotTime });

  const { offsetPercent, heightPercent } = calculateTaskOffsetAndHeightPercent(
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
          top: `${offsetPercent}%`,
          left: '0',
          height: `${heightPercent}%`,
          backgroundColor: `${slotColor}`,
        }}
      />
      {shouldDisplayTaskContent && (
        <div className={styled.taskSlotContent}>
          <p className={styled.title}>{title}</p>
          <p className={styled.description}>{subTitle}</p>
        </div>
      )}
    </div>
  );
}

export default TaskSlot;
