import { add } from 'date-fns';
import { useState } from 'react';
import styled from './Slot.module.scss';
import type { Task } from './Timetable.type';

import TaskSlotItem from './TaskSlotItem';

interface TaskSlotProps {
  headerDate: Date;
  slotTime: number;
  taskItemList: Task[];
  shouldDisplayTaskContentList: boolean[];
}

function TaskSlot({ headerDate, slotTime, taskItemList, shouldDisplayTaskContentList }: TaskSlotProps) {
  const [openTaskIndex, setOpenTaskIndex] = useState<number | null>(null);

  const handleOpenChange = (index: number, isOpen: boolean) => {
    setOpenTaskIndex(isOpen ? index : null);
  };

  if (taskItemList.length === 0) {
    return <div className={styled.taskSlotLayout} />;
  }

  const slotStartTime = headerDate;
  const slotEndTime = add(headerDate, { minutes: slotTime });

  return (
    <div className={styled.taskSlotLayout}>
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
