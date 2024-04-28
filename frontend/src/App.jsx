import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Layout from './layout/layout.jsx';
import theme from './theme/theme.jsx';
import Home from './pages/home/home.jsx';
import About from './pages/about-me/about-me.jsx';
import ContactMe from './pages/contact-me/contact-me.jsx';
import Blog from './pages/blog/blog.jsx';
import Projects from './pages/projects/projects.jsx';

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
          <Route
            path={'contact-me'}
            element={
              <Layout>
                <ContactMe />
              </Layout>
            }
          />
          <Route
            path={'blog'}
            element={
              <Layout>
                <Blog />
              </Layout>
            }
          />
          <Route
            path={'projects'}
            element={
              <Layout>
                <Projects />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
