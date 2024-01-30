import MainHeader from '../components/Post/MainHeader';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export default RootLayout;

// 레이아웃 라우트라는 건 다른 라우트들을 감싸는 라우트이기 때문에 MainHeader는 공유되고
// 다른 라우트가 가진 콘텐츠는 MainHeader 밑에 렌더링 된다
