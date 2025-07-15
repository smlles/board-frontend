// Auth.jsx
import { useState,useEffect } from "react";
import AuthForm from "./Form";
import "../../../styles/auth.css";
import { form } from "../../../constants/form";
import ToggleButton from "../../common/Button/ToggleButton";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Lucide from "../../common/Lucide"; // Lucide 컴포넌트 임포트


const Auth = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  // formType = login | register | findId | findPw
  const [formType, setFormType] = useState("login");
    const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: ""
  });

  const toggleAuth = () => {
    if (formType === 'findPw') {
      toggle('login');
    } else {
      const next = formType === 'login' ? 'register' : 'login';
      navigate(`/${next}`);
    }
  };   
  const toggle = (type) => setFormType(type);

   const pathType  = location.pathname.split('/')[1];   // 'login' or 'register'
  
   useEffect(() => {
    // formType 바뀔 때마다 폼 초기화
    setFormData({
      email: "",
      password: "",
      username: ""
    });
  }, [formType]);

  useEffect(() => {
    if (pathType && pathType !== formType) setFormType(pathType);
  }, [pathType]);




  return (
      <div className="auth-wrapper">
        <AuthForm formType={formType}>
          <div className="button-group">
              <button className="blue-btn">
                 <Lucide name="LogIn" size={16} /> {formType.includes("find") ? form["send"] : form[formType]}
              </button>
            <ToggleButton type="button" toggle={toggleAuth} >
               {formType === 'login' ? form["register"] : (formType === 'register' ? form["login"] : form["cancle"])}
            </ToggleButton>
          </div>
          {formType === "login" && (
            <div className="footer">
              {/* <p onClick={() => toggle("findId")}>아이디 찾기</p> */}
              <p onClick={() => toggle("findPw")}><Lucide name="HelpCircle" size={16} /> 비밀번호 재설정</p>
            </div>
          )}
        </AuthForm>
      </div>
  );
};

export default Auth;
