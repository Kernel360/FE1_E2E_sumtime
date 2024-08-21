import useGetCategoryList from '@/api/hooks/categoryHooks/useGetCategoryList';
import { Flex } from '@/components/common';
import { Button, TableBody, TableCell, TableRow } from '@mui/material';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { useEffect, useState } from 'react';
import useGetCategory from '@/api/hooks/categoryHooks/useGetCategory';
import useUpdateCategory from '@/api/hooks/categoryHooks/useUpdateCategory';
import { CreateCategoryInfo } from '@/api/queryFn/categoryQueryFn';
import * as S from './Category.styled';
import CategoryModal from './CategoryModal';

function CategoryTableBody() {
  const { value: isOpen, setTrue: open, setFalse: close } = useBooleanState();
  const [id, setId] = useState<number | undefined>(undefined);

  const categoryList = useGetCategoryList();
  const categoryInfo = useGetCategory(id);

  const { mutate: updateCategory } = useUpdateCategory();

  const [data, setData] = useState<CreateCategoryInfo>(() => ({
    title: categoryInfo?.title || '',
    isReported: categoryInfo?.isReported || true,
    color: categoryInfo?.color || '',
  }));

  const setCategoryData = (unit: keyof typeof data, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [unit]: value,
    }));
  };

  const handleUpdateCategory = (categoryId: number, createInfo: CreateCategoryInfo) => {
    updateCategory({ categoryId, createInfo });
  };

  const mutateFunction = (body: CreateCategoryInfo) => {
    handleUpdateCategory(id!, body); // 이건 다르게 수정해봐도 좋을듯
    close();
  };

  const clickUpdateButton = (categoryId: number) => {
    setId(categoryId);
    open();
  };

  useEffect(() => {
    setData({
      title: categoryInfo?.title || '',
      isReported: categoryInfo?.isReported || true,
      color: categoryInfo?.color || '',
    });
  }, [categoryInfo]);

  if (!categoryList) return null;

  return (
    <TableBody>
      {categoryList.map((category) => (
        <TableRow key={category.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {category.title}
          </TableCell>
          <TableCell align="right">
            <Flex $gap="20px">
              <S.ColorState hexColor={category.color} />
              {category.color}
            </Flex>
          </TableCell>
          <TableCell align="right">{category.isReported}</TableCell>
          <TableCell align="right">
            <Button onClick={() => clickUpdateButton(category.id)}>수정</Button>
          </TableCell>
        </TableRow>
      ))}
      <CategoryModal
        isOpen={isOpen}
        close={close}
        title="수정"
        mutateAction={mutateFunction}
        data={data}
        setData={setCategoryData}
        id={id}
      />
    </TableBody>
  );
}

export default CategoryTableBody;
