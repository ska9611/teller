import Post from './Post';
import classes from './PostList.module.css';
import NewPost from './NewPost';
import { useState } from 'react';
import Modal from './Modal';

function PostList({ isPosting, onStopPosting }) {
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  return (
    <>
      {isPosting ? (
        <Modal onClose={onStopPosting}>
          <NewPost
            onBodyChange={bodyChangeHandler}
            onAuthorChange={authorChangeHandler}
            onCancle={onStopPosting}
          />
        </Modal>
      ) : null}
      <ul className={classes.posts}>
        <Post author={enteredAuthor} body={enteredBody} />
        <Post author="운전병123" body="직업은 루미" />
        <Post author="삼루트아델" body=" 아델" />
        <Post author="카우욱" body="신궁" />
      </ul>
    </>
  );
}

export default PostList;
