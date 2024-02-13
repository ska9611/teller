import { useForm } from 'react-hook-form';
import './Register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://192.168.10.100:3000/Users_infoProc', data);

      if (response.data.user) {
        alert('회원가입이 완료되었습니다.');
        window.location.href = '/';
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };



  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="text"
        placeholder="test@email.com"
        aria-invalid={
          isSubmitted ? (errors.email ? 'true' : 'false') : undefined
        }
        {...register('email', {
          required: '이메일은 필수 입력입니다.',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: '이메일 형식에 맞지 않습니다.',
          },
        })}
      />
      {errors.email && <small role="alert">{errors.email.message}</small>}
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="****************"
        aria-invalid={
          isSubmitted ? (errors.password ? 'true' : 'false') : undefined
        }
        {...register('password', {
          required: '비밀번호는 필수 입력입니다.',
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            message: '8자 이상의 영어, 숫자, 특수문자를 모두 포함해야 합니다.',
          },
        })}
      />
      {errors.password && <small role="alert">{errors.password.message}</small>}

      {/* 이름 */}
      <label htmlFor="name">이름</label>
      <input
        id="name"
        type="text"
        placeholder="홍길동"
        {...register('name', {
          required: '이름은 필수 입력입니다.',
        })}
      />
      {errors.name && <small role="alert">{errors.name.message}</small>}
      {/* 닉네임 */}
      <label htmlFor="nickname">닉네임</label>
      <input
        id="nickname"
        type="text"
        placeholder="닉네임"
        {...register('nickname', {
          required: '닉네임은 필수 입력입니다.',
        })}
      />
      {errors.nickname && <small role="alert">{errors.nickname.message}</small>}

      {/* 전화번호 */}
      <label htmlFor="phone">핸드폰 번호</label>
      <input
        id="phone"
        type="text"
        placeholder="010-1234-5678"
        {...register('phone', {
          required: '전화번호는 필수 입력입니다.',
          pattern: {
            value: /\d{3}-\d{4}-\d{4}/,
            message: '전화번호 형식에 맞지 않습니다. (010-1234-5678)',
          },
        })}
      />
      {errors.phone && <small role="alert">{errors.phone.message}</small>}

      {/* 성별 선택 */}
      <label>성별</label>
      <div className="gender-radio-group">
        <input
          type="radio"
          id="male"
          value="male"
          {...register('gender', { required: '성별을 선택해주세요.' })}
        />
        <label htmlFor="male">남자</label>

        <input
          type="radio"
          id="female"
          value="female"
          {...register('gender', { required: '성별을 선택해주세요.' })}
        />
        <label htmlFor="female">여자</label>
      </div>
      {errors.gender && <small role="alert">{errors.gender.message}</small>}

      {/* 주소 입력 */}
      <label htmlFor="address">주소</label>
      <input
        id="address"
        type="text"
        placeholder="서울특별시 강남구"
        {...register('address', {
          required: '주소는 필수 입력입니다.',
        })}
      />
      {errors.address && <small role="alert">{errors.address.message}</small>}

      <button type="submit" disabled={isSubmitting}>
        회원가입
      </button>
      {isSubmitted && <small>회원가입 요청 중...</small>}
    </form>
  );
}

export default RegisterForm;
