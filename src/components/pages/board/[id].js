import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation,useParams } from "react-router-dom";
import { list } from "../../../constants/Post";
import { Viewer } from "@toast-ui/react-editor";
import { boardApi } from "../../../api/boardApi";
import { authApi } from "../../../api/authApi";
import "../../../styles/board.css"; // board.css import
import { formatPostDate } from "../../../utils/dateUtils";
import { commentApi } from "../../../api/commentApi";

const Post=({deletePost})=>{
 
  // 게시글 id를 기준으로 불러옴
  const {id} = useParams();
  const navigate=useNavigate();
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);       // 댓글 목록
  const [newComment, setNewComment] = useState("");   // 입력창 내용

   // ================== 데이터 불러오기 ==================
  const fetchPost = async () => {
    try {
      const postRes = await boardApi.getPostById(id);
      setPost(postRes.data.data[0]);

      try {
        const userRes = await authApi.getProfile();
        setCurrentUser(userRes.data);
      } catch {
        console.log("로그인하지 않은 사용자");
      }

      await fetchComments();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await commentApi.getCommentsByBoardId(id);
      setComments(res.data.data);
    } catch (err) {
      console.error("댓글 조회 실패:", err);
    }
  };

  useEffect(() => {
    fetchPost();
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
  navigate('/post/write')
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
// 댓글 관련 이벤트
  const handleAddComment = async () => {
    if (!newComment.trim()) return alert("댓글을 입력하세요.");

    const data = {
      boardId: id,
      content: newComment,
      author: currentUser.username,
    };

    try {
      await commentApi.createComment(data);
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("댓글 작성 실패:", err);
      alert("댓글 작성에 실패했습니다.");
    }
  };
  const handleDeleteComment = async (commentId, author) => {
    if (!currentUser || currentUser.username !== author)
      return alert("삭제 권한이 없습니다.");

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await commentApi.deleteComment(commentId);
      fetchComments();
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
      alert("댓글 삭제에 실패했습니다.");
    }
  };



  return(
  <div className="post-detail-container">
    <h1 className="post-title">{post.title}</h1>
    <div className="post-meta">
      <div className="meta-left">
        <span>작성자 : {post.author?.split('@')[0]}</span>
        <span>댓글 : {post.commentCount}</span>
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
         {/* ================== 댓글 섹션 ================== */}
      <div className="comments-section">
        <h3>💬 댓글</h3>
        <div className="comment-list">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="comment-item">
                <strong>{c.author}</strong>
                <p>{c.content}</p>
                {currentUser && currentUser.username === c.author && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteComment(c.id, c.author)}
                  >
                    삭제
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>아직 댓글이 없습니다.</p>
          )}
           {currentUser && (
          <div className="comment-input">
            <textarea
              placeholder="댓글을 입력하세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>등록</button>
          </div>
        )}
      </div>
      </div>
    
        {/* 버튼 모음 */}
    <div className="post-button-group">
        {/* 목록으로 */}
      <button className="back-button" onClick={GoToBoardList}>목록으로</button>
        {/* 삭제하기 */}
        <div className="right-buttons">
      {currentUser && post.author === currentUser.username && (
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