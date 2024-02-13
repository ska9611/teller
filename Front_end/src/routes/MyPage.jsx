import React, { useState, useEffect } from 'react';

import '../Mypage.css';
import profileImage from '../assets/profile1.jpg'; // 기본 이미지 경로

export default function MyPage() {
  const [recentBooks, setRecentBooks] = useState([]); // 최근에 클릭한 책 목록 상태
  // 최근에 클릭한 책 목록을 업데이트하는 함수
  const updateRecentBooks = (book) => {
    setRecentBooks((prevBooks) => [book, ...prevBooks.slice(0, 4)]); // 최대 5개까지만 유지
  };

  const [editingMode, setEditingMode] = useState(false); // 수정 모드 상태
  const [address, setAddress] = useState(
    '서울특별시 강남구 강남대로98길 16 2층'
  ); // 사용자 주소 상태
  const [phoneNumber, setPhoneNumber] = useState('010-3966-1234'); // 사용자 전화번호 상태

  // 정보 수정 버튼 클릭 시 수정 모드 활성화
  const handleEditButtonClick = () => {
    setEditingMode(true);
  };

  // 정보 저장 버튼 클릭 시 수정 모드 비활성화
  const handleSaveButtonClick = () => {
    setEditingMode(false);
    // 변경된 정보를 서버에 저장하는 로직 추가
  };

  const [profilePic, setProfilePic] = useState(''); // 프로필 사진 상태

  useEffect(() => {
    // 페이지가 로드될 때 로컬 스토리지에서 프로필 사진을 가져옴
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  // 프로필 사진 변경 핸들러
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0]; // 업로드된 파일
    const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성
    reader.onload = () => {
      const dataURL = reader.result; // 데이터 URL로 변환된 이미지
      setProfilePic(dataURL); // 상태 업데이트
      localStorage.setItem('profilePic', dataURL); // 로컬 스토리지에 저장
    };
    reader.readAsDataURL(file); // 파일을 읽어 data URL로 변환
  };

  return (
    <div style={{ padding: '30px' }}>
      <div className="mypage-container">
        <div className="flex-container">
          <div className="profile-container">
            <img
              src={profilePic || profileImage} // 저장된 이미지가 없으면 기본 이미지를 표시
              alt="프로필 이미지"
              className="profile-image"
            />
            <p> 닉네임 : 모찌피치모찌피치 </p>
            {/* 위를 <p> 닉네임 : {userData.nickname} </p> */}
            <div className="button-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
              <button> 프로필 변경</button>
              <button onClick={handleEditButtonClick}> 정보 수정</button>
            </div>
          </div>

          <div className="info-container">
            <div className="user-info-container">
              <h2>회원 정보</h2>
              <p> 성명 : 김수지 </p>
              <p> 성별 : 여성 </p>
              {editingMode ? (
                <div>
                  <label>주소: </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <br />
                  <label>전화번호: </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <br />
                  <button onClick={handleSaveButtonClick}>저장</button>
                </div>
              ) : (
                <div>
                  <p>주소: {address}</p>
                  <p>전화번호: {phoneNumber}</p>
                </div>
              )}
            </div>

            <div className="divide_line"></div>

            <div className="recent-books-container">
              <h2>최근 읽은 도서목록</h2>
              {recentBooks.map((book, index) => (
                <div key={index}>
                  <p>{book.title}</p>
                  {/* 여기에 책의 다른 정보 출력 */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="footer_right">
        © 2024 Tale:er <br />이 사이트는 react를 이용하여 제작하였습니다.
      </div>
    </div>
  );
}
