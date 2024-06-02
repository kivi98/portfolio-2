import { RouterProvider, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import browserRouter from './routes/router.jsx';
import theme from './theme/theme.jsx';
import Header from './components/header/header.jsx';
import Layout from './layout/layout.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={browserRouter} />
    </ThemeProvider>
  );
}

export default App;
