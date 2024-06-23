import { Box, Button, Link, Typography } from '@mui/material';
import { AppBar } from '@material-ui/core';
import GrammarPaper from './components/grammar';
import { first, follow, grammar, table } from './consts/consts';
import ParsingTable from './components/parsingTable';
import Inputs from './components/inputs';
import { useState } from 'react';

interface DebugRow {
  iter: number;
  stack: string;
  input: string;
  action?: string;
}
function App() {
  const [sentence, setSentence] = useState('');
  const [selectedView, setSelectedView] = useState('grammar');
  let debugTable: DebugRow[] = [];
  let stack = ['$', 'S'];
  let input: string[] = [];
  let analising = true;
  let accepted: boolean | null = null;
  let iteration = 1;

  function cleanGlobals() {
    stack = ['$', 'S'];
    input = [];
    analising = true;
    accepted = null;
    debugTable = [];
    iteration = 1;
  }

  function makeStep() {
    // cria a linha da tabela de derivação
    let debugRow: DebugRow = {
      iter: iteration,
      stack: stack.join(''),
      input: input.join(''),
    };

    // topo da pilha
    let topStack = stack[stack.length - 1];

    // simbolo atual na entrada
    let inSimbol = input[0] || '';

    // se o topo for o final da pilha e o simbolo de entrada também, foi aceito
    if (topStack === '$' && inSimbol === '$') {
      analising = false;
      accepted = true;
      debugRow.action = 'Aceito em ' + iteration + ' iterações';
    } else {
      // se o topo da pilha for igual ao simbolo da entrada, lê a entrada
      if (topStack === inSimbol) {
        debugRow.action = "Lê '" + inSimbol + "'";
        stack.pop();
        input.shift();
        input = [...input];

        // se existir uma entrada equivalente ao simbolo de entrada ao
        // não-terminal no topo da pilha na tabela de Parsing
      } else if (
        table[topStack] !== undefined &&
        table[topStack][inSimbol] !== undefined
      ) {
        // produção em array da tabela de parsing para o simbolo terminal da entrada
        let toStack = table[topStack][inSimbol];
        // produção em formato de string
        let production = toStack.join('');

        // adiciona a ação atual na tabela de derivação
        debugRow.action = topStack + ' -> ' + production;

        // remove o topo da pilha
        stack.pop();

        // se a produção não for vazia (epsilon), coloca seu conteúdo da pilha
        if (production !== 'ε') {
          for (let j = toStack.length - 1; j >= 0; j--) {
            stack.push(toStack[j]);
          }
        }

        // se a análise não for válida, finaliza a mesma com erro
      } else {
        analising = false;
        accepted = false;
        debugRow.action = 'Erro em ' + iteration + ' iterações';
      }
    }
    // incrementa a iteração e coloca a linha gerada na tabela de derivação
    iteration++;
    debugTable.push(debugRow);
  }

  function oneStepAnalisis(sentence: string) {
    // limpa as variáveis globais
    cleanGlobals();

    // transforma a entrada em array
    input = (sentence + '$').split('');

    // executa todos os passos até o final
    while (analising) {
      makeStep();
    }

    return {
      input: input.join(''),
      stack: stack.join(''),
      accepted: accepted,
      table: debugTable,
    };
  }

  let savedInput = '';

  function stepByStepAnalisis(sentence: string) {
    if (sentence !== savedInput || !analising) {
      cleanGlobals();
      savedInput = sentence;
      input = (sentence + '$').split('');
    }

    makeStep();

    return {
      input: input.join(''),
      stack: stack.join(''),
      accepted: accepted,
      table: debugTable,
    };
  }

  return (
    <>
      <AppBar position="static">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" component="div">
            Analisador Sintático
          </Typography>
          <Typography variant="body1" component="div">
            por:{' '}
            <Link href="https://github.com/JaNiS-30/" color="inherit">
              Giani Pertuzatti
            </Link>
          </Typography>
        </Box>
      </AppBar>
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => setSelectedView('grammar')}
            sx={{
              backgroundColor:
                selectedView === 'grammar' ? 'primary.main' : 'grey.300',
              color: selectedView === 'grammar' ? 'white' : 'black',
              '&:hover': {
                backgroundColor:
                  selectedView === 'grammar' ? 'primary.dark' : 'grey.400',
              },
            }}
          >
            Gramática e Tabela de Parsing
          </Button>
          <Button
            variant="contained"
            onClick={() => setSelectedView('testing')}
            sx={{
              backgroundColor:
                selectedView === 'testing' ? 'primary.main' : 'grey.300',
              color: selectedView === 'testing' ? 'white' : 'black',
              '&:hover': {
                backgroundColor:
                  selectedView === 'testing' ? 'primary.dark' : 'grey.400',
              },
            }}
          >
            Verificador de Sentenças
          </Button>
        </Box>

        {selectedView === 'grammar' && (
          <>
            <Box
              sx={{ display: 'flex', gap: 25, justifyContent: 'center', p: 3 }}
            >
              <Box sx={{ flex: 1 }}>
                <GrammarPaper grammar={grammar} title="Gramática" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <GrammarPaper grammar={first} title="First" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <GrammarPaper grammar={follow} title="Follow" />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', p: 3 }}>
              <ParsingTable table={table} />
            </Box>
          </>
        )}

        {selectedView === 'testing' && (
          <Inputs
            sentence={sentence}
            setSentence={setSentence}
            oneStepAnalisis={oneStepAnalisis}
            stepByStepAnalisis={stepByStepAnalisis}
          />
        )}
      </div>
    </>
  );
}

export default App;
