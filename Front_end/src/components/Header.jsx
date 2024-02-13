import React from 'react';
import { Link } from 'react-router-dom';
import mainlogo from '../assets/taleer_banyel.png';
import Login from '../pages/Login';
import { useState } from 'react';
import RegisterForm from '../pages/RegisterButton';
import { Button } from 'react-bootstrap';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <div className="header-container">
        <div className="header-wrap">
          <div className="header-left-wrap">
            <Link to="/" className="header-nav-item">
              <img src={mainlogo} className="logo-img" alt="main logo" />
            </Link>
            <ul>
              <li>
                <Link className="header-nav-item" to="/BookPage">
                  오늘의 테일
                </Link>
              </li>
              <li>
                <Link className="header-nav-item" to="/search">
                  책 검색
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link className="header-nav-item" to="/mypage">
                    마이페이지
                  </Link>
                </li>
              )}
              {isLoggedIn && console.log('마이페이지가 떠야함')}
            </ul>
            <div className="header-right-wrap" style={{ marginLeft: 'auto' }}>
              <div className="login-button">
                {/* Login 컴포넌트에 isLoggedIn 상태와 setIsLoggedIn 함수를 props로 전달 */}
                <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
