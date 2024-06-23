import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';

interface GrammarProps {
  grammar: { [key: string]: string[] };
  title: string;
}

interface RenderTableProps {
  data: { [key: string]: string[] };
}

const renderTable = ({ data }: RenderTableProps) => (
  <>
    <TableContainer component={Box}>
      <Table size="small">
        <TableBody>
          {Object.entries(data).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row" align="left" style={{ fontSize: '1.1rem' }}>
                {key +
                  '  ::=  ' +
                  (Array.isArray(value) ? value.join(' | ') : value)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

export default function GrammarPaper({ grammar, title }: GrammarProps) {
  return (
    <Paper elevation={3} style={{ padding: '25px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      {renderTable({ data: grammar })}
    </Paper>
  );
}