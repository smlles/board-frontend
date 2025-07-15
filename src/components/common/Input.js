import React from "react";

const Input =({id,type,name,placeholder,className, value, onChange, ...props})=>{

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
                {...props}
            />
        </div>
    )
}


export default Input;