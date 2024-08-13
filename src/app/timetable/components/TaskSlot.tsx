import { add } from 'date-fns';
import { useContext } from 'react';
import { BaseTask } from './Timetable.type';
import { TypeContext } from '../contexts';
import { getClassNameByType } from '../utils';
import styles from './Timetable.module.scss';
import TaskSlotItem from './TaskSlotItem';

interface TaskSlotProps<T extends BaseTask> {
  slotStartTime: Date;
  slotRange: number;
  taskItemList: T[];
  contentVisibleList: boolean[];
  taskSlotStyle: React.CSSProperties;
}

function TaskSlot<T extends BaseTask>({
  slotStartTime,
  slotRange,
  taskItemList,
  contentVisibleList,
  taskSlotStyle = {},
}: TaskSlotProps<T>) {
  const type = useContext(TypeContext);

  if (taskItemList.length === 0) {
    return <div className={getClassNameByType(styles, 'taskSlotLayout', type)} />;
  }

  const slotEndTime = add(slotStartTime, { minutes: slotRange });

  return (
    <div className={getClassNameByType(styles, 'taskSlotLayout', type)} style={taskSlotStyle}>
      {taskItemList.map((taskItem, index) => {
        const contentVisible = contentVisibleList[index];
        if (!taskItem.startTime || !taskItem.endTime) {
          return null;
        }
        return (
          <TaskSlotItem
            key={taskItem.id}
            taskItem={taskItem}
            slotStartTime={slotStartTime}
            slotEndTime={slotEndTime}
            contentVisible={contentVisible}
          />
        );
      })}
    </div>
  );
}

export default TaskSlot;
