import Post from './Post';
import classes from './PostList.module.css';
import NewPost from './NewPost';
import { useState, useEffect } from 'react';
import Modal from './Modal';

function PostList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState();

  useEffect(() => {
    // 무한루프가 생길수 있어서 useEffect 훅을 가져와 사용한다
    async function fetchPosts() {
      setIsFetching(true)
      const response = await fetch('http://localhost:8080/posts');
      const resData = await response.json();
      setPosts(resData.posts);
      setIsFetching(false)
    }
  
    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      {isPosting ? (
        <Modal onClose={onStopPosting}>
          <NewPost onCancle={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      ) : null}
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>포스트를 작성하시오</h2>
        </div>
      )}
      {isFetching && ( 
        <div style={{ textAlign: 'center', color: 'white'}}>
          <p>로딩중...</p>
          </div> 
      )}
    </>
  );
}

export default PostList;
