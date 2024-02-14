import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useState } from 'react';

export default function RouteLayout() {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <>
      <Header setUserInfo={setUserInfo} />
      <Outlet />
    </>
  );
}
