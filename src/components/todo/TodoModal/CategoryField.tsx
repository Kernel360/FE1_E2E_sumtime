import * as React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import {
  IconButton,
  Box,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  SelectChangeEvent,
  createFilterOptions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import useBooleanState from '@/hooks/utils/useBooleanState';
import useUpdateCategory from '@/api/hooks/categoryHooks/useUpdateCategory';
import useCreateCategory from '@/api/hooks/categoryHooks/useCreateCategory';
import randomColor from 'randomcolor';
import useGetCategoryList from '@/api/hooks/categoryHooks/useGetCategoryList';
import { Category } from '@/api/queryFn/categoryQueryFn';
import { Input } from '../../common';
import ColorPickerInput from '../../ColorPickerBox/ColorPickerInput';
import * as ColorPickerBoxStyle from '../../ColorPickerBox/ColorPickerBox.styled';
import * as Style from './TodoModal.styled';
import UpdateCategoryColorButton from './UpdateCategoryColorButton';

const S = { ...ColorPickerBoxStyle, ...Style };

type EditType = 'add' | 'update' | 'read';

type EditCategoryType = {
  title: string;
  color?: string | null;
  editType?: EditType;
  id?: number;
  isDisplayed?: number | null;
  isDefault?: number;
};

interface CategoryFieldProps {
  categoryId: number;
  setCategoryId: Dispatch<SetStateAction<number | undefined>>;
}

const filter = createFilterOptions<EditCategoryType>();

export default function CategoryField({ categoryId, setCategoryId }: CategoryFieldProps) {
  // const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingCategory, setEditingCategory] = useState<EditCategoryType>();
  const [isEditingComplete, setEditingComplete] = useState(false);
  const { value: isEditing, toggle } = useBooleanState(false);
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: createCategory } = useCreateCategory();
  const categoryList = useGetCategoryList();
  const selectedCategory = categoryList?.find((category) => category.id === categoryId);
  const filteredCategoryList = categoryList?.map(({ userId, isDefault, ...rest }) => rest);
  const editCategoryList: EditCategoryType[] | undefined = categoryList?.map((category) => ({
    title: category.title,
    color: category.color,
    editType: 'read',
    id: category.id,
    isDisplayed: category.isDisplayed,
    isDefault: category.isDefault,
  }));

  // const handleEdit = (id: number, title: string, color: string, isDisplayed: number) => {
  //   setEditingCategory({ id, title, color, isDisplayed });
  //   toggle();
  // };

  const handleCompleteEdit = (id: number, title: string, color: string) => {
    if (id === 0 || !title) {
      console.error('Invalid category data');
      return;
    }

    updateCategory({ categoryId: id, createInfo: { title, color, isDisplayed: 0 } });

    toggle();
    setEditingComplete(true);
  };

  const submitCategoryChange = (value: (string | Category)[]) => {
    const lastValue = value[value.length - 1];

    if (typeof lastValue === 'string') {
      // 사용자가 키보드를 통해서 카테고리를 생성할 떄 진행되는 코드
      createCategory({ title: lastValue, color: randomColor(), isDisplayed: 0 });
      return;
    }

    if (lastValue && !selectedCategory.includes(lastValue)) {
      // Option을 선택할 때 진행되는 코드
      console.log('lastValue lastValue && !selectedCategory.includes(lastValue)', lastValue);
      setSelectedCategory([lastValue]); // Select only the last chosen category
    }
  };

  // const handleSetCategoryColor = (newColor: string) => {
  //   setEditingCategory({ ...editingCategory, color: newColor });
  // };

  const changeCategory = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    setCategoryId(value);
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLButtonElement> | React.PointerEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    categoryList && (
      <Box sx={{ margin: '10px 0' }}>
        {/* <Box sx={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
          <S.ColorPickerBoxLayout $height="100%" $margin="0px 0px 0px 0px" $gap="10px" $alignItems="stretch">
            <S.LabelP>카테고리 수정</S.LabelP>
            <ColorPickerInput style={{ flex: 0.7 }} color={editingCategory.color || ''} setColor={handleSetCategoryColor} />
            <Input
              style={{ flex: 8 }}
              value={editingCategory.title}
              onChange={(event) => setEditingCategory({ ...editingCategory, title: event.target.value })}
            />
            <IconButton
              style={{ flex: 1 }}
              size="medium"
              color="default"
              onClick={() => handleCompleteEdit(editingCategory.id, editingCategory.title, editingCategory.color || '')}
            >
              <CheckCircleOutlinedIcon />
            </IconButton>
          </S.ColorPickerBoxLayout>
        </Box> */}

        {isEdit && editCategoryList && (
          <Autocomplete
            value={editingCategory}
            // 아래 onChange는 value의 값을 변경했을 때가 아닌 enter를 쳤을 때의 콜백이 호출된다.
            onChange={(event, newValue) => {
              // console.log('newValue', newValue);

              if (!newValue) {
                return;
              }

              if (typeof newValue === 'string') {
                const color = randomColor();
                console.log('string, ', {
                  title: newValue,
                  color,
                });

                createCategory(
                  { title: newValue, color, isDisplayed: 1 },
                  {
                    onSuccess: (data) => {
                      const { id } = data;
                      setCategoryId(id);
                      setEditingCategory({
                        ...data,
                      });
                    },
                  },
                );

                return;
              }

              // if (newValue?.inputValue) {
              //   console.log('newValue?.inputValue', {
              //     title: newValue?.inputValue,
              //     color: 'red',
              //   });

              //   setEditingCategory({
              //     title: newValue?.inputValue,
              //     color: 'red',
              //   });
              //   return;
              // }

              if (newValue.editType === 'add') {
                const title = newValue.title.replace('Add ', '');
                const color = randomColor();
                console.log('add category, ', {
                  title,
                  color,
                });

                createCategory(
                  { title, color, isDisplayed: 1 },
                  {
                    onSuccess: (data) => {
                      const { id } = data;
                      setCategoryId(id);

                      setEditingCategory({
                        ...data,
                      });
                    },
                  },
                );

                return;
              }

              if (newValue.editType === 'update' && editingCategory) {
                console.log('update work');
                console.log('editingCategory', editingCategory);
                const title = newValue.title.replace('Update ', '');
                const { id, isDisplayed, color } = editingCategory;

                console.log('check value', { id, color, isDisplayed });

                if (!isDisplayed || !id || !color) {
                  return;
                }

                updateCategory(
                  { categoryId: id, createInfo: { color, title, isDisplayed } },
                  {
                    onSuccess: (data) => {
                      console.log('onSuccess update', data);
                      setEditingCategory({ ...editingCategory, title });
                      setCategoryId(id);
                    },
                  },
                );
                return;
              }

              setEditingCategory(newValue);
              setCategoryId(newValue.id);
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;

              const isExisting = options.some((option) => inputValue === option.title);
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  title: `Update ${inputValue}`,

                  editType: 'update',
                });
                filtered.push({
                  title: `Add ${inputValue}`,

                  editType: 'add',
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-2-demo"
            options={editCategoryList}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }

              // if (option.inputValue) {
              //   return option.inputValue;
              // }

              // Regular option
              return option.title;
            }}
            freeSolo
            // disableClearable

            renderInput={(params) => <TextField {...params} />}
            renderOption={(props, option) => {
              // eslint-disable-next-line react/prop-types
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  {option.title}
                </li>
              );
            }}
            onInputChange={(event, value, reason) => {
              if (reason === 'clear') {
                // console.log('event', event);
                // console.log('value', value);
                // console.log('reason', reason);
                setIsEdit(false);
              }
            }}
          />
        )}

        {!isEdit && (
          <Select
            value={categoryId}
            onChange={changeCategory}
            sx={{ width: '100%', height: '56px' }}
            renderValue={() => {
              return (
                <MenuItem>
                  <S.SelectItemLayout>{selectedCategory?.title}</S.SelectItemLayout>
                </MenuItem>
              );
            }}
          >
            {categoryList.map((category) => (
              <MenuItem key={category.id} value={category.id} sx={{ height: '52px' }}>
                <S.SelectItemLayout>
                  <S.SelectItemDescriptionLayout>
                    <UpdateCategoryColorButton
                      categoryId={category.id}
                      onPointerDown={handleStopPropagation}
                      onMouseDown={handleStopPropagation}
                      onClick={handleStopPropagation}
                    />
                    <p>{category.title}</p>
                  </S.SelectItemDescriptionLayout>
                  {category.isDefault === 0 && (
                    <IconButton
                      size="medium"
                      color="default"
                      onClick={(e) => {
                        handleStopPropagation(e);
                        setIsEdit(true);
                        setEditingCategory({ ...category });
                      }}
                      onPointerDown={handleStopPropagation}
                      onMouseDown={handleStopPropagation}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </S.SelectItemLayout>
              </MenuItem>
            ))}
          </Select>
        )}

        {isEditingComplete && <S.ColorPickerEditedSpan $color="green">카테고리 수정 완료</S.ColorPickerEditedSpan>}
      </Box>
    )
  );

  return (
    filteredCategoryList && (
      <Box sx={{ margin: '10px 0' }}>
        <Box sx={{ display: isEditing ? 'flex' : 'none', position: 'relative', alignItems: 'center' }}>
          <S.ColorPickerBoxLayout $height="100%" $margin="0px 0px 0px 0px" $gap="10px" $alignItems="stretch">
            <S.LabelP>카테고리 수정</S.LabelP>
            <ColorPickerInput style={{ flex: 0.7 }} color={editingCategory.color || ''} setColor={handleSetCategoryColor} />
            <Input
              style={{ flex: 8 }}
              value={editingCategory.title}
              onChange={(event) => setEditingCategory({ ...editingCategory, title: event.target.value })}
            />
            <IconButton
              style={{ flex: 1 }}
              size="medium"
              color="default"
              onClick={() => handleCompleteEdit(editingCategory.id, editingCategory.title, editingCategory.color || '')}
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
          options={filteredCategoryList}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
          value={selectedCategory} // 확인 팔요.
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="카테고리" placeholder="카테고리 검색" />}
          // renderTags={(value, getTagProps) =>
          //   value.map((option, index) => {
          //     const tagProps = getTagProps({ index });
          //     return (
          //       <Chip
          //         key={tagProps.key}
          //         label={option.title}
          //         className={tagProps.className}
          //         onDelete={() => setSelectedCategory([])}
          //         disabled={tagProps.disabled}
          //         tabIndex={tagProps.tabIndex}
          //         sx={{ background: option.color, color: 'white', borderRadius: '4px' }}
          //       />
          //     );
          //   })
          // }
          // renderOption={(props, option) => {
          //   // eslint-disable-next-line react/prop-types
          //   const { key, ...otherProps } = props;
          //   return (
          //     <Box
          //       position="relative"
          //       display="flex"
          //       alignItems="center"
          //       boxShadow="1px 1px 5px lightgray"
          //       margin="8px"
          //       borderRadius={1}
          //       key={key}
          //     >
          //       <Box
          //         width="100%"
          //         height="36px"
          //         display="flex"
          //         alignItems="center"
          //         position="relative"
          //         sx={{
          //           '&:hover': {
          //             bgcolor: '#f2f3f5', // Hover effect
          //           },
          //         }}
          //       >
          //         <Box
          //           sx={{
          //             width: 20,
          //             height: 20,
          //             borderRadius: 1,
          //             bgcolor: option.color,
          //           }}
          //         />
          //         <span
          //           {...otherProps}
          //           style={{
          //             display: 'block',
          //             width: '100%',
          //             height: '100%',
          //             margin: '0',
          //           }}
          //         >
          //           {option.title}
          //         </span>

          //         <Box position="absolute" right={8}>
          //           <IconButton
          //             size="small"
          //             sx={{ color: '#b3b3b3' }}
          //             onClick={() => handleEdit(option.id, option.title, option.color || randomColor(), option.isDisplayed || 0)}
          //           >
          //             <EditIcon />
          //           </IconButton>
          //         </Box>
          //       </Box>
          //     </Box>
          //   );
          // }}
          // 아래 onChange는 value의 값을 변경했을 때가 아닌 enter를 쳤을 때의 콜백이 호출된다.
          onChange={(e, value) => {
            submitCategoryChange(value);
          }}
        />

        {isEditingComplete && <S.ColorPickerEditedSpan $color="green">카테고리 수정 완료</S.ColorPickerEditedSpan>}
      </Box>
    )
  );
}
