import { Skeleton, TableRow, TableCell } from '@mui/material'

const TableRowWithSkeleton = ({ numColumns }) => {
  const cols = []
  for (let i = 0; i < numColumns; i += 1) {
    cols.push(
      <TableCell key={`cell-${i}-skeleton`}>
        <Skeleton animation="wave" />
      </TableCell>,
    )
  }

  return <TableRow>{cols}</TableRow>
}

export default TableRowWithSkeleton
