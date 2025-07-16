// import { useNavigate } from "react-router-dom";




const Button=({className,type,name,disabled,children , toggle})=>{

    

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