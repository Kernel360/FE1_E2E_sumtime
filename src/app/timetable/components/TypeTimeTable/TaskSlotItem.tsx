/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { flip, offset, useClick, useDismiss, useFloating, useInteractions, useMergeRefs } from '@floating-ui/react';
import { calculateTaskOffsetAndHeightPercent, getColor, generateClassNameWithType } from '../../utils';
import { Task } from '../Timetable.type';
import TypeContext from '../../TypeContext';
import styles from './TypeTimeTable.module.scss';

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
  const type = useContext(TypeContext);

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
  const taskSlotColor = taskColor ?? getColor(id);

  const positionStyles =
    type === 'ROW'
      ? { top: '0', left: `${offsetPercent}%`, width: `${heightPercent}%` }
      : { top: `${offsetPercent}%`, left: '0', height: `${heightPercent}%` };

  const floatingPositionStyles = type === 'ROW' ? { left: `${offsetPercent}%` } : { top: `${offsetPercent}%` };

  return (
    <div style={{ height: '100%' }}>
      <button type="button" ref={ref} {...props} className={generateClassNameWithType(styles, 'buttonInherit', type)}>
        <div
          className={generateClassNameWithType(styles, 'taskSlotBackground', type)}
          style={{
            ...positionStyles,
            backgroundColor: `${taskSlotColor}`,
          }}
        >
          {shouldDisplayTaskContent && ( // taskSlotContent
            <div className={generateClassNameWithType(styles, 'taskSlotContent', type)}>
              <p className={generateClassNameWithType(styles, 'title', type)}>{title}</p>
              <p className={generateClassNameWithType(styles, 'description', type)}>{subTitle}</p>
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
            ...floatingPositionStyles,
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
