
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Auth from './components/pages/auth';
import Board from './components/pages/board';
import './styles/App.css';
import Post from './components/pages/board/[id]';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           <Route path="/post" element={<Board/>}/>
           <Route path="/post/:id" element={<Post />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App; 
