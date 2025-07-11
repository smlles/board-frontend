
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/pages/auth';
import Board from './components/pages/board';
import './styles/App.css';
import Post from './components/pages/board/[id]';
import Write from './components/pages/board/write';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? (
          <Routes>
            <Route path="/post" element={<Board />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/post/write" element={<Write />} />
             <Route path="/post/write/:id" element={<Write />} />
            <Route path="*" element={<Navigate to="/post" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Auth initialType="login" />} />
            <Route path="/register" element={<Auth initialType="register" />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App; 
