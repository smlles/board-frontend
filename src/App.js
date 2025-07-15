import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/pages/auth';
import Board from './components/pages/board';
import './styles/App.css';
import Post from './components/pages/board/[id]';
import WriteAndEdit from './components/pages/board/writeAndEdit';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import Modal from './components/pages/auth/Modal'; // Modal 컴포넌트 임포트
import ProfileEditForm from './components/pages/auth/ProfileEditForm'; // ProfileEditForm 컴포넌트 임포트
import { closeProfileModal } from './store'; // closeProfileModal 액션 임포트

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isProfileModalOpen = useSelector((state) => state.auth.isProfileModalOpen); // Redux 스토어에서 모달 상태 가져오기
  const dispatch = useDispatch();

  const handleCloseProfileModal = () => {
    dispatch(closeProfileModal());
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {isLoggedIn ? (
          <Routes>
            <Route path="/post" element={<Board />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/post/write" element={<WriteAndEdit />} />
             <Route path="/post/write/:id" element={<WriteAndEdit />} />
            <Route path="*" element={<Navigate to="/post" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Auth initialType="login" />} />
            <Route path="/register" element={<Auth initialType="register" />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
        {/* 프로필 모달을 App 컴포넌트에서 전역적으로 렌더링 */}
        <Modal isOpen={isProfileModalOpen} onClose={handleCloseProfileModal}>
          <ProfileEditForm onClose={handleCloseProfileModal} />
        </Modal>
      </BrowserRouter>
    </div>
  );
}

export default App;