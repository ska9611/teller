// // import Button from 'react-bootstrap/Button';
// // import Modal from 'react-bootstrap/Modal';
// // import React, { useState } from 'react';

// // function Login( onLogincheck ) {
// //   const [show, setShow] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 추적하는 상태 추가
// //   const handleClose = () => {
// //     setShow(false);
// //   };
// //   const handleShow = () => setShow(true);

// //   const handleLogout = () => {
// //     setIsLoggedIn(false); // 로그아웃 시 로그인 상태를 false로 변경
// //   };

// //   return (
// //     <>
// //       {!isLoggedIn ? ( // isLoggedIn 상태에 따라 다른 버튼 렌더링
// //         <Button variant="primary" onClick={handleShow}>
// //           로그인
// //         </Button>
// //       ) : (
// //         <Button variant="danger" onClick={handleLogout}>
// //           로그아웃
// //         </Button>
// //       )}
// //       <Modal show={show} onHide={handleClose}>
// //         <Modal.Header closeButton>로그인 정보를 입력해주세요</Modal.Header>
// //         <Modal.Body>
// //           <div className="page">
// //             <div className="contentWrap">
// //               <button onClick={setIsLoggedIn} className="bottomButton">
// //                 로그인
// //               </button>
// //             </div>
// //           </div>
// //         </Modal.Body>
// //       </Modal>
// //     </>
// //   );
// // }

// // export default Login;

// import React, { useEffect, useState } from 'react';
// import { Button, Modal } from 'react-bootstrap';

// const User = {
// 	email: 'ska9611@gmail.com',
// 	pw: 'gks970808!',
// };

// function Login({ isLoggedIn, setIsLoggedIn }) {
// 	const [show, setShow] = useState(false);

// 	const handleClose = () => {
// 		setShow(false);
// 		setEmail('');
// 		setPw('');
// 		setEmailValid(false);
// 		setPwValid(false);
// 	};

// 	const [email, setEmail] = useState('');
// 	const [pw, setPw] = useState('');
// 	const [emailValid, setEmailValid] = useState(false);
// 	const [pwValid, setPwValid] = useState(false);
// 	const [notAllow, setNotAllow] = useState(true);

// 	const handleShow = () => setShow(true);

// 	const handleEmail = (e) => {
// 		setEmail(e.target.value);
// 		const regex =
// 			/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
// 		if (regex.test(email)) {
// 			setEmailValid(true);
// 		} else {
// 			setEmailValid(false);
// 		}
// 	};

// 	const handlePassword = (e) => {
// 		setPw(e.target.value);
// 		const regex =
// 			/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
// 		if (regex.test(e.target.value)) {
// 			setPwValid(true);
// 		} else {
// 			setPwValid(false);
// 		}
// 	};

// 	useEffect(() => {
// 		if (emailValid && pwValid) {
// 			setNotAllow(false); // emailValid와 pwValid가 모두 참이라면 버튼에 disabled를 걸었던 것이 false로 바뀜
// 			return;
// 		}
// 		setNotAllow(true);
// 	}, [emailValid, pwValid]); //emailValid와 ,pwValid의 값이 바뀔 때마다 위의 함수가 실행되어 버튼 활성화를 체크한다

// 	const onClickConfirmButton = () => {
// 		if (email === User.email && pw === User.pw) {
// 			setIsLoggedIn(true); // 로그인 성공 시 로그인 상태를 true로 변경
// 			alert('로그인에 성공했습니다.');
// 		} else {
// 			alert('등록되지 않은 회원입니다.');
// 		}

// 		handleClose(); // 로그인 버튼 클릭 후 모달 닫기
// 		handleLogin();
// 	};

// 	const handleLogout = () => {
// 		setIsLoggedIn(false); // 로그아웃 시 로그인 상태를 false로 변경
// 		console.log('로그아웃함');
// 		handleClose(); // 모달 닫기
// 	};

// 	const handleLogin = () => {
// 		setIsLoggedIn(true); // 로그인 성공 시 로그인 상태를 true로 변경
// 		console.log('로그인함');
// 		handleClose(); // 모달 닫기
// 	};

// 	return (
// 		<>
// 			{!isLoggedIn ? (
// 				<Button variant="primary" onClick={handleShow}>
// 					로그인
// 				</Button>
// 			) : (
// 				<Button variant="danger" onClick={handleLogout}>
// 					로그아웃
// 				</Button>
// 			)}
// 			<Modal show={show} onHide={handleClose}>
// 				<Modal.Header closeButton>로그인 정보를 입력해주세요</Modal.Header>
// 				<Modal.Body>
// 					<div className="page">
// 						<div className="contentWrap">
// 							<div className="inputTitle">이메일 주소</div>
// 							<div className="inputWrap">
// 								<input
// 									className="input"
// 									placeholder="test@gmail.com"
// 									value={email}
// 									onChange={handleEmail}
// 								/>
// 							</div>

// 							<div className="errorMessageWrap">
// 								{!emailValid && email.length > 0 && (
// 									<div>올바른 이메일을 입력해주세요</div>
// 								)}
// 							</div>

// 							<div style={{ marginTop: '26px' }} className="inputTitle">
// 								비밀번호
// 							</div>
// 							<div className="inputWrap">
// 								<input
// 									type="password"
// 									className="input"
// 									placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력해주세요."
// 									value={pw}
// 									onChange={handlePassword}
// 								/>
// 							</div>
// 							<div className="errorMessageWrap">
// 								{!pwValid && pw.length > 0 && (
// 									<div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
// 								)}
// 							</div>

// 							<button
// 								onClick={onClickConfirmButton}
// 								disabled={notAllow}
// 								className="bottomButton"
// 							>
// 								로그인
// 							</button>
// 						</div>
// 					</div>
// 				</Modal.Body>
// 			</Modal>
// 		</>
// 	);
// }

// export default Login;

import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

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
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default Login;
