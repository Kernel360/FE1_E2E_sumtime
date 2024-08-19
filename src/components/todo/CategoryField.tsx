import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Category = {
  id: number;
  title: string;
  color: string;
};

const categories: Category[] = [
  { id: 1, title: '식사', color: 'lightcoral' },
  { id: 2, title: '공부', color: 'lightblue' },
  { id: 3, title: '업무', color: 'lightgreen' },
  { id: 4, title: '휴식', color: 'lightpink' },
];

export default function CategoryField() {
  const [selectedCategory, setSelectedCategory] = React.useState<Category[]>([]);
  const [editingCategoryId, setEditingCategoryId] = React.useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditingCategoryId(id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: number) => {
    setSelectedCategory((prev) =>
      prev.map((category) => (category.id === id ? { ...category, title: e.target.value } : category)),
    );
  };

  return (
    <Box sx={{ margin: '10px 0' }}>
      <Autocomplete
        disableClearable
        multiple
        limitTags={1}
        id="tags-outlined"
        options={categories}
        getOptionLabel={(option) => option.title}
        value={selectedCategory}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="카테고리" placeholder="카테고리 검색" />}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const tagProps = getTagProps({ index });
            return (
              <Chip
                key={tagProps.key}
                label={option.title}
                className={tagProps.className}
                onDelete={tagProps.onDelete}
                disabled={tagProps.disabled}
                tabIndex={tagProps.tabIndex}
                sx={{ background: option.color, color: 'white', borderRadius: '4px' }}
              />
            );
          })
        }
        renderOption={(props, option) => (
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            boxShadow="1px 1px 5px lightgray"
            margin="8px"
            borderRadius={1}
          >
            <Box width="100%" height="36px" display="flex" alignItems="center">
              <span
                {...props}
                style={{
                  display: editingCategoryId === option.id ? 'none' : 'block',
                  width: '100%',
                  height: '100%',
                  margin: '0',
                }}
              >
                {option.title}
              </span>
              <TextField
                focused
                size="small"
                sx={{ display: editingCategoryId === option.id ? 'block' : 'none', height: '40px' }}
                value={option.title}
                onChange={(e) => handleInputChange(e, option.id)}
              />
            </Box>
            <Box position="absolute" right={40}>
              <IconButton size="small" sx={{ color: '#b3b3b3' }} onClick={() => handleEdit(option.id)}>
                <EditIcon />
              </IconButton>
            </Box>
            <Box position="absolute" right={8}>
              <IconButton size="small" sx={{ color: '#b3b3b3' }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        )}
        onChange={(e, value: Category[]) => {
          if (value.length > 0) {
            setSelectedCategory([value[value.length - 1]]); // 마지막으로 선택한 카테고리만 선택
          } else {
            setSelectedCategory([]);
          }
        }}
      />
    </Box>
  );
}
