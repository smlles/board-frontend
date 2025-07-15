import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout, openProfileModal } from "../../../store";
import { useEffect, useState } from "react";
import { boardApi } from "../../../api/boardApi";
import Modal from "../auth/Modal"; // Modal 컴포넌트 임포트
import ProfileEditForm from "../auth/ProfileEditForm"; // ProfileEditForm 컴포넌트 임포트
import { authApi } from "../../../api/authApi";
import "../../../styles/board.css"; // board.css import

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const logoutHandler = () => {
    dispatch(logout());
  };
  const goWritePost=()=>{
    navigate('/post/write')
  }

  const profileModal = () => {
    dispatch(openProfileModal()); // Redux 액션 디스패치
  };

  useEffect(() => {
    const fetchPostsAndUser = async () => {
      try {
        const postsResponse = await boardApi.getPosts();
        // 최신 글이 위로 오도록 순서 뒤집기
        setPosts(postsResponse.data.data.reverse());

        const userResponse = await authApi.getProfile();
        setCurrentUser(userResponse.data);
      } catch (error) {
        console.error("게시글 또는 사용자 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchPostsAndUser();
  }, []);
  console.log(posts)
  return (
    
    <div className="board-container">
      <h2>게시판</h2>

      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item) => (
            <tr key={item.id}>
              <td data-label="번호">{item.id}</td>
              <td
                data-label="제목"
                onClick={() => navigate(`/post/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                {item.title}
              </td>
              <td data-label="작성자">{currentUser && item.author === currentUser.email ? currentUser.username : item.author.split('@')[0]}</td>
              <td data-label="작성일">{item.createDate}</td>
              <td data-label="조회">{item.view}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-group">
        <Button type="button" onClick={logoutHandler} className="grey-btn">
          로그아웃
        </Button>
        <Button type="button" onClick={goWritePost} className="blue-btn">
          글쓰기
        </Button>
        <Button type="button" onClick={profileModal} className="grey-btn">
          프로필
        </Button>
      </div>

      {/* 프로필 모달 */}
      {/* 모달은 App.js에서 전역적으로 관리 */}
    </div>
  );
};

export default Board;