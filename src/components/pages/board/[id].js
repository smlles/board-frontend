import { useParams } from "react-router-dom";


const Post=()=>{
 const {id} = useParams();

    return(
        <div>
            <p>{id}만들 예정</p>
        </div>
    )
}


export default Post;