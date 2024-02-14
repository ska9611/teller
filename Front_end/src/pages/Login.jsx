import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import GoogleLoginButton from './GoogleLoginButton';
import axios from 'axios'; // axios 추가import GoogleLoginButton from './GoogleLoginButton';
import RegisterForm from './RegisterButton';
import { Link } from 'react-router-dom';

const User = {
  email: 'ska9611@gmail.com',
  pw: 'gks970808!',
};

function Login({ isLoggedIn, setIsLoggedIn, setUserInfo }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleButtonClick = () => {
    window.location.href = '/register';
  };

  const handleClose = () => {
    setShow(false);
    setEmail('');
    setPw('');
    setEmailValid(false);
    setPwValid(false);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [emailValid, pwValid]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.10.100:3000/login', {
        email: email,
        password: pw,
      });
      if (response.data.user) {
        setIsLoggedIn(true);
        alert('로그인에 성공했습니다.');

        // 로그인 성공 시 콘솔에 사용자 정보 출력
        setUserInfo(response.data.user);
        console.log('Logged in user:', JSON.stringify(response.data.user));
      } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
    handleClose();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('로그아웃함');
    handleClose();
    window.location.href = '/';
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setEmailValid(regex.test(e.target.value));
  };

  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    setPwValid(regex.test(e.target.value));
  };

  const handleGoogleLoginSuccess = () => {
    setIsLoggedIn(true);
    handleClose();
  };

  return (
    <>
      {!isLoggedIn ? (
        <Button variant="primary" onClick={handleShow}>
          로그인
        </Button>
      ) : (
        <Button variant="danger" onClick={handleLogout}>
          로그아웃
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>로그인 정보를 입력해주세요</Modal.Header>
        <Modal.Body>
          <div className="page">
            <div className="contentWrap">
              <div className="inputTitle">이메일 주소</div>
              <div className="inputWrap">
                <input
                  className="input"
                  placeholder="test@gmail.com"
                  value={email}
                  onChange={handleEmail}
                />
              </div>
              <div className="errorMessageWrap">
                {!emailValid && email.length > 0 && (
                  <div>올바른 이메일을 입력해주세요</div>
                )}
              </div>
              <div style={{ marginTop: '26px' }} className="inputTitle">
                비밀번호
              </div>
              <div className="inputWrap">
                <input
                  type="password"
                  className="input"
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력해주세요."
                  value={pw}
                  onChange={handlePassword}
                />
              </div>
              <div className="errorMessageWrap">
                {!pwValid && pw.length > 0 && (
                  <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                )}
              </div>
              <button
                onClick={handleLogin}
                disabled={notAllow}
                className="bottomButton"
              >
                로그인
              </button>
              <GoogleLoginButton onLoginSuccess={handleGoogleLoginSuccess} />
              <button className="bottomButton" onClick={handleButtonClick}>
                회원가입
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
