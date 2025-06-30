// AuthForm.jsx
import axios from "axios";
import { form } from "../../../constants/form";
import Input from "../../common/Input";
import Cookies from "js-cookie";
const AuthForm = ({ formType, children }) => {
  const submit = async  (e) => {
    e.preventDefault();
    if(formType){
      const formData = Object.fromEntries(new FormData(e.target).entries()); 
      try{
      const { data } = await axios.post(`http://localhost:5000/auth/${formType}`,formData)
       if (data && data.success) {
         Cookies.set("token", data.token, {
         expires: 1,
         //domain: "yourdomain.com",   // ← 여기에 당신의 도메인
         //secure: true,
         sameSite: "Strict",         // CSRF 방지
         });
        }
      }catch(err){
        console.warn(err);
      }
    }
  };

  return (
    <form className="form-group" onSubmit={submit}>
      <h2>{form[formType]}</h2>
      {/* 공통 필드 (로그인 & 회원가입) */}
        {["login", "register"].includes(formType) && (
        <>
          <Input id="username" type="text" placeholder="이메일" name="username" />
          <Input id="password" type="password"  placeholder="비밀번호"name="password"/>
        </>
      )}
      {/* 회원가입 추가 필드 */}
      {formType === "register" && (
        <>
           <Input id="username" type="text" name="username" placeholder="이름"/>
          <Input id="confirmPassword" type="password" name="confirmPassword" placeholder="비밀번호 확인"/>
          {/* <Input id="email" type="email" name="email" placeholder="이메일" /> */}
        </>
      )}
      {/* 아이디 찾기 */}
      {formType === "findId" && (
        <>
          <Input id="email" type="email" name="email" placeholder="이메일" />
        </>
      )}

      {/* 비밀번호 재설정 */}
      {formType === "findPw" && (
        <>
          <Input id="id" type="text" name="id" placeholder="아이디" />
          <Input id="email" type="email" name="email" placeholder="이메일" />
        </>
      )}
      {children}
    </form>
  );
};

export default AuthForm;
