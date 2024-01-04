import React, { useState , useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { getAccessToken } from './utils/common';


function Create() {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    email: ''
  });
  const fileRef = useRef();
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const [searchParams] = useSearchParams();

  // Get category from URL parameters
  const category = searchParams.get('category');

  console.log(category, 'new');

  const username = sessionStorage.getItem('username')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const apiUrl = 'https://blogback-qong.onrender.com/api/v1/users/create';
  
    try {
      const blogFormData = new FormData();
      blogFormData.append('title', formData.title);
      blogFormData.append('desc', formData.desc);
      blogFormData.append('email', formData.email);
      blogFormData.append('categories', category);
      blogFormData.append('username', username);
      blogFormData.append('blogimg', fileRef.current.files[0]);
  
      const response = await axios.post(apiUrl, blogFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: getAccessToken()
        },
      });
  
      // Assuming you have a 'navigate' function defined somewhere
      navigate('/');
  
      if (response.status === 200) {
        // Handle successful response
        console.log('Form data successfully submitted!');
      } else {
        // Handle error response
        console.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <input
            type="text"
            className="form-control"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12">
        <div className="form-group">
          <label className="form-label">Blog Image</label>
          <input
            type="file"
            name="img"
            accept="image/*"
            ref={fileRef}
          />
        </div>
      </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Create;
