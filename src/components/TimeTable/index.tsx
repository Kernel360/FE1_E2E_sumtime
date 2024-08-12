'use client';

import Timetable from '@/app/timetable/components/Timetable';
import { useGetAllTodosForTimetable } from '@/api/hooks/todoHooks';
import * as S from './TimeTable.styled';
import { startTime, endTime } from '../../app/timetable/mocks/timetableMockData';

function TimeTable() {
  const { data: getForTimetable } = useGetAllTodosForTimetable(1);

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
