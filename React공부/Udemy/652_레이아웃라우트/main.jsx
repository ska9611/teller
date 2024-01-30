import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NewPost from './components/Post/NewPost.jsx';
import RootLayout from './routes/RootLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, //레이아웃 라우트를 만들기 위해서는 라우트에 또 다른 속성을 추가해야 한다. children이라는 속성을 추가해야 한다.
    children: [
      { path: '/', element: <App /> },
      { path: '/create-post', element: <NewPost /> }, //이 두 라우트는 이제 바깥에 있는 라우트에 덮어져서 RootLayout 라우트가 제공하는 레이아웃을 공유한다
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// NewPost 컴포넌트를 별도의 라우트로 만드려고한다
