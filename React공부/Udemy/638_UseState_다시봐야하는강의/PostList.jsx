import Post from './Post';
import classes from './PostList.module.css';
import NewPost from './NewPost';
import { useState } from 'react';

function PostList() {
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  } //이 bodyChangeHandler라는 함수를 NewPost.jsx의 textarea에서 발생하는 이벤트와 연결해준것이다
  //이렇게 하면 상태가 변경되는 PostList 컴포넌트에서 상태를 업데이트할 수 있고 동시에 발생하는 곳에 이벤트를 감지하고 처리하는 Listener를 둘 수 있다

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  } //위의 함수는 NewPost 컴포넌트의 textarea에 값을 입력하면 그 값이 bodyChangeHandler 함수로 인해 enteredBody가 되는 것이라면
  // 지금 이 함수는 NewPost 컴포넌트의 input에 값을 입력하면 그 값이 authorChangeHandler 함수로 인해 enteredAuthor가 되는 것이다

  return (
    <>
      <NewPost
        onBodyChange={bodyChangeHandler}
        onAuthorChange={authorChangeHandler}
      />
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
