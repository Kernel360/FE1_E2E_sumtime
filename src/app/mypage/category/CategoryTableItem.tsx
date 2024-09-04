'use client';

import { styled, TableRow, Button, TableCell } from '@mui/material';
import randomColor from 'randomcolor';
import { useState } from 'react';
import { CreateCategoryInfo } from '@/api/queryFn/categoryQueryFn';
import useUpdateCategory from '@/api/hooks/categoryHooks/useUpdateCategory';
import CategoryModal from './CategoryModal';

interface StyledTableRowProps {
  disabled: boolean;
}

interface Category {
  title: string;
  id: number;
  color: string | null;
  isDisplayed: number;
  userId: number;
  isDefault: number;
}

interface SampleProps {
  category: Category;
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

function CategoryTableItem({ category }: SampleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryData, setCategoryData] = useState<CreateCategoryInfo>({
    title: category.title,
    color: category.color,
    isDisplayed: category.isDisplayed,
  });

  const setCategoryDataForUnit = (unit: keyof typeof categoryData, value: number | string | boolean) => {
    setCategoryData((prevData) => ({
      ...prevData,
      [unit]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const { mutate: updateCategory } = useUpdateCategory();

  const handleUpdateCategory = (categoryId: number, createInfo: CreateCategoryInfo) => {
    updateCategory({ categoryId, createInfo });
  };

  const mutateFunction = (body: CreateCategoryInfo) => {
    console.log(body);
    handleUpdateCategory(category.id, body);
    setIsEditing(false);
  };

  const isDisable = category.isDefault === 1;

  console.log(isEditing);

  return (
    <>
      <StyledTableRow disabled={isDisable}>
        <TableCell component="th" scope="row" sx={{ maxWidth: '200px', overflowX: 'auto' }}>
          {category.title}
        </TableCell>
        <TableCell align="right">
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ backgroundColor: category.color || randomColor(), width: '20px', height: '20px' }} />
            <span>{category.color}</span>
          </div>
        </TableCell>
        <TableCell align="right">{category.isDisplayed ? '포함' : '미포함'}</TableCell>
        <TableCell align="right">
          <Button disabled={isDisable} onClick={handleEditClick}>
            수정
          </Button>
        </TableCell>
      </StyledTableRow>
      <CategoryModal
        isOpen={isEditing}
        close={handleCloseModal}
        title="수정"
        mutateAction={mutateFunction}
        data={categoryData}
        setData={setCategoryDataForUnit}
      />
    </>
  );
}

export default CategoryTableItem;
