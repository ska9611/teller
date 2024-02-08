// 구글로 로그인 성공시 header도 바뀜
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import GoogleLoginButton from './GoogleLoginButton';

const User = {
  email: 'ska9611@gmail.com',
  pw: 'gks970808!',
};

function Login({ isLoggedIn, setIsLoggedIn }) {
  const [show, setShow] = useState(false);
  const [cookies, setCookie] = useCookies(['isLoggedIn']);

  const handleClose = () => {
    setShow(false);
    setEmail('');
    setPw('');
    setEmailValid(false);
    setPwValid(false);
  };
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  const onClickConfirmButton = () => {
    if (email === User.email && pw === User.pw) {
      setIsLoggedIn(true);
      setCookie('isLoggedIn', true, { path: '/' }); // 로그인 성공 시 쿠키 생성
      alert('로그인에 성공했습니다.');
    } else {
      alert('등록되지 않은 회원입니다.');
    }

    handleClose();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCookie('isLoggedIn', false, { path: '/' }); // 로그아웃 시 쿠키 삭제
    console.log('로그아웃함');
    handleClose();
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const handleGoogleLoginSuccess = () => {
    setIsLoggedIn(true); // 구글 로그인 성공 시 로그인 상태 업데이트
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
                onClick={onClickConfirmButton}
                disabled={notAllow}
                className="bottomButton"
              >
                로그인
              </button>
              <GoogleLoginButton onLoginSuccess={handleGoogleLoginSuccess} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
