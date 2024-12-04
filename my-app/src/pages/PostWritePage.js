import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      navigate('/'); 
    }
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    
    const strippedContent = content.replace(/<(?!img\s).*?>/g, ''); 
    formData.append('content', strippedContent);

    formData.append('userId', sessionStorage.getItem('userId'));
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('http://localhost:8080/post/write', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });

      if (response.status === 200) {
        alert('글이 성공적으로 작성되었습니다.');
        navigate('/list'); 
      }else{
        alert('글쓰기 실패');
        navigate('/'); 
      }
    } catch (error) {
      alert(error.response.data);
    }
  };

  const quillRef = React.useRef();

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ align: [] }],
      ['clean'],
    ],
  };

  return (
    <div className="container mt-5">
      <h1>글쓰기</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">제목</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">내용</label>
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="내용을 입력하세요"
            theme="snow"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">파일 첨부</label>
          <input
            type="file"
            id="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">작성</button>
      </form>
    </div>
  );
};

export default WritePage;
