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
import "../../../styles/auth.css"; // auth.css import
import { formatPostDate } from "../../../utils/dateUtils";
import Lucide from "../../common/Lucide"; // Lucide 컴포넌트 임포트

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); // 모든 게시글을 저장할 상태
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [totalPosts, setTotalPosts] = useState(0);

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
    const fetchAllPostsAndUser = async () => {
      try {
        const postsResponse = await boardApi.getPosts();
        setAllPosts(postsResponse.data.data.reverse()); // 모든 게시글 저장
        setTotalPosts(postsResponse.data.data.length); // 총 게시글 수 설정

        const userResponse = await authApi.getProfile();
        setCurrentUser(userResponse.data);
      } catch (error) {
        console.error("게시글 또는 사용자 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchAllPostsAndUser();
  }, []); // 컴포넌트 마운트 시 한 번만 모든 게시글 가져옴

  useEffect(() => {
    // 현재 페이지에 해당하는 게시글만 잘라내어 posts 상태에 설정
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setPosts(allPosts.slice(indexOfFirstPost, indexOfLastPost));
  }, [allPosts, currentPage, postsPerPage]);
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
              <td data-label="작성일">{formatPostDate(item.createDate)}</td>
              <td data-label="조회">{item.view}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-group">
        <Button type="button" onClick={logoutHandler} className="red-btn">
          로그아웃
        </Button>
        <Button type="button" onClick={goWritePost} className="blue-btn">
          글쓰기
        </Button>
        <Button type="button" onClick={profileModal} className="grey-btn">
          프로필
        </Button>
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>이전</button>
        {[...Array(Math.ceil(totalPosts / postsPerPage))].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalPosts / postsPerPage), prev + 1))} disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}>다음</button>

        <select onChange={(e) => {
          setPostsPerPage(Number(e.target.value));
          setCurrentPage(1); // 페이지당 게시글 수 변경 시 1페이지로 이동
        }} value={postsPerPage}>
          <option value={5}>5개씩 보기</option>
          <option value={10}>10개씩 보기</option>
          <option value={15}>15개씩 보기</option>
        </select>
      </div>

      {/* 프로필 모달 */}
      {/* 모달은 App.js에서 전역적으로 관리 */}
    </div>
  );
};

export default Board;