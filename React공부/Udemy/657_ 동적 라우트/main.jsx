import React from 'react';
import ReactDOM from 'react-dom/client';
import Posts, { loader as postsLoader } from './routes/Posts.jsx';

import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NewPost, { action as newPostAction } from './routes/NewPost.jsx';
import RootLayout from './routes/RootLayout.jsx';
import PostDetails, {
  loader as postdetailsLoader,
} from './routes/PostDetails.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, //레이아웃 라우트를 만들기 위해서는 라우트에 또 다른 속성을 추가해야 한다. children이라는 속성을 추가해야 한다.
    children: [
      {
        path: '/',
        element: <Posts />,
        loader: postsLoader,
        children: [
          { path: '/create-post', element: <NewPost />, action: newPostAction },
          { path: '/:id', element: <PostDetails />, loader: postdetailsLoader },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// NewPost 컴포넌트를 별도의 라우트로 만드려고한다
