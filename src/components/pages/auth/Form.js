import { useState } from "react";
import axios from "axios";
import { form } from "../../../constants/form";
import Input from "../../common/Input";
import Cookies from "js-cookie";
import { authApi } from "../../../api/authApi";
import { loginSuccess } from "../../../store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AuthForm = ({ formType, children }) => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registrationSuccessMessage, setRegistrationSuccessMessage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 비밀번호 유효성 검사 함수
  const validatePassword = (pwd, confPwd) => {
    if (pwd.length < 6) {
      return '비밀번호는 6자리 이상이어야 합니다.';
    }
    if (confPwd && pwd !== confPwd) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword, confirmPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordError(validatePassword(password, newConfirmPassword));
  };

  const submit = async  (e) => {
    e.preventDefault();
    if(formType){
      const formData = Object.fromEntries(new FormData(e.target).entries()); 
       
      if (formType === 'register') {
        const error = validatePassword(formData.password, formData.confirmPassword);
        if (error) {
          setPasswordError(error);
          return; // 폼 제출 중단
        }
      } else if (formType === 'findPw') {
        try {
          const response = await authApi.resetPassword({ email: formData.email });
           console.log(response.data);
          const { tempPassword } = response.data;
         
          setMessage(`임시 비밀번호: ${tempPassword}. 이 비밀번호로 로그인 후 마이페이지에서 비밀번호를 재설정해주세요.`);
          alert(`임시 비밀번호: ${tempPassword}. 이 비밀번호로 로그인 후 마이페이지에서 비밀번호를 재설정해주세요.`);
          setTimeout(() => {
            navigate('/login');
          }, 5000); // 5초 후 로그인 페이지로 이동
        } catch (err) {
          setError('비밀번호 재설정 요청에 실패했습니다. 이메일을 확인해주세요.');
        }
        return; // 비밀번호 재설정 폼 제출 후 함수 종료
      }

      try{
      const { data } =  formType === 'login'
          ? await authApi.login(formData)
          : await authApi.register(formData);
            
       
       if (formType === 'login') {
          
       Cookies.set('token', data, {
              expires: 1,
              sameSite: 'Lax',
              secure: false,
          });
          
        dispatch(loginSuccess({ token: data, user: null }));
        navigate('/post')
      } else if (formType === 'register') {
        setRegistrationSuccessMessage('회원가입이 성공적으로 완료되었습니다. 잠시 후 로그인 페이지로 이동합니다.');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // 2초 후 이동
      }
       console.log("Operation success:", data);
    } catch (err) {
      console.error(err);
      console.error("Login failed:", err.response?.status, err.response?.data);
      let errorMessage = '요청 실패! 다시 시도해주세요.';
      if (err.response?.status === 401) {
        errorMessage = '아이디 또는 비밀번호가 잘못되었습니다.';
      }
      alert(errorMessage);
    }
  }
};

  return (
    <form className="form-group" onSubmit={submit}>
      <h2>{form[formType]}</h2>
      {registrationSuccessMessage && (
        <p className="success-message">
          {registrationSuccessMessage}
        </p>
      )}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      {/* 공통 필드 (로그인 & 회원가입) */}
        {["login"].includes(formType) && (
        <>
          <Input id="email" type="text" placeholder="이메일" name="email" />
          <Input id="password" type="password"  placeholder="비밀번호"name="password"/>
        </>
      )}
      {/* 회원가입 추가 필드 */}
      {formType === "register" && (
        <>
           <Input id="email" type="text" placeholder="이메일" name="email" />
          <Input 
            id="password" 
            type="password"  
            placeholder="비밀번호"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Input 
            id="confirmPassword" 
            type="password" 
            name="confirmPassword" 
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
           <Input id="username" type="text" name="username" placeholder="이름"/>
        </>
      )}
      {/* 아이디 찾기 */}
      {/* {formType === "findId" && (
        <>
          <Input id="email" type="email" name="email" placeholder="이메일" />
        </>
      )} */}

      {/* 비밀번호 재설정 */}
      {formType === "findPw" && (
        <>
          <p>혹시 아이디가 기억나지 않나요?</p>
          <p>아이디는 이메일입니다.</p>
         
          <Input id="email" type="email" name="email" placeholder="이메일" />
        </>
      )}
      {children}
    </form>
  );
};

export default AuthForm;
