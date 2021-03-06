import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#c62828',//'#556cd6',
    },
    secondary: {
      main: '#d81b60',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
