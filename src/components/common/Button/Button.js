// import { useNavigate } from "react-router-dom";




const Button=({className,type,name,disabled,children , onClick})=>{

    

    return(

        <button
            className={className}
            type={type}
            name={name}
            onClick={onClick}  
            disabled={disabled}
        >
        {children}
        </button>
    )
}

export default Button;