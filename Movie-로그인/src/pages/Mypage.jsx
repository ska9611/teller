import React from 'react';
export default function Mypage() {
  return (
    <div className="page-container" style={{ fontSize: '32px' }}>
      마이페이지
    </div>
  );
}

// import React, { useState } from 'react';
// import Login from './Login';

// export default function Mypage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <div>
//       <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//       {isLoggedIn ? <p>로그인함</p> : <p>로그아웃함</p>}
//     </div>
//   );
// }
