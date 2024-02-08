import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLoginButton = ({ onLoginSuccess }) => {
  const clientId =
    '314472620836-3ds66aokmhu2r9utp2vui6u8d99u0sto.apps.googleusercontent.com';

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
            onLoginSuccess(); // 로그인 성공 시 부모 컴포넌트에 상태 업데이트 함수 호출
          }}
          onFailure={(err) => {
            console.log(err);
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginButton;

// import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// const GoogleLoginButton = ({ setIsLoggedIn, handleClose }) => {
//   const clientId =
//     '314472620836-3ds66aokmhu2r9utp2vui6u8d99u0sto.apps.googleusercontent.com';
//   return (
//     <div className="centered-button">
//       <GoogleOAuthProvider clientId={clientId}>
//         <GoogleLogin
//           onSuccess={(res) => {
//             console.log(res);
//             setIsLoggedIn(true); // 로그인 상태 업데이트
//             handleClose(); // Modal 창 닫기
//           }}
//           onFailure={(err) => {
//             console.log(err);
//           }}
//         />
//       </GoogleOAuthProvider>
//     </div>
//   );
// };

// export default GoogleLoginButton;
