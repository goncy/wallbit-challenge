import { CssBaseline, ThemeProvider } from '@mui/material';
import { Theme, createTheme } from '@mui/material/styles';
import React from 'react';
import ProgrammerCart from './components/ProgrammerCart';

const theme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProgrammerCart />
    </ThemeProvider>
  );
};

export default App;