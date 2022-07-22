import { TableCell, TableRow } from '@mui/material'


const TableRowEmpty = ({ text }) => {
  return (
    <TableRow>
      <TableCell sx={{ borderBottom: 'none' }}>{text}</TableCell>
    </TableRow>
  )
}

export default TableRowEmpty
