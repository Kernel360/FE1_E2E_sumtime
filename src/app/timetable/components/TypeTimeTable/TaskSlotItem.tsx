/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useRef, useEffect, useState } from 'react';
import { calculateTaskOffsetAndHeightPercent, getColor, generateClassNameWithType } from '../../utils';
import { useFloatingInReference } from '../../hooks';
import { Task } from '../Timetable.type';
import TypeContext from '../../TypeContext';
import styles from './TypeTimeTable.module.scss';

interface TaskSlotItemProps {
  taskItem: Task;
  index: number;
  shouldDisplayTaskContent: boolean;
  slotStartTime: Date;
  slotEndTime: Date;
  slotTime: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function TaskSlotItem({
  taskItem,
  shouldDisplayTaskContent,
  slotStartTime,
  slotEndTime,
  slotTime,
  isOpen,
  onOpenChange,
}: TaskSlotItemProps) {
  const { startTime, endTime, taskColor, title, subTitle, id } = taskItem;
  const taskSlotRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const defaultValue = '...'; // 이 부분이 이후에 Props로 전달 받아서 표현 될 내용이다.
  const type = useContext(TypeContext);
  const { isFloatingTargetVisible, refs, floatingStyles, getFloatingProps, getReferenceProps, onFloating } =
    useFloatingInReference();
  const { offsetPercent, heightPercent } = calculateTaskOffsetAndHeightPercent(
    slotStartTime,
    slotEndTime,
    startTime,
    endTime,
    slotTime,
  );
  const taskSlotColor = taskColor ?? getColor(id);
  const positionStyles =
    type === 'ROW'
      ? { top: '0', left: `${offsetPercent}%`, width: `${heightPercent}%` }
      : { top: `${offsetPercent}%`, left: '0', height: `${heightPercent}%` };

  useEffect(() => {
    if (type === 'ROW') {
      if (taskSlotRef.current) {
        const width = taskSlotRef.current.offsetWidth;
        setIsContentVisible(width > 40);
      }
    }
    if (type === 'COLUMN') {
      if (taskSlotRef.current) {
        const height = taskSlotRef.current.offsetHeight;
        setIsContentVisible(height > 40);
      }
    }
  }, [taskSlotRef.current, type]);

  return (
    <div>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps}
        className={generateClassNameWithType(styles, 'buttonInherit', type)}
        style={{
          ...positionStyles,
          backgroundColor: `${taskSlotColor}`,
        }}
        onClick={onFloating}
      >
        <div ref={taskSlotRef} className={generateClassNameWithType(styles, 'taskSlotBackground', type)}>
          {shouldDisplayTaskContent &&
            isContentVisible && ( // taskSlotContent
              <div className={generateClassNameWithType(styles, 'taskSlotContent', type)}>
                <p className={generateClassNameWithType(styles, 'title', type)}>{title}</p>
                <p className={generateClassNameWithType(styles, 'description', type)}>{subTitle}</p>
              </div>
            )}
          {shouldDisplayTaskContent &&
            !isContentVisible && ( // taskSlotContent
              <div className={generateClassNameWithType(styles, 'taskSlotContent', type)}>
                <p className={generateClassNameWithType(styles, 'title', type)}>{defaultValue}</p>
              </div>
            )}
        </div>
      </button>
      {isFloatingTargetVisible && (
        <div
          {...getFloatingProps()}
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            background: 'white',
            border: '1px solid black',
            padding: 30,
            zIndex: 100,
          }}
        >
          {title}
          {subTitle}
        </div>
      )}
    </div>
  );
}

export default TaskSlotItem;
