import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const categories = [{ title: '미지정' }, { title: '식사' }, { title: '공부' }, { title: '업무' }, { title: '휴식' }];

export default function Tags() {
  const [selectedCategory, setSelectedCategory] = React.useState([categories[0]]);

  return (
    <Box>
      <Autocomplete
        multiple
        limitTags={1}
        id="tags-outlined"
        options={categories}
        getOptionLabel={(option) => option.title}
        defaultValue={[categories[0]]}
        value={selectedCategory}
        filterSelectedOptions
        ChipProps={{ sx: { background: 'lightcoral', color: 'white' } }}
        renderInput={(params) => <TextField {...params} label="카테고리" placeholder="카테고리 검색" />}
        onChange={(e, value) => setSelectedCategory(value)}
      />
    </Box>
  );
}
