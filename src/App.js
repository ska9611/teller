import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [post, pos] = useState('루미  가즈아');
  // let [a, b] = useState('라이트리플렉션');
  // let [c, d] = useState('아포칼립스');
  // let [e, f] = useState('샤인리뎀션');
  let 제목 = '루미스킬';

  let [레벨, 레벨변경] = useState(0);

  let [a, b] = useState(['아나다', '다다라', '가바사']);

  function 함수() {
    // 따봉버튼 누르면 숫자 1씩 올라감
    레벨변경(레벨 + 1);
  }

  function 변경() {
    // 따봉 버튼 누르면 글 바뀌게 만듬
    let copy = [...a];
    copy[0] = '버튼눌러서 변경';
    b(copy);
  }

  function 가나다() {
    let 복사본 = [...a].sort(); //sort를 이용해서 가나다 순으로 정렬
    b(복사본);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: 'pink', fontSize: '16px' }}>루미너스 스킬 </h4>
      </div>

      <button onClick={가나다}>가나다순 정렬</button>

      <div className="list">
        <h4>{post}</h4>
        <p>
          2024-01-25 패치 <span onClick={변경}>👍</span>{' '}
        </p>
      </div>

      <div className="list">
        <h4>
          {제목}
          <span style={{ fontStyle: 'bold', color: 'black' }}>
            {' '}
            스킬레벨 <span onClick={함수}>👍</span>
          </span>
          {레벨}
        </h4>

        <p>{a[0]}</p>
      </div>
      <div className="list">
        <h4>{제목}</h4>
        <p>{a[1]}</p>
      </div>
      <div className="list">
        <h4>{제목}</h4>
        <p>{a[2]}</p>
      </div>

      <Modal></Modal>
    </div>
  );
}

function Modal() {
  return (
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
