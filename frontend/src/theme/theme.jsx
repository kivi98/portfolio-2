import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      dark: '#0D0D0D',
      main: '#292929',
      light: '#303030',
      light2: '#404040',
      lighter: '#8C8C8C',
    },
    secondary: {
      main: '#910000',
      light: '#E30000',
      dark: '#590000',
      other: '#DA2C2C',
    },
    text: {
      main: '#F5F5F5',
      light: '#FFFFFF',
    },
    common: {
      white: '#FFFFFF',
      lite: '#e7e7e7',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  spacing: 8,
});

export default theme;
