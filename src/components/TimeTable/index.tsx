'use client';

import Timetable from '@/app/timetable/components/Timetable';
import * as S from './TimeTable.styled';
import { taskListWithouttaskColor, startTime, endTime } from '../../app/timetable/mocks/timetableMockData';

function TimeTable() {
  return (
    <S.TimeTableSection>
      <Timetable
        startTime={startTime}
        endTime={endTime}
        slotTime={60}
        taskList={taskListWithouttaskColor}
        height="2000px"
        timetableType="COLUMN"
        displayCurrentTime
      />
    </S.TimeTableSection>
  );
}

export default TimeTable;
