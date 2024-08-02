import { flip, offset, useClick, useDismiss, useFloating, useInteractions, useMergeRefs } from '@floating-ui/react';
import { calculateTaskOffsetAndHeightPercent } from '../utils';
import { Task } from './Timetable.type';
import styled from './Slot.module.scss';

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
  const { startTime, endTime, slotColor, title, subTitle } = taskItem;

  const {
    refs: menuRefs,
    floatingStyles: menuFloatingStyles,
    context: menuContext,
  } = useFloating({
    open: isOpen,
    onOpenChange,
    // placement: 'right-start',
    middleware: [
      offset({ mainAxis: 0, crossAxis: 400 }),
      // shift({ padding: 0 }),
      flip(),
    ],
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

  return (
    <div key={key}>
      <button type="button" ref={ref} {...props}>
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
      </button>
      {isOpen && (
        <div
          ref={menuRefs.setFloating}
          style={{
            ...menuFloatingStyles,
            background: 'white',
            border: '1px solid black',
            padding: 30,
            zIndex: 100,
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