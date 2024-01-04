import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css'
const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your form submission logic here using formData
    const apiUrl = 'https://blogback-qong.onrender.com/api/v1/users/signup';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
       navigate('/')
      if (response.ok) {
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

    <div className='secwrap'>
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <div className="input">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <input
            
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">
          Sign up
        </button>
        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
    </div>
    
  );
};

export default Signup;
