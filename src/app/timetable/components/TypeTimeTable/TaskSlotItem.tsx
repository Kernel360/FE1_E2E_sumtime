/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import usePopoverFloating from '../../hooks/usePopoverFloating';
import { calculateTaskOffsetAndHeightPercent, generateClassNameWithType, getRandomColor, getTaskColor } from '../../utils';
import { BaseTask } from '../Timetable.type';
import { TypeContext, PopoverTypeContext, TaskSlotContext, TaskThemeContext } from '../../contexts';
import styles from './TypeTimeTable.module.scss';
import closeImage from '../../assets/close.png';
import scheduleImage from '../../assets/schedule.png';

interface TaskSlotItemProps<T extends BaseTask> {
  taskItem: T;
  index: number;
  shouldDisplayTaskContent: boolean;
  slotStartTime: Date;
  slotEndTime: Date;
  slotTime: number;
}

const text =
  '국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다. 모든 국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다.이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다.';

function TaskSlotItem<T extends BaseTask>({
  taskItem,
  shouldDisplayTaskContent,
  slotStartTime,
  slotEndTime,
  slotTime,
}: TaskSlotItemProps<T>) {
  const { startTime, endTime, title, content } = taskItem;
  const taskSlotRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const type = useContext(TypeContext);
  const taskOption = useContext(TaskSlotContext);
  const popoverType = useContext(PopoverTypeContext);
  const taskColorTheme = useContext(TaskThemeContext);

  const {
    refs,
    fixFloatingTargetPosition,
    floatingStyles,
    getFloatingProps,
    getReferenceProps,
    isFloatingTargetVisible,
    hidePopover,
  } = usePopoverFloating(popoverType);

  if (!startTime || !endTime) {
    return null;
  }

  const { offsetPercent, heightPercent } = calculateTaskOffsetAndHeightPercent(
    slotStartTime,
    slotEndTime,
    startTime,
    endTime,
    slotTime,
  );

  const taskSlotColor = getTaskColor(taskItem) ?? getRandomColor(taskItem, taskColorTheme);

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
        onClick={fixFloatingTargetPosition}
      >
        <div ref={taskSlotRef} className={generateClassNameWithType(styles, 'taskSlotBackground', type)}>
          {shouldDisplayTaskContent && isContentVisible && (
            <div className={generateClassNameWithType(styles, 'taskSlotContent', type)}>
              <p className={generateClassNameWithType(styles, 'title', type)}>{title}</p>
            </div>
          )}
          {shouldDisplayTaskContent && !isContentVisible && (
            <div className={generateClassNameWithType(styles, 'taskSlotContent', type)}>
              <p className={generateClassNameWithType(styles, 'title', type)}>{taskOption.defaultValue}</p>
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
          }}
          className={styles.popoverLayout}
        >
          <div className={styles.buttonLayout}>
            <button type="button" onClick={hidePopover} className={styles.closeButton}>
              <img src={closeImage.src} alt="close button" />
            </button>
          </div>
          <div className={styles.popoverTitle}>{title}</div>
          <div className={styles.scheduleLayout}>
            <img src={scheduleImage.src} alt="close button" className={styles.scheduleIcon} />
            <p className={styles.scheduleContent}>
              {format(startTime, "hh':'mm")} - {format(endTime, "hh':'mm")}
            </p>
          </div>
          {content && <div style={{ marginTop: '10px', fontSize: '14px' }}>{text}</div>}
        </div>
      )}
    </div>
  );
}

export default TaskSlotItem;
