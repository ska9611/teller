import { Link } from 'react-router-dom';
import Login from '../pages/Login';
import React, { useState } from 'react';

export default function Header() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
						{isLoggedIn ? (
							<li>
								<Link className="header-nav-item" to="/mypage">
									마이페이지
								</Link>
							</li>
						) : (
							<li></li>
						)}
					</ul>
				</div>
				<div className="header-right-wrap" style={{ marginLeft: 'auto' }}>
					<div className="login-button">
						<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
					</div>
				</div>
			</div>
		</div>
	);
}
