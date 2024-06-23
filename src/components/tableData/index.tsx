import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface TableRowInterface {
  iter: number;
  stack: string;
  input: string;
  action?: string;
}

interface TableDataProps {
  data: TableRowInterface[];
  accepted: boolean | null;
}

export default function TableData({ data, accepted }: TableDataProps) {
  console.log(data);
  console.log(accepted);
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 750, margin: 'auto' }}>
      <Table aria-label="debug table" size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
              Iteração
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
              Pilha
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
              Entrada
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
              Ação
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                fontSize: '0.875rem',
                backgroundColor:
                  index === data.length - 1
                    ? accepted === true
                      ? '#90ee90'
                      : accepted === false
                      ? '#ffcccb'
                      : 'inherit'
                    : 'inherit',
              }}
            >
              <TableCell>{row.iter}</TableCell>
              <TableCell>{row.stack}</TableCell>
              <TableCell>{row.input}</TableCell>
              <TableCell>{row.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
