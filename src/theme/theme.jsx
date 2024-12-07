import { createTheme } from '@mui/material';

import '@fontsource/ubuntu/400.css';
import '@fontsource/roboto/300.css';
import '@fontsource/open-sans/500.css';

const theme = createTheme({
  palette: {
    primary: {
      dark: '#0D0D0D',
      dark2: '#252525',
      main: '#292929',
      light: '#303030',
      light2: '#404040',
      light3: '#505050',
      lighter: '#8C8C8C',
      lighter2: '#BDBDBD',
      lighter3: '#E0E0E0',
    },
    secondary: {
      main: '#910000',
      light: '#E30000',
      dark: '#590000',
      other: '#DA2C2C',
    },
    text: {
      main: '#F5F5F5',
      dark: '#b6b6b6',
      light: '#FFFFFF',
    },
    common: {
      white: '#FFFFFF',
      lite: '#e7e7e7',
    },
    transparentLevels: {
      1: 'rgba(0,0,0,0.1)',
      2: 'rgba(0,0,0,0.2)',
      3: 'rgba(0,0,0,0.3)',
      4: 'rgba(0,0,0,0.4)',
      5: 'rgba(0,0,0,0.5)',
      6: 'rgba(0,0,0,0.6)',
      7: 'rgba(0,0,0,0.7)',
      8: 'rgba(0,0,0,0.8)',
      9: 'rgba(0,0,0,0.9)',
    },
    transparentLevelsWhite: {
      1: 'rgba(255,255,255,0.1)',
      2: 'rgba(255,255,255,0.2)',
      3: 'rgba(255,255,255,0.3)',
      4: 'rgba(255,255,255,0.4)',
      5: 'rgba(255,255,255,0.5)',
      6: 'rgba(255,255,255,0.6)',
      7: 'rgba(255,255,255,0.7)',
      8: 'rgba(255,255,255,0.8)',
      9: 'rgba(255,255,255,0.9)',
    },
    transparentLevelsRed: {
      1: 'rgba(255,0,0,0.1)',
      2: 'rgba(255,0,0,0.2)',
      3: 'rgba(255,0,0,0.3)',
      4: 'rgba(255,0,0,0.4)',
      5: 'rgba(255,0,0,0.5)',
      6: 'rgba(255,0,0,0.6)',
      7: 'rgba(255,0,0,0.7)',
      8: 'rgba(255,0,0,0.8)',
      9: 'rgba(255,0,0,0.9)',
    },
  },
  typography: {
    fontFamily: 'Ubuntu, Roboto sans, Open Sans',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 300,
    },
    subtitle3: {
      fontSize: '0.75rem',
      fontWeight: 300,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 300,
    },
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
