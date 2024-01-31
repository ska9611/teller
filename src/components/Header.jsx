import React from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <div className="header-container">
      <div className="header-wrap">
        <div className="header-left-wrap">
          <Link style={{ display: 'flex', alignItems: 'center' }} to="/">
            <img
              //   넷플릭스 이미지를 따왔음
              style={{ width: '154px', height: '20px' }}
              src="https://files.readme.io/29c6fee-blue_short.svg"
              alt="로고"
            />
          </Link>
          <ul>
            <li>
              <Link className="header-nav-item" to="/movie">
                영화
              </Link>
            </li>
            <li>
              <Link className="header-nav-item" to="/search">
                책 검색
              </Link>
            </li>
            <li>
              <Link className="header-nav-item" to="/celebrity">
                인물
              </Link>
            </li>
            <li>
              <Link className="header-nav-item" to="/login">
                로그인
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
