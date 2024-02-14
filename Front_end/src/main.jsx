import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import MyPage from './routes/MyPage';
import BookPage, { loader as loaderBookPage } from './routes/BookPage';
import NotFound from './routes/NotFound';
import Search from './routes/Search';
import Home from './routes/Home';
import BookDetails, { loader as loaderBookDetails } from './routes/BookDetails';
import RouteLayout from './routes/RouteLayout';
import './index.css';
import App from './App.jsx';
import RegisterForm from './pages/RegisterButton.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RouteLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/BookPage',
        element: <BookPage />,
        loader: loaderBookPage,
      },
      {
        path: '/BookDetails/:isbn',
        element: <BookDetails />,
        loader: loaderBookDetails,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
      {
        path: '/*',
        element: <NotFound />,
      },
      {
        path: '/register',
        element: <RegisterForm />,
      },
      {
        path: '/test',
        element: <App />,
        loader: loaderBookDetails,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
