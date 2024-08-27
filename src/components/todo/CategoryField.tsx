import * as React from 'react';
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { Input } from '../common';
import ColorPickerInput from '../ColorPickerBox/ColorPickerInput';
import * as S from '../ColorPickerBox/ColorPickerBox.styled';

type Category = {
  id: number;
  title: string;
  color: string;
};

export default function CategoryField() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, title: '식사', color: 'lightcoral' },
    { id: 2, title: '공부', color: 'lightblue' },
    { id: 3, title: '업무', color: 'lightgreen' },
    { id: 4, title: '휴식', color: 'lightpink' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category>({ id: 0, title: '', color: '' });
  const [isEditingComplete, setEditingComplete] = useState(false);
  const { value: isEditing, toggle } = useBooleanState(false);

  const handleEdit = (id: number, title: string, color: string) => {
    setEditingCategory({ id, title, color });
    toggle();
  };

  const handleCompleteEdit = (id: number, title: string, color: string) => {
    setCategories(categories.map((category) => (category.id === id ? { id, title, color } : category)));
    toggle();
    setEditingComplete(true);

    // timeout으로 수정완료 메시지 보여주기
    setTimeout(() => {
      setEditingComplete(false);
    }, 2000);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCompleteEdit(editingCategory.id, editingCategory.title, editingCategory.color);
    }
  };

  const handleCategoryChange = (value: (string | Category)[]) => {
    const lastValue = value[value.length - 1];
    if (typeof lastValue === 'string') {
      const newCategory = { id: categories.length + 1, title: lastValue, color: 'lightgray' };
      setCategories([...categories, newCategory]);
      setSelectedCategory([newCategory]);
    } else if (lastValue && !selectedCategory.includes(lastValue)) {
      setSelectedCategory([lastValue]); // 마지막으로 선택한 카테고리만 선택
    }
  };

  const handleSetCategoryColor = (newColor: string) => {
    // 카테고리 색깔 변경
    setEditingCategory({ ...editingCategory, color: newColor });
  };

  return (
    <Box sx={{ margin: '10px 0' }}>
      {/* 카테고리 수정 박스 */}
      <Box sx={{ display: isEditing ? 'flex' : 'none', position: 'relative', alignItems: 'center' }}>
        <S.ColorPickerBoxLayout $height="100%" $margin="0px 0px 0px 0px" $gap="10px" $alignItems="stretch">
          <S.LabelP>카테고리 수정</S.LabelP>
          <ColorPickerInput style={{ flex: 0.7 }} color={editingCategory.color} setColor={handleSetCategoryColor} />
          <Input
            style={{ flex: 8 }}
            value={editingCategory.title}
            onChange={(event) => setEditingCategory({ ...editingCategory, title: event.target.value })}
            onKeyUp={handleKeyUp}
          />
          <IconButton
            style={{ flex: 1 }}
            size="medium"
            color="default"
            onClick={() => handleCompleteEdit(editingCategory.id, editingCategory.title, editingCategory.color)}
          >
            <CheckCircleOutlinedIcon />
          </IconButton>
        </S.ColorPickerBoxLayout>
      </Box>

      <Autocomplete
        sx={{ display: isEditing ? 'none' : 'block' }}
        multiple
        freeSolo
        autoHighlight
        disableClearable
        limitTags={1}
        id="tags-outlined"
        options={categories}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
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
                onDelete={() => setSelectedCategory([])}
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
            <Box
              width="100%"
              height="36px"
              display="flex"
              alignItems="center"
              position="relative"
              sx={{
                '&:hover': {
                  bgcolor: '#f2f3f5', // 상위 Box가 hover될 때 살짝 어두워지게
                },
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: 1,
                  bgcolor: option.color,
                }}
              />
              <span
                {...props}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  margin: '0',
                }}
              >
                {option.title}
              </span>

              <Box position="absolute" right={8}>
                <IconButton
                  size="small"
                  sx={{ color: '#b3b3b3' }}
                  onClick={() => handleEdit(option.id, option.title, option.color)}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        )}
        onChange={(e, value) => {
          handleCategoryChange(value);
        }}
      />
      {/* 카테고리 수정 완료 메시지 */}
      {isEditingComplete && <S.ColorPickerEditedSpan $color="green">카테고리 수정 완료 </S.ColorPickerEditedSpan>}
    </Box>
  );
}
