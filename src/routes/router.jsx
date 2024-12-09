import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home.jsx';
import About from '../pages/about-me/about-me.jsx';
import ContactMe from '../pages/contact-me/contact-me.jsx';
import Blog from '../pages/blog/blog.jsx';
import Projects from '../pages/projects/projects.jsx';

// exceptions
import NotFound from './exceptions/not-found.jsx';
import Layout from '../layout/layout.jsx';
import BlogView from '../pages/blog/blog-view/blog-view.jsx';
import BlogLayout from '../layout/blog-layout.jsx';
import ProjectLayout from '../layout/project-layout.jsx';
import ProjectView from '../pages/projects/project-view/project-view.jsx';

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
        path: '/blogs',
        element: <BlogLayout />,
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
        element: <ProjectLayout />,
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Projects />,
            errorElement: <NotFound />,
          },
          {
            path: ':id',
            element: <ProjectView />,
            errorElement: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default browserRouter;
