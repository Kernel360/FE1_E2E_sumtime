import { add } from 'date-fns';
import { useContext, useState } from 'react';
import TaskSlotItem from './TaskSlotItem';
import { Task } from '../Timetable.type';
import rowStyled from './RowTypeTimeTable.module.scss';
import styled from '../Slot.module.scss';
import TypeContext from '../../TypeContext';

interface TaskSlotProps {
  headerDate: Date;
  slotTime: number;
  taskItemList: Task[];
  shouldDisplayTaskContentList: boolean[];
  taskSlotStyle: React.CSSProperties;
}
function TaskSlot({ headerDate, slotTime, taskItemList, shouldDisplayTaskContentList, taskSlotStyle = {} }: TaskSlotProps) {
  const [openTaskIndex, setOpenTaskIndex] = useState<number | null>(null);
  const type = useContext(TypeContext);

  const handleOpenChange = (index: number, isOpen: boolean) => {
    setOpenTaskIndex(isOpen ? index : null);
  };

  if (taskItemList.length === 0) {
    return <div className={styled.taskSlotLayout} />;
  }

  const slotStartTime = headerDate;
  const slotEndTime = add(headerDate, { minutes: slotTime });

  const styles = type === 'ROW' ? rowStyled : styled;

  return (
    <div className={styles.taskSlotLayout} style={taskSlotStyle}>
      {taskItemList.map((taskItem, index) => (
        <TaskSlotItem
          key={taskItem.id}
          taskItem={taskItem}
          index={index}
          slotStartTime={slotStartTime}
          slotEndTime={slotEndTime}
          slotTime={slotTime}
          shouldDisplayTaskContentList={shouldDisplayTaskContentList}
          isOpen={openTaskIndex === index}
          onOpenChange={(isOpen) => handleOpenChange(index, isOpen)}
        />
      ))}
    </div>
  );
}

export default TaskSlot;
