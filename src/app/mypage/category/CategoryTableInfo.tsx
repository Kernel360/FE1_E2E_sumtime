'use client';

import { styled, TableRow, Button, TableCell } from '@mui/material';
import randomColor from 'randomcolor';
import { useState } from 'react';
import { Category, CreateCategoryInfo } from '@/api/queryFn/categoryQueryFn';
import useUpdateCategory from '@/api/hooks/categoryHooks/useUpdateCategory';
import useGetCategoryList from '@/api/hooks/categoryHooks/useGetCategoryList';
import CategoryModal from './CategoryModal';

interface CategoryTableInfoProps {
  categoryList: Category[];
}

interface StyledTableRowProps {
  disabled: boolean;
}

const StyledTableRow = styled(TableRow)<StyledTableRowProps>(({ theme, disabled }) => ({
  backgroundColor: disabled ? theme.palette.action.hover : 'inherit',
  cursor: disabled ? 'not-allowed' : 'default',
  opacity: disabled ? 0.5 : 1,

  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '& td': {
    color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  },
}));

function CategoryTableInfo({ categoryList }: CategoryTableInfoProps) {
  const { categoryList: data } = useGetCategoryList(categoryList);

  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState<number | undefined>(undefined);

  const [categoryData, setCategoryData] = useState<CreateCategoryInfo>({
    title: '',
    color: '',
    isDisplayed: 0,
  });

  const setCategoryDataForUnit = (unit: keyof typeof categoryData, value: number | string | boolean) => {
    setCategoryData((prevData) => ({
      ...prevData,
      [unit]: value,
    }));
  };

  const handleEditClick = (category: Category) => {
    setId(category.id);
    setIsEditing(true);
    categoryData.title = category.title;
    categoryData.color = category.color;
    categoryData.isDisplayed = category.isDisplayed;
  };

  const handleCloseModal = () => {
    setId(undefined);
    setIsEditing(false);
  };

  const { mutate: updateCategory } = useUpdateCategory();

  const handleUpdateCategory = (categoryId: number, createInfo: CreateCategoryInfo) => {
    updateCategory({ categoryId, createInfo });
  };

  const mutateFunction = (body: CreateCategoryInfo) => {
    handleUpdateCategory(id!, body);
    setIsEditing(false);
  };

  return data.map((category) => {
    const isDisable = category.isDefault === 1;
    return (
      <StyledTableRow key={category.id} disabled={isDisable}>
        <TableCell sx={{ width: '300px', maxWidth: '300px', overflow: 'auto', whiteSpace: 'nowrap' }}>{category.title}</TableCell>
        <TableCell align="right">
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ backgroundColor: category.color || randomColor(), width: '20px', height: '20px' }} />
            <span>{category.color}</span>
          </div>
        </TableCell>
        <TableCell align="right">{category.isDisplayed ? '포함' : '미포함'}</TableCell>
        <TableCell align="right">
          <Button disabled={isDisable} onClick={() => handleEditClick(category)}>
            수정
          </Button>
        </TableCell>
        <CategoryModal
          isOpen={isEditing}
          close={handleCloseModal}
          title="수정"
          mutateAction={mutateFunction}
          data={categoryData}
          setData={setCategoryDataForUnit}
          id={id}
        />
      </StyledTableRow>
    );
  });
}

export default CategoryTableInfo;
