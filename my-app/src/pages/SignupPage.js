import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



const SignupPage = () => {
  const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      const signupData = { userId, password };
      try {
        const response = await axios.post('http://localhost:8080/user/signup', signupData);
  
        if (response.status === 200) {
          navigate('/');
        } 
      } catch (error) {
        alert(error.response.data);
      }
    };
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4">회원가입</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">아이디</label>
              <input
                type="text"
                className="form-control"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">비밀번호</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          
            <button type="submit" className="btn btn-primary w-100 mb-2" >회원가입</button>
          </form>
        </div>
      </div>
    );
};

export default SignupPage;