import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NewPost from './components/Post/NewPost.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: 'create-post', element: <NewPost /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// NewPost 컴포넌트를 별도의 라우트로 만드려고한다
