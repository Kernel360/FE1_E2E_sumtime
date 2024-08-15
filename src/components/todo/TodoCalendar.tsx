import React from 'react';
import Box from '@mui/material/Box';
import { DateCalendar } from '@mui/x-date-pickers';

interface PropsType {
  isOpened: boolean;
  date: Date;
  setDate: (date: Date) => void;
  toggleOpen: () => void;
}

function TodoCalendar({ isOpened, date, setDate, toggleOpen }: PropsType) {
  return (
    <Box
      position="absolute"
      zIndex="1"
      bgcolor="white"
      top="84px"
      borderRadius={2}
      boxShadow="1px 1px 10px lightgray"
      display={isOpened ? 'block' : 'none'}
    >
      <DateCalendar
        defaultValue={new Date()}
        value={date}
        onChange={(value) => {
          setDate(value);
          toggleOpen();
        }}
      />
    </Box>
  );
}

export default TodoCalendar;
