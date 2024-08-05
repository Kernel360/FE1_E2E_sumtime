/* eslint-disable react/jsx-props-no-spreading */
import { flip, offset, useClick, useDismiss, useFloating, useInteractions, useMergeRefs } from '@floating-ui/react';
import { calculateTaskOffsetAndHeightPercent, getColor } from '../utils';
import { Task } from './Timetable.type';
import styled from './Slot.module.scss';
import './reset.css';

interface TaskSlotItemProps {
  taskItem: Task;
  index: number;
  shouldDisplayTaskContentList: boolean[];
  slotStartTime: Date;
  slotEndTime: Date;
  slotTime: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function TaskSlotItem({
  taskItem,
  index,
  shouldDisplayTaskContentList,
  slotStartTime,
  slotEndTime,
  slotTime,
  isOpen,
  onOpenChange,
}: TaskSlotItemProps) {
  const { startTime, endTime, taskColor, title, subTitle, id } = taskItem;

  const {
    refs: menuRefs,
    floatingStyles: menuFloatingStyles,
    context: menuContext,
  } = useFloating({
    open: isOpen,
    onOpenChange,
    middleware: [offset({ mainAxis: 0, crossAxis: 400 }), flip()],
  });

  const { getReferenceProps: getMenuReferenceProps, getFloatingProps: getMenuFloatingProps } = useInteractions([
    useClick(menuContext),
    useDismiss(menuContext),
  ]);

  const ref = useMergeRefs([menuRefs.setReference]);

  const props = getMenuReferenceProps();

  const { offsetPercent, heightPercent } = calculateTaskOffsetAndHeightPercent(
    slotStartTime,
    slotEndTime,
    startTime,
    endTime,
    slotTime,
  );
  const shouldDisplayTaskContent = shouldDisplayTaskContentList[index];

  const key = `${startTime.toDateString()}${endTime.toDateString()}${title}${subTitle}`;
  const taskSlotColor = taskColor ?? getColor(id);
  return (
    <div key={key}>
      <button type="button" ref={ref} {...props} className={styled.buttonInherit}>
        <div
          className={styled.taskSlotBackground}
          style={{
            top: `${offsetPercent}%`,
            left: '0',
            height: `${heightPercent}%`,
            backgroundColor: `${taskSlotColor}`,
          }}
        >
          {shouldDisplayTaskContent && (
            <div className={styled.taskSlotContent} style={{ top: `${offsetPercent}%` }}>
              <p className={styled.title}>{title}</p>
              <p className={styled.description}>{subTitle}</p>
            </div>
          )}
        </div>
      </button>
      {shouldDisplayTaskContent && isOpen && (
        <div
          ref={menuRefs.setFloating}
          style={{
            ...menuFloatingStyles,
            background: 'white',
            border: '1px solid black',
            transform: 'none',
            padding: 30,
            zIndex: 100,
            top: `${offsetPercent}%`,
            // left: 0,
          }}
          {...getMenuFloatingProps()}
        >
          {title}
          {subTitle}
        </div>
      )}
    </div>
  );
}

export default TaskSlotItem;
