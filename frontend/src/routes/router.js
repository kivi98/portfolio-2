import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home.jsx';
import About from '../pages/about-me/about-me.jsx';
import ContactMe from '../pages/contact-me/contact-me.jsx';
import Blog from '../pages/blog/blog.jsx';
import Projects from '../pages/projects/projects.jsx';

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: '/about-me',
    element: <About />,
  },
  {
    path: '/contact-me',
    element: <ContactMe />,
  },
  {
    path: '/blog',
    element: <Blog />,
    children: [
      {
        path: '/:blogId',
        element: <div>Blog Post</div>,
      },
    ],
  },
  {
    path: '/projects',
    element: <Projects />,
    children: [
      {
        path: '/:projectId',
        element: <div>Project</div>,
      },
    ],
  },
]);

export default BrowserRouter;
