import { useNavigate } from "react-router-dom";
// import './PostDetail.css'
// import "../App.css"
import { useLocation,useParams } from "react-router-dom";
import { list } from "../../../constants/Post";
import { Viewer } from "@toast-ui/react-editor";


const Post=({deletePost})=>{
  
  // 게시글 id를 기준으로 불러옴
  const {id} = useParams();
  const navigate=useNavigate();

  const post =list.find((p)=>p.id===parseInt(id));

  // 메인화면으로
  const GoToBoardList=()=>{
    navigate(-1)
  }
// 글쓰기 화면으로
  const GoWritePost=()=>{
  navigate('/write')
}
// 수정 화면으로
 const GoEditPost=()=>{
  navigate(`/edit/${post.id}`)
 }
// 삭제하기
 const DeletePost=()=>{
  if(window.confirm("정말 삭제하시겠습니까?")){
    deletePost(post.id);
    alert('삭제되었습니다.')
    navigate("/"); //삭제 했으면 메인으로
  }
 }


  return(
  <div className="post-detail-container">
    <h1 className="post-title">{post.title}</h1>
    <div className="post-meta">
      <div className="meta-left">
        <span>작성자 : {post.author}</span>
        <span>댓글 : {post.comments}</span>
        <span>조회수 : {post.views}</span>
      </div>
      <div className="meta-right">
        <span>좋아요: {post.likes}</span>
        <span>작성 시간 </span>
        <span>{post.createdAt}</span>
      </div>
    </div>
    <div className="post-content">
        <Viewer initialValue={post.descriptionHTML} />
    </div>
        {/* 버튼 모음 */}
    <div className="post-button-group">
        {/* 목록으로 */}
      <button className="back-button" onClick={GoToBoardList}>목록으로</button>
        {/* 삭제하기 */}
      <button className="delete-button" onClick={DeletePost}>삭제</button>
        {/* 수정하기 */}
      <button className="write-button" onClick={()=>GoEditPost()}>수정</button>
        {/* 글쓰기 */}
      <button className="write-button" onClick={GoWritePost}>글쓰기</button>
    </div>
  </div>
    
      
   
  )
}


export default Post;