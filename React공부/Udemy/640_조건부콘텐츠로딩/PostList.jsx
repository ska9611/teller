import Post from './Post';
import classes from './PostList.module.css';
import NewPost from './NewPost';
import { useState } from 'react';
import Modal from './Modal';

function PostList() {
  const [modalIsVisible, setModalIsVisible] = useState(true);
  // 배경이 클릭되면 모달 창의 상태 값을 '표시'에서 '숨김'으로 바꾸기 위한 state 사용. 모달 창을 표시할지 여부를 상태 값을 보고 결정하는 것이다
  // useState()로 상태를 등록하고 백드롭에 이벤트 리스너를 추가한 다음 등록한 상태를 사용해 모달을 표시하거나 숨기면 됩니다
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function hideModalHandler() {
    setModalIsVisible(false);
  }

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  return (
    <>
      {/* 목표는 여기 있는 이 JSX코드가 modalIsVisible이 true 일 때만 렌더링 되게 하는것이다. 그래서 JSX 코드를 modalIsVislbe 안으로 집어 넣고 조건을 넣어주는 것*/}
      {modalIsVisible ? (
        <Modal onClose={hideModalHandler}>
          {/*Modal component에 state를 false로 바꾸는 함수 자체를 전달 */}
          <NewPost
            onBodyChange={bodyChangeHandler}
            onAuthorChange={authorChangeHandler}
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
