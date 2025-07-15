import { useNavigate,useParams } from "react-router-dom";
import { useEffect,useState,useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css'
import { boardApi } from "../../../api/boardApi";
import "../../../styles/board.css"; // board.css import


const Write=()=>{
  const navigate=useNavigate();
  const editorRef=useRef();
  const {id} =useParams();
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const { data } = await boardApi.getPostById(id);
          const postData = data.data[0]; // 단일 게시글 데이터는 배열 안에 있으므로 [0]으로 접근
          setTitle(postData.title);
          setDescription(postData.description); // 마크다운으로 받는중 
          if (editorRef.current) {
            editorRef.current.getInstance().setMarkdown(postData.description);
          }
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;
  

  

  // 두개를 합칠까...?
  const ChangeTitle =(e)=>{
    setTitle(e.target.value)
  }
  

// 등록 버튼 눌렀을 때 
  const HandleSubmit= async ()=>{
    const contentMarkdown = editorRef.current.getInstance().getMarkdown();
    // request.getHeader("Authorization");

    const contentHTML = editorRef.current.getInstance().getHTML();
    const postData={
      title,
      description:contentMarkdown,
      descriptionHTML:contentHTML,
      // author:"임시사용자", // 실제 사용자 정보로 변경 필요
    }

    try {
      if (id) {
        // 수정
        await boardApi.updatePost({ ...postData, id });
        alert('게시글이 수정되었습니다.');
      } else {
        // 작성
        await boardApi.createPost(postData);
        alert('게시글이 작성되었습니다.');
      }
      navigate("/post"); // 작성 또는 수정 후 게시글 목록으로 이동
    } catch (err) {
      console.error("게시글 저장 실패:", err);
      alert('게시글 저장에 실패했습니다.');
    }
  }
  

  return(
    <div className="write-post-container">
      <h1>작성 중... </h1>
        <input 
          className="write-post-input" 
          type='text' 
          placeholder="제목"
          value={title} 
          onChange={(e)=>ChangeTitle(e)}
        />
        <Editor 
         ref={editorRef}
        previewStyle="vertical"
        height="400px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        initialValue={description}
        key="create"
        />
        {/* 버튼들 */}
      <div className="write-button-group">
          {/* 취소버튼 -> 메인으로 보냄 */}
        <button 
          className="cancel-button" 
          onClick={()=>navigate('/')}>취소</button>
          {/* 등록버튼, 등록 후 메인으로 보냄 */}
        <button 
          className="submit-button"
          onClick={HandleSubmit}>등록</button>
      </div>
    </div>
  )
}


export default Write;