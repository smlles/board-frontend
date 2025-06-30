// import { useNavigate } from "react-router-dom";




const Button=({className,type,name,disabled,children , toggle})=>{

    // const navigate=useNavigate();

    // 버튼 클릭 이벤트
    // const onClick=()=>{
    //     if(name=="login"){

    //     }else if(name==="reigster"){
    //         // 버튼 name이 register면 거기로 보내줘
    //         navigate("/register")
    //     }
    // }

    return(

        <button
            className={className}
            type={type}
            name={name}
            onClick={toggle}  
            disabled={disabled}
        >
        {children}
        </button>
    )
}

export default Button;