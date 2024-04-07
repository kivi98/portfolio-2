import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Layout from './layout/layout.jsx';
import theme from './theme/theme.jsx';
import Home from './pages/home/home.jsx';
import About from './pages/about-me/about-me.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path={'/'}
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path={'about-me'}
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
