import { add } from 'date-fns';
import { Task } from '../Timetable.type';
import styled from './RowTypeTimeTable.module.scss';
import { calculateTaskOffsetAndHeightPercent, getColor } from '../../utils';

interface TaskSlotProps {
  headerDate: Date;
  slotTime: number;
  taskItemList: Task[];
  shouldDisplayTaskContentList: boolean[];
  taskSlotStyle: React.CSSProperties;
}
function RowTaskSlot({ headerDate, slotTime, taskItemList, shouldDisplayTaskContentList, taskSlotStyle = {} }: TaskSlotProps) {
  console.log(taskItemList);

  if (taskItemList.length === 0) {
    console.log('length === 0');
    return <div className={styled.taskSlotLayout} />;
  }

  // console.log('taskItemList in:');
  // console.log(headerDate);
  // console.log(taskItemList);

  const slotStartTime = headerDate;
  const slotEndTime = add(headerDate, { minutes: slotTime });

  return (
    <div className={styled.taskSlotLayout} style={taskSlotStyle}>
      {taskItemList.map((taskItem, index) => {
        const { startTime, endTime, taskColor, title, subTitle, id } = taskItem;
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
          <div key={key} className={styled.taskSlotLayout}>
            <div
              className={styled.taskSlotBackground}
              style={{
                top: '0',
                left: `${offsetPercent}%`,
                width: `${heightPercent}%`,
                backgroundColor: `${slotColor}`,
              }}
            >
              {shouldDisplayTaskContent && (
                <div className={styled.taskSlotContent} style={{ left: `${offsetPercent}%` }}>
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

export default RowTaskSlot;
