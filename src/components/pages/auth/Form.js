// AuthForm.jsx
import axios from "axios";
import { form } from "../../../constants/form";
import Input from "../../common/Input";
import { authApi } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../store";

const AuthForm = ({ formType, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    if (formType) {
      const formData = Object.fromEntries(new FormData(e.target).entries());
      console.log("Login data:", formData);

      try {
        const { data } =
          formType === "login"
            ? await authApi.login(formData)
            : await authApi.register(formData);

        if (formType === "login") {
          console.log("로그인 성공:", data);
          // Dispatch the loginSuccess action with user and token
          dispatch(loginSuccess({ user: data.user, token: data.token }));

          navigate("/post");
        }
        console.log("Login success:", data);
      } catch (err) {
        console.error(err);
        console.error("Login failed:", err.response?.status, err.response?.data);
        alert("요청 실패!");
      }
    }
  };

  return (
    <form className="form-group" onSubmit={submit}>
      <h2>{form[formType]}</h2>
      {/* 공통 필드 (로그인 & 회원가입) */}
      {["login"].includes(formType) && (
        <>
          <Input id="email" type="text" placeholder="이메일" name="email" />
          <Input
            id="password"
            type="password"
            placeholder="비밀번호"
            name="password"
          />
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
          />
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
          />
          <Input id="username" type="text" name="username" placeholder="이름" />
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
