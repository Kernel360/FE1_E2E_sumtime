import { add } from 'date-fns';
import { useState } from 'react';
import RowTaskSlotItem from './RowTaskSlotItem';
import { Task } from '../Timetable.type';
import styled from './RowTypeTimeTable.module.scss';

interface TaskSlotProps {
  headerDate: Date;
  slotTime: number;
  taskItemList: Task[];
  shouldDisplayTaskContentList: boolean[];
  taskSlotStyle: React.CSSProperties;
}
function RowTaskSlot({ headerDate, slotTime, taskItemList, shouldDisplayTaskContentList, taskSlotStyle = {} }: TaskSlotProps) {
  const [openTaskIndex, setOpenTaskIndex] = useState<number | null>(null);

  const handleOpenChange = (index: number, isOpen: boolean) => {
    setOpenTaskIndex(isOpen ? index : null);
  };

  if (taskItemList.length === 0) {
    return <div className={styled.taskSlotLayout} />;
  }

  // console.log('taskItemList in:');
  // console.log(headerDate);
  // console.log(taskItemList);

  const slotStartTime = headerDate;
  const slotEndTime = add(headerDate, { minutes: slotTime });

  return (
    <div className={styled.taskSlotLayout} style={taskSlotStyle}>
      {taskItemList.map((taskItem, index) => (
        <RowTaskSlotItem
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

export default RowTaskSlot;
