import { useNavigate } from "react-router-dom";

export const post = [
  {
    id: 1,
    title: "게시판 프로젝트 시작합니다!",
    author: "관리자",
    date: "2025-06-27",
    views: 15,
  },
  {
    id: 2,
    title: "React Router 도입 후기",
    author: "양준혁",
    date: "2025-06-26",
    views: 23,
  },
  {
    id: 3,
    title: "JWT 인증 구현 방법",
    author: "devmaster",
    date: "2025-06-25",
    views: 42,
  },
  {
    id: 4,
    title: "Spring Boot와 MySQL 연동",
    author: "java맨",
    date: "2025-06-24",
    views: 31,
  },
  {
    id: 5,
    title: "Toast UI Editor 사용법",
    author: "프론트짱",
    date: "2025-06-23",
    views: 19,
  },
];


const Board=()=>{
const navigate = useNavigate();

    return(
        <div>
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
             
                {post.map((post)=>
                  <tr>
                    <td>{post.id}</td>
                     <td onClick={()=>navigate(`/post/${post.id}`)}>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.date}</td>
                    <td>{post.views}</td>
                 </tr>
                )}
                    {/* <td>게시글 map 돌리기</td> */}
              
               </tbody>
            </table>
        </div>
    )
}










export default Board;