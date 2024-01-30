import PostList from '../components/Post/PostList';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export function Posts() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <>
      <Outlet />
      <main>
        <PostList />
      </main>
    </>
  );
}

export default Posts;
