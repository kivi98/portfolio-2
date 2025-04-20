import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import browserRouter from './routes/router.jsx';
import theme from './theme/theme.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={browserRouter} />
    </ThemeProvider>
  );
}

export default App;
