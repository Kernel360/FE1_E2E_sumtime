import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';

import { getServerDataAboutCategory } from './server/categoryService';
import CategoryTableInfo from './CategoryTableInfo';

async function CategoryTableBody() {
  const categories = await getServerDataAboutCategory().catch((error) => {
    console.error(error);
    return null;
  });

  if (categories && 'error' in categories) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={4}>에러가 났습니다잇..</TableCell>
        </TableRow>
      </TableBody>
    );
  }
  if (categories === null) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={4}>
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  if (Array.isArray(categories)) {
    return (
      <TableBody>
        <CategoryTableInfo categoryList={categories} />
      </TableBody>
    );
  }
}

export default CategoryTableBody;
