import { useState } from "react";




// value, setValue 를 했을떄 value 랑 onChange로받았으니까 이거넣고
// 어떤걸 해주세요 요청사항은 placheholder 
// type = 텍스트냐, 패스워드냐 , 이메일이냐 ...
// 

// 로그인 화면이라고 가정된 상태
// id / pw 입력
// input 두개


const Input =({id,type,name,placeholder,className})=>{

    const [value,setValue] =useState("");
    const onChange=(e)=>{
        setValue(e.target.value)
    }
// 라벨 넣을수도 있고 안넣을수도 있어

    return(
        <div>
            {/* 라벨이 있어? 라벨을 렌더링해  */}
            {id?<label className="label" htmlFor={id}>{placeholder}</label>:null}
            <input
                className={className}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}


export default Input;
