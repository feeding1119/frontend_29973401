import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PostListPage from './pages/PostListPage';
import PostWritePage from './pages/PostWritePage';
import PostContentPage from './pages/PostContentPage';
import EditPage from './pages/EditPage';
import './App.css';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/list" element={<PostListPage />} />
        <Route path="/write" element={<PostWritePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/post/:id" element={<PostContentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
