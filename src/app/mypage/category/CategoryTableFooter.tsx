import { Button, TableCell, TableFooter, TableRow } from '@mui/material';

function CategoryTableFooter() {
  const handleAddCategory = () => {
    console.log('add category');
  };

  return (
    <TableFooter sx={{ position: 'sticky', bottom: 0, backgroundColor: 'lightgray', zIndex: 1 }}>
      <TableRow>
        <TableCell colSpan={4} align="center" sx={{ fontSize: '15px', color: 'gray', border: 0, padding: 0 }}>
          <Button sx={{ width: '100%', padding: '20px' }} onClick={handleAddCategory}>
            + Add New Category
          </Button>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}

export default CategoryTableFooter;
