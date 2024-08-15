'use client';

import Timetable from '@/app/timetable/components';
import { startTime, endTime } from '@/app/timetable/mocks/timetableMockData';
import { useContext } from 'react';
import { TodoContext } from '@/context/TodoContext';
import { convertTodosForTimetable } from '@/utils/convertTodosForTimetable';
import * as S from './TimeTable.styled';

function TimeTable() {
  const { todoListData } = useContext(TodoContext);
  const allTodosForTimetable = convertTodosForTimetable(todoListData);
  return (
    <S.TimeTableSection>
      {allTodosForTimetable && (
        <Timetable
          totalStartTime={startTime}
          totalEndTime={endTime}
          slotRange={60}
          taskList={allTodosForTimetable}
          timeTableSize="2000px"
          timetableDirection="COLUMN"
          displayCurrentTime
          ellipsisText="+"
          currentTimeLineStyle="dashed 1px red"
        />
      )}
    </S.TimeTableSection>
  );
}

export default TimeTable;
