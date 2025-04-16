import { visuallyHidden } from '@mui/utils';
import TableHead from '@mui/material/TableHead';
import { Box, TableCell, TableRow, TableSortLabel } from '@mui/material';

function TableHeadSorting({
  order,
  orderBy,
  onRequestSort,
  headCells
}) {
  
  const createSortHandler = (property) => (event) => {
    console.log(property)
    onRequestSort(event, property);
  };

  return (
  <>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
     </>
  );
}
export default TableHeadSorting;
