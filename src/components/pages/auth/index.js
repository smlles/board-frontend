// Auth.jsx
import { useState } from "react";
import AuthForm from "./Form";
import "../../../styles/auth.css";
import { form } from "../../../constants/form";
import Button from "../../common/Button/Button";

const Auth = () => {

  // formType = login | register | findId | findPw
  const [formType, setFormType] = useState("login");

  const toggleAuth = () =>
    setFormType((prev) => (prev === "login" ? "register" : "login"));
  const toggle = (type) => setFormType(type);

  return (
      <AuthForm formType={formType}>
        <div className="button-group">
            <button className="blue-btn">
               {formType.includes("find") ? form["send"] : form[formType]}
            </button>
          <Button type={formType} toggle={toggleAuth} >
             {formType ==="login" ? form["register"] :form["cancle"]}
          </Button>
        </div>
        {formType === "login" && (
          <div className="footer">
            <p onClick={() => toggle("findId")}>아이디 찾기</p>
            <p onClick={() => toggle("findPw")}>비밀번호 재설정</p>
          </div>
        )}
      </AuthForm>
  );
};

export default Auth;
