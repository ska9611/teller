import PostList from './components/Post/PostList';
import MainHeader from './components/Post/MainHeader';
import { useState } from 'react';

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  function showModalHandler() {
    //버튼을 눌렀을 때 모달을 숨기는 기능과 반대로 모달을 나타나게 하는 함수
    setModalIsVisible(true);
  }
  function hideModalHandler() {
    setModalIsVisible(false);
  }
  {
    /*modal이 닫혔을 때 다시 열수 있게 해주는 버튼 컴포넌트, 버튼을 눌렀을 때 모달의 상태를 true로 바꾸기 위해서는 modalIsVisible 이라는 useState를 PostList 컴포넌트에서 가져와야한다
그 방법으로는 PostList 컴포넌트에 있는 modalIsVisible 을 잘라와서 한단계 위로 올리는 것이다. 여기서는 App.js 파일로 올려보냈다 */
  }
  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />

      <main>
        <PostList isPosting={modalIsVisible} onStopPosting={hideModalHandler} />
      </main>
    </>
  );
}

export default App;
