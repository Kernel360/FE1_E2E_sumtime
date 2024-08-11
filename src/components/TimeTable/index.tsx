'use client';

import Timetable from '@/app/timetable/components/Timetable';
import { useGetAllTodos, useGetAllTodosForTimetable } from '@/app/apiTest/hooks/todoQueries';
import * as S from './TimeTable.styled';
import { startTime, endTime } from '../../app/timetable/mocks/timetableMockData';
// taskListWithouttaskColor
function TimeTable() {
  const { data: todoListData } = useGetAllTodos('1');
  const { data: getForTimetable } = useGetAllTodosForTimetable('1');
  console.log('getForTimetable', getForTimetable);
  console.log('todoListData', todoListData);

  return (
    <S.TimeTableSection>
      {getForTimetable && (
        <Timetable
          startTime={startTime}
          endTime={endTime}
          slotTime={60}
          taskList={getForTimetable}
          timeTableSize="2000px"
          timetableType="COLUMN"
          displayCurrentTime
          defaultValue="+"
          currentTimeLineStyle="dashed 1px red"
        />
      )}
    </S.TimeTableSection>
  );
}

export default TimeTable;
