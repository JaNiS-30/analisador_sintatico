import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { randomSentence } from '../../scripts/randomSentence';
import { useState } from 'react';
import TableData from '../tableData';

interface InputsProps {
  sentence: string;
  setSentence: (value: string) => void;
  oneStepAnalisis: (value: string) => InfoObj;
  stepByStepAnalisis: (value: string) => InfoObj;
}
interface DebugRow {
  iter: number;
  stack: string;
  input: string;
  action?: string;
}

interface InfoObj {
  input: string;
  stack: string;
  accepted: boolean | null;
  table: DebugRow[];
}

const clearInfoObj: InfoObj = {
  input: '',
  stack: '',
  accepted: null,
  table: [],
};

export default function Inputs({
  sentence,
  setSentence,
  oneStepAnalisis,
  stepByStepAnalisis,
}: InputsProps) {
  const [infoObj, setInfoObj] = useState<InfoObj>(clearInfoObj);

  const handleGenerateClick = () => {
    const newSentence = randomSentence();
    setSentence(newSentence);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        marginTop: 2,
      }}
    >
      <TextField
        variant="outlined"
        value={sentence}
        onChange={(e) => {
          setSentence(e.target.value);
          setInfoObj(clearInfoObj);
        }}
        sx={{ width: '100%', maxWidth: '500px' }} // Aumentando o tamanho do TextField
      />
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#6a5acd',
            '&:hover': { backgroundColor: '#483d8b' },
          }}
          onClick={() => {
            handleGenerateClick();
            setInfoObj(clearInfoObj);
          }}
        >
          Gerar
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#4682b4',
            '&:hover': { backgroundColor: '#4169e1' },
          }}
          onClick={() => setInfoObj(() => stepByStepAnalisis(sentence))}
        >
          Passo a passo
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#6a5acd',
            '&:hover': { backgroundColor: '#483d8b' },
          }}
          onClick={() => setInfoObj(oneStepAnalisis(sentence))}
        >
          Verificar
        </Button>
      </Box>
      <TableData data={infoObj.table} accepted={infoObj.accepted} />
    </Box>
  );
}
