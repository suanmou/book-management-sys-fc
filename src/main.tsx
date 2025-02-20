import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BookManage } from './pages/BookManage';
import { TagManage } from './pages/TagManage';

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <BookManage />,
  },
  {
    path: '/tag',
    element: <TagManage />,
  },
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);
