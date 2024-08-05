/* eslint-disable react/jsx-props-no-spreading */
// popper.js를 사용함에 있어 스프레드 연산자를 통해 props를 전달하는 것이 필요합니다.
// 전체적으로 지켜지면 좋은 lint지만 라이브러리의 의존도로 해당 린트를 해결하기 어려워 파일에서만 비활성화 처리합니다.

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

  const taskSlotColor = taskColor ?? getColor(id);

  return (
    <div>
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
