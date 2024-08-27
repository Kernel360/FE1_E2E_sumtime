import * as React from 'react';
import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import useBooleanState from '@/hooks/utils/useBooleanState';
import useUpdateCategory from '@/api/hooks/categoryHooks/useUpdateCategory';
import { getCategoryList } from '@/api/queryFn/categoryQueryFn';
import useCreateCategory from '@/api/hooks/categoryHooks/useCreateCategory';
import { Input } from '../common';
import ColorPickerInput from '../ColorPickerBox/ColorPickerInput';
import * as S from '../ColorPickerBox/ColorPickerBox.styled';
import randomColor from 'randomcolor';

type Category = {
  id: number;
  title: string;
  color: string;
  isDisplayed?: number; // 사용시에 optional 처리
};

type EditingCategory = {
  title: string;
  color: string;
  isDisplayed: number; // 사용시에 optional 처리
};

export default function CategoryField() {
  // const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category>({ id: 0, title: '', color: '' });
  const [isEditingComplete, setEditingComplete] = useState(false);
  const { value: isEditing, toggle } = useBooleanState(false);
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: createCategory } = useCreateCategory();
  const [categoryToCreate, setCategoryToCreate] = useState<EditingCategory>();

  // useEffect(() => {
  //   // Fetch categories on component mount
  //   const fetchCategories = async () => {
  //     try {
  //       const categoriesData = await getCategoryList();
  //       setCategories(categoriesData);
  //     } catch (error) {
  //       console.error('Failed to fetch categories', error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const categoriesData = getCategoryList();
  console.log('categoriesData', categoriesData);

  const handleEdit = (id: number, title: string, color: string) => {
    setEditingCategory({ id, title, color });
    toggle();
  };

  const handleCompleteEdit = (id: number, title: string, color: string) => {
    if (id === 0 || !title) {
      console.error('Invalid category data');
      return;
    }

    setCategories(categories.map((category) => (category.id === id ? { id, title, color } : category)));

    updateCategory({ categoryId: id, createInfo: { title, color, isDisplayed: 0 } });
    console.log('Category updated');
    toggle();
    setEditingComplete(true);
  };

  // const validateCategoryData = (data) => {
  //   if (!data.title || !data.color) {
  //     throw new Error('Invalid category data');
  //   }
  //   // Additional validation if needed
  // };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('Key pressed:', e.key);

    if (e.key === 'Enter') {
      console.log('Enter key pressed, calling createCategory');

      // Prepare the category data
      const categoryData = {
        title: editingCategory.title,
        color: editingCategory.color,
        isDisplayed: 0,
      };
      console.log('categoryToCreate 얘가 body에 들어갈 것', categoryData);

      // Set the category data to create
      setCategoryToCreate(categoryData);
    }
  };

  const handleCategoryChange = (value: (string | Category)[]) => {
    console.log('뱌뀜? onCHange마다 바ss뀜?', value);
    const lastValue = value[value.length - 1];
    if (typeof lastValue === 'string') {
      console.log(value);
      // const newCategory = { id: categories.length + 1, title: lastValue, color: 'lightgray' };
      // setCategories([...categories, newCategory]);
      // setSelectedCategory([newCategory]);
    } else if (lastValue && !selectedCategory.includes(lastValue)) {
      setSelectedCategory([lastValue]); // Select only the last chosen category
    }
  };

  const handleSetCategoryColor = (newColor: string) => {
    // Update category color
    setEditingCategory({ ...editingCategory, color: newColor });
  };

  return (
    <Box sx={{ margin: '10px 0' }}>
      {/* Category Edit Box */}
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
                  bgcolor: '#f2f3f5', // Hover effect
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
          console.log('엔터 눌렸니?value', value);

          handleCategoryChange(value); //얜 엔터를 치면 간다.
        }}
        onKeyUp={handleKeyUp}
      />
      {/* Category update completion message */}
      {isEditingComplete && <S.ColorPickerEditedSpan $color="green">카테고리 수정 완료</S.ColorPickerEditedSpan>}
    </Box>
  );
}
