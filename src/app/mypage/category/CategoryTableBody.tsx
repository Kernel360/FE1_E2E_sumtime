import useGetCategoryList from '@/api/hooks/categoryHooks/useGetCategoryList';
import { Flex } from '@/components/common';
import { Button, TableBody, TableCell, TableRow } from '@mui/material';
import * as S from './Category.styled';

function CategoryTableBody() {
  const categoryList = useGetCategoryList();

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
            <Button>수정</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default CategoryTableBody;
