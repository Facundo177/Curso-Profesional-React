import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>
  },
  {
    path: '/detail',
    element: <div>Detail</div>
  },
]);

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;