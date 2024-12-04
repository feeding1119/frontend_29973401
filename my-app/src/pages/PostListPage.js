import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const isLogin = !!sessionStorage.getItem('accessToken');

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/post/list', {
        params: {
          page: currentPage - 1, 
          size: postsPerPage,
          searchQuery: searchQuery || undefined, 
        },
      });


      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages); 
    } catch (error) {
      alert(error.response.data);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchPosts();
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPosts();
  };

  const handleWritePost = () => {
    if (isLogin) {
        navigate('/write'); 
    }else{
        alert("로그인이 필요합니다.");
        navigate('/'); 
    }
  };

  const handleLoginOut = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/');
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50 me-3"
          placeholder="제목이나 작성자ID로 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary me-3" onClick={handleSearch}>검색</button>
        <button className="btn btn-warning me-3" onClick={handleWritePost}>글쓰기</button>

        {isLogin ? (
          <button className="btn btn-danger" onClick={handleLoginOut}>로그아웃</button>
        ) : (
          <button className="btn btn-dark" onClick={handleLoginOut}>로그인</button>
        )}
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자ID</th>
            <th>조회수</th>
            <th>첨부파일</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} onClick={() => handlePostClick(post.id)}>
              <td>{post.title}</td>
              <td>{post.userId}</td>
              <td>{post.views}</td>
              <td>{post.hasFile ? '있음' : '없음'}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PostListPage;
