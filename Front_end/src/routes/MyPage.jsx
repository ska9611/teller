import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 모듈 추가
import { useLocation } from 'react-router-dom';
import '../Mypage.css';
import profileImage from '../assets/profile1.jpg'; // 기본 이미지 경로

export default function MyPage() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 객체 생성
  const [userName, setUserName] = useState('');
  const [editingMode, setEditingMode] = useState(false); // 수정 모드 상태
  const info = useLocation().state.userInfo;
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
    fetchUserName(); // 컴포넌트가 마운트될 때 사용자 이름을 가져옴
  }, []); // 빈 배열을 전달하여 한 번만 호출되도록 설정

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

  const fetchUserName = async () => {
    try {
      const response = await axios.get(
        'http://192.168.10.100:3000/Users_info' // 사용자 정보를 가져오는 엔드포인트
      );
      const fetchedName = response.data.name; // 서버로부터 받은 이름
      setUserName(fetchedName); // 상태 업데이트
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
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
            <p> 닉네임 : {info.nickname} </p>
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
              <p> 성명 : {info.name} </p>
              <p> 성별 : {info.gender} </p>
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
                  <p>주소: {info.address}</p>
                  <p>전화번호: {info.phone}</p>
                </div>
              )}
            </div>
          </div>
          <div className="divide_line"></div>
          <br />
          <div className="mypage-container">
            <h2>찜한 도서목록</h2>
            <br />
            <div className="book-list"></div>
          </div>
        </div>
      </div>
      <div className="footer_right">
        © 2024 Tale:er <br />이 사이트는 react를 이용하여 제작하였습니다.
      </div>
    </div>
  );
}
