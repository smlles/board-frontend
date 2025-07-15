import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation,useParams } from "react-router-dom";
import { list } from "../../../constants/Post";
import { Viewer } from "@toast-ui/react-editor";
import { boardApi } from "../../../api/boardApi";
import { authApi } from "../../../api/authApi";
import "../../../styles/board.css"; // board.css import
import { formatPostDate } from "../../../utils/dateUtils";

const Post=({deletePost})=>{
 
  // 게시글 id를 기준으로 불러옴
  const {id} = useParams();
  const navigate=useNavigate();
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 글 목록 불러오기 
        const postResponse = await boardApi.getPostById(id);
        setPost(postResponse.data.data[0]);

        // 사용자 정보 받기 (로그인 안했으면 여기서 짤림)
        try {
          const userResponse = await authApi.getProfile();
          setCurrentUser(userResponse.data);
        } catch (userError) {
          // 로그인하지 않은 사용자는 여기서 오류가 발생하지만, 정상적인 상황입니다.
          console.log("사용자 정보를 가져오는데 실패했습니다 (로그인되지 않았을 수 있습니다).");
        }

      } catch (err) {
        // 글 목록 부터 실패했을 떄 
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

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
  navigate(`/post/write/${post.id}`)
 }
// 삭제하기
 const DeletePost = async () => {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    console.log(`삭제 요청 시작: 게시글 ID = ${id}`);
    try {
      const response = await boardApi.deletePost(id);
      console.log('삭제 성공:', response);
      alert('삭제되었습니다.');
      navigate("/post"); // 삭제했으면 게시글 목록으로
    } catch (err) {
      console.error("게시글 삭제 실패:", err);
      if (err.response) {
        // 서버가 응답을 반환한 경우 (오류 상태 코드로)
        // console.error("서버 응답 데이터:", err.response.data);
        // console.error("서버 응답 상태:", err.response.status);
        // console.error("서버 응답 헤더:", err.response.headers);
      } else if (err.request) {
        // 요청은 이루어졌으나 응답을 받지 못한 경우
        // console.error("서버로부터 응답을 받지 못했습니다:", err.request);
      } else {
        // 요청을 설정하는 중에 오류가 발생한 경우
        // console.error("요청 설정 중 오류 발생:", err.message);
      }
      alert('게시글 삭제에 실패했습니다.');
    }
  }
 };


  return(
  <div className="post-detail-container">
    <h1 className="post-title">{post.title}</h1>
    <div className="post-meta">
      <div className="meta-left">
        <span>작성자 : {post.author}</span>
        <span>댓글 : {post.comments}</span>
        <span>조회수 : {post.view}</span>
      </div>
      <div className="meta-right">
        <span>좋아요: {post.likes}</span>
        <span>작성 시간 </span>
        <span>{formatPostDate(post.createDate)}</span>
      </div>
    </div>
    <div className="post-content">
        <Viewer initialValue={post.description} />
    </div>
        {/* 버튼 모음 */}
    <div className="post-button-group">
        {/* 목록으로 */}
      <button className="back-button" onClick={GoToBoardList}>목록으로</button>
        {/* 삭제하기 */}
        <div className="right-buttons">
      {currentUser && post.author === currentUser.email && (
        <>
          <button className="delete-button" onClick={DeletePost}>삭제</button>
          <button className="write-button" onClick={() => GoEditPost()}>수정</button>
        </>
      )}
        {/* 글쓰기 */}
      <button className="write-button" onClick={GoWritePost}>글쓰기</button>
      </div>
    </div>
  </div>
    
      
   
  )
}


export default Post;