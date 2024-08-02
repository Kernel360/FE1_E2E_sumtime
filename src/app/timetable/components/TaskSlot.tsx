import { add } from 'date-fns';
import { calculateTaskOffsetAndHeightPercent, getColor } from '../utils';
import styled from './Slot.module.scss';
import type { Task } from './Timetable.type';

interface TaskSlotProps {
  headerDate: Date;
  slotTime: number;
  taskItemList: Task[];
  shouldDisplayTaskContentList: boolean[];
}

function TaskSlot({ headerDate, slotTime, taskItemList, shouldDisplayTaskContentList }: TaskSlotProps) {
  if (taskItemList.length === 0) {
    return <div className={styled.taskSlotLayout} />;
  }

  const slotStartTime = headerDate;
  const slotEndTime = add(headerDate, { minutes: slotTime });

  return (
    <div className={styled.taskSlotLayout}>
      {taskItemList.map((taskItem, index) => {
        const { startTime, endTime, slotColor: taskColor, title, subTitle, id } = taskItem;
        const { offsetPercent, heightPercent } = calculateTaskOffsetAndHeightPercent(
          slotStartTime,
          slotEndTime,
          startTime,
          endTime,
          slotTime,
        );
        const shouldDisplayTaskContent = shouldDisplayTaskContentList[index];
        const key = `${startTime.toDateString()}${endTime.toDateString()}${title}${subTitle}`;
        const slotColor = taskColor ?? getColor(id);

        return (
          <div key={key}>
            <div
              className={styled.taskSlotBackground}
              style={{
                top: `${offsetPercent}%`,
                left: '0',
                height: `${heightPercent}%`,
                backgroundColor: `${slotColor}`,
              }}
            >
              {shouldDisplayTaskContent && (
                <div className={styled.taskSlotContent} style={{ top: `${offsetPercent}%` }}>
                  <p className={styled.title}>{title}</p>
                  <p className={styled.description}>{subTitle}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TaskSlot;
