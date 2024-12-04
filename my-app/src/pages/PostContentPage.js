import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일 불러오기

const PostContentPage = () => {
  const [post, setPost] = useState(null);
  const { id }  = useParams();
  const navigate = useNavigate();

  const fetchPostContent = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/post/${id}/content`);
      console.log(response.data);
      setPost(response.data);  
    } catch (error) {
        alert(error.response.data);
      
    }
  };

  const handleEditClick = () => {
    const sessionUserId = sessionStorage.getItem('userId');
    if (sessionUserId !== post.userId) {
      alert('본인만 수정할 수 있습니다.');
    } else {
        navigate(`/edit/${id}`);
    }
  };
  useEffect(() => {
    fetchPostContent();
  }, [id]);  

  return  post ? (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1>{post.title}</h1>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>작성자:</strong> {post.userId}</p>
          <p className="card-text"><strong>조회수:</strong> {post.views}</p>
          <p className="card-text"><strong>등록일:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
          <hr />
          <p className="card-text"><strong>내용:</strong></p>
          <div className="border p-3 rounded">{post.content}</div>
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-primary me-3" onClick={() => navigate('/list')}>
            목록으로 돌아가기
          </button>
          <button className="btn btn-secondary" onClick={handleEditClick}>
            수정
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PostContentPage;
