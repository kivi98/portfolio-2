import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home.jsx';
import About from '../pages/about-me/about-me.jsx';
import ContactMe from '../pages/contact-me/contact-me.jsx';
import Blog from '../pages/blog/blog.jsx';
import Projects from '../pages/projects/projects.jsx';

// exceptions
import NotFound from './exceptions/not-found.jsx';
import Layout from '../layout/layout.jsx';
import BlogView from '../pages/blog/blog-view.jsx';
import BlogsLayout from '../layout/blogs-layout.jsx';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home />, errorElement: <NotFound /> },
      {
        path: '/about-me',
        element: <About />,
        errorElement: <NotFound />,
      },
      {
        path: '/contact-me',
        element: <ContactMe />,
        errorElement: <NotFound />,
      },
      {
        path: '/blog',
        element: <BlogsLayout />,
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Blog />,
            errorElement: <NotFound />,
          },
          {
            path: ':id',
            element: <BlogView />,
            errorElement: <NotFound />,
          },
        ],
      },
      {
        path: '/projects',
        element: <Projects />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export default browserRouter;
