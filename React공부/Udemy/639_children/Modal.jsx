import { Children } from 'react';
import classes from './Modal.module.css';

function Modal({ children }) {
  return (
    <>
      <div className={classes.backdrop} />
      <dialog open={true} className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

// children은 우리가 직접 만드는 것이 아니라 이미 있는 기능임. children이 참조하는건 언제나 사용자 정의 컴포넌트의 본문 태그 안에 담겨 전달되는 콘텐츠이다
// 우리가 저 props.children을 dialog 사이에 넣은것은. PostList.jsx 파일에서 <Modal><Modal/>을 사용하는데 이 <Modal><Modal/> 태그가 감싸고 있는
/* <NewPost
onBodyChange={bodyChangeHandler}
onAuthorChange={authorChangeHandler} */
//이것이 children으로 본문 태그 안에 담겨 전달되는 콘텐츠라는 것. 그리고 dialog의 props.children은 이 전달되는 콘텐츠가 위치할 곳을 의미한다

// open에 true를 적어주어서 dialog 요소가 자동으로 화면에 표시되게 한다
// children을 childern으로 오타를 냈는데 그걸 못 찾아서 계속 오류가 발생했다. 

export default Modal;
