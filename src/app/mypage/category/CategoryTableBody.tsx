import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';

import { getServerDataAboutCategory } from './server/categoryService';
import CategoryTableItem from './CategoryTableItem';

async function CategoryTableBody() {
  const categories = await getServerDataAboutCategory().catch((error) => {
    console.error(error);
    return null; // 에러 발생 시 null 반환
  });

  let content;

  if (categories && 'error' in categories) {
    content = (
      <TableRow>
        <TableCell colSpan={4}>에러가 났습니다잇..</TableCell>
      </TableRow>
    );
  } else if (categories === null) {
    content = (
      <TableRow>
        <TableCell colSpan={4}>
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </TableCell>
      </TableRow>
    );
  } else if (Array.isArray(categories)) {
    content = categories.map((category) => {
      return <CategoryTableItem key={category.id} category={category} />;
    });
  }

  return <TableBody>{content}</TableBody>;
}

export default CategoryTableBody;
