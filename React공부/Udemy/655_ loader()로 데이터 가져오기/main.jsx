import React from 'react';
import ReactDOM from 'react-dom/client';
import Posts, { loader as postsLoader } from './routes/Posts.jsx';

import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NewPost from './routes/NewPost.jsx';
import RootLayout from './routes/RootLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, //레이아웃 라우트를 만들기 위해서는 라우트에 또 다른 속성을 추가해야 한다. children이라는 속성을 추가해야 한다.
    children: [
      {
        path: '/',
        element: <Posts />,
        loader: postsLoader,
        children: [{ path: '/create-post', element: <NewPost /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
