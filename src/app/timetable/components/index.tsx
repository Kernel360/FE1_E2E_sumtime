'use client';

import { useCallback, useMemo } from 'react';
import { eachMinuteOfInterval } from 'date-fns';
import {
  parseSize,
  distributeSize,
  checkTaskListOverlap,
  generateClassNameWithType,
  selectTaskListByTimeRange,
  checkContentVisibleList,
  checkDateInRange,
} from '../utils';
import { PopoverType, BaseTask, TimetableType, TaskThemeType } from './Timetable.type';
import { ContextProvider } from '../contexts';
import CurrentTimeLine from './CurrentTimeLine';
import Slot from './Slot';
import styles from './Timetable.module.scss';

interface TimetableProps<T extends BaseTask> {
  startTime: Date;
  endTime: Date;
  slotTime: number;
  timeTableSize: string;
  timetableType: TimetableType;
  taskList: T[];
  displayCurrentTime?: boolean;
  defaultValue: string;
  currentTimeLineStyle?: string;
  popoverType?: PopoverType;
  timeTableStyle?: React.CSSProperties;
  timeSlotStyle?: React.CSSProperties;
  taskSlotStyle?: React.CSSProperties;
  slotStyle?: React.CSSProperties;
  taskTheme?: TaskThemeType;
}

function Timetable<T extends BaseTask>({
  startTime,
  endTime,
  slotTime,
  timeTableSize,
  timetableType,
  displayCurrentTime = false,
  taskList,
  popoverType = 'CLICK',
  timeTableStyle = { backgroundColor: 'white' },
  timeSlotStyle = { color: 'black' },
  taskSlotStyle = { color: 'black' },
  defaultValue,
  currentTimeLineStyle,
  taskTheme,
  slotStyle = {},
}: TimetableProps<T>) {
  const { value, format } = parseSize(timeTableSize);

  const timeSlots = eachMinuteOfInterval(
    {
      start: startTime,
      end: endTime,
    },
    { step: slotTime },
  );

  const slotSize = distributeSize(value, timeSlots.length, format);
  const uniqueTaskIdMap = new Map();
  const isCurrentTimeVisible = displayCurrentTime && checkDateInRange(timeSlots[0], new Date(), timeSlots[timeSlots.length - 1]);

  const contextValue = useMemo(
    () => ({
      defaultValue,
    }),
    [defaultValue],
  );

  const checkOverlapFromTaskList = useCallback((currentTaskList: T[]) => checkTaskListOverlap(currentTaskList), [taskList]);

  if (checkOverlapFromTaskList(taskList)) {
    throw new Error('task time is overlap. please check your taskList');
  }

  return (
    <ContextProvider timetableType={timetableType} popoverType={popoverType} contextValue={contextValue} taskTheme={taskTheme}>
      <div className={generateClassNameWithType(styles, 'container', timetableType)} style={timeTableStyle}>
        {isCurrentTimeVisible && (
          <CurrentTimeLine
            startTime={startTime}
            endTime={endTime}
            timeTableSize={timeTableSize}
            currentTimeLineStyle={currentTimeLineStyle}
          />
        )}
        {timeSlots.map((time, index) => {
          const key = `${time.toDateString()}${index}`;
          const taskItemList = selectTaskListByTimeRange(taskList, time.getHours(), slotTime);
          const shouldDisplayTaskContentList = checkContentVisibleList(taskItemList, uniqueTaskIdMap);

          return (
            <Slot
              key={key}
              headerDate={time}
              slotSize={slotSize}
              timeSlotStyle={timeSlotStyle}
              shouldDisplayTaskContentList={shouldDisplayTaskContentList}
              slotTime={slotTime}
              taskItemList={taskItemList}
              taskSlotStyle={taskSlotStyle}
              slotStyle={slotStyle}
            />
          );
        })}
      </div>
    </ContextProvider>
  );
}

export default Timetable;
