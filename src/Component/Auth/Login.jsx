import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './auth.css';
import { DataContext } from '../DataProvider';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = 'https://blogback-qong.onrender.com/api/v1/users/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.accessToken && responseData.refreshToken) {
          sessionStorage.setItem('accessToken', `Bearer ${responseData.accessToken}`);
          sessionStorage.setItem('refreshToken', `Bearer ${responseData.refreshToken}`);
          sessionStorage.setItem('name', responseData.name);
          sessionStorage.setItem('username', responseData.username);
          setAccount({
            name: responseData.name,
            username: responseData.username,
            isLoggedIn: true,
          });
          navigate('/');
          toast.success('Successfully logged in!');
        } else {
          console.error('Invalid response structure:', responseData);
        }
      } else {
        console.error('Error submitting form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="secwrap">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>

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
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn">
            Log in
          </button>
          <p>
            Already have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
