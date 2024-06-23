import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@material-ui/core';

interface ParsingTableProps {
  table: {
    [state: string]: {
      [inputSymbol: string]: string[];
    };
  };
}

export default function ParsingTable({ table }: ParsingTableProps) {
  const inputSymbols = Array.from(
    new Set(Object.values(table).flatMap((row) => Object.keys(row))),
  ).sort((a, b) => {
    if (a === '$') return 1;
    if (b === '$') return -1;
    return a.localeCompare(b);
  });

  return (
    <TableContainer component={Paper}>
      <Typography
        variant="h6"
        component="h2"
        align="center"
        style={{ padding: '16px' }}
      >
        Tabela de Parsing
      </Typography>
      <Table aria-label="Parsing Table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: '1rem' }}>Não Terminal</TableCell>
            {inputSymbols.map((symbol) => (
              <TableCell
                key={symbol}
                align="center"
                style={{ fontSize: '1rem' }}
              >
                {symbol}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(table).map(([nonTerminal, rules]) => (
            <TableRow key={nonTerminal}>
              <TableCell
                component="th"
                scope="row"
                style={{ fontSize: '1rem' }}
              >
                {nonTerminal}
              </TableCell>
              {inputSymbols.map((symbol) => (
                <TableCell
                  key={symbol}
                  align="center"
                  style={{ fontSize: '1rem' }}
                >
                  {rules[symbol]
                    ? `${nonTerminal} → ${rules[symbol].join('')}`
                    : '—'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
