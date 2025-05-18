import React, { useState, useMemo, createContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import browserRouter from './routes/router.jsx';
import getTheme from './theme/theme.jsx';

// Create a context for the theme mode
export const ThemeModeContext = createContext({ toggleThemeMode: () => {} });

function App() {
  // State to hold the current theme mode ('light' or 'dark')
  const [mode, setMode] = useState('dark'); // Default to dark mode

  // Function to toggle the theme mode
  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  // Create the theme based on the current mode
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={browserRouter} />
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
