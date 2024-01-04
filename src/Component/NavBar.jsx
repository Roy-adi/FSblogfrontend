// Nav.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from './DataProvider';
import { getRefreshToken } from './utils/common';
import axios from 'axios';
const NavBar = () => {
  const { account, setAccount } = useContext(DataContext);

  const handleLogout = async () => {
    // Get the refresh token from sessionStorage
    const refreshToken = sessionStorage.getItem('refreshToken');
  
    // If the refresh token exists, send it to the server for logout
    if (refreshToken) {
      try {
        const response = await axios.post('https://blogback-qong.onrender.com/api/v1/users/logout', { token: refreshToken }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: getRefreshToken(),
          },
        });
  
        if (response.status === 204) {
          console.log('Logout successful on the server');
        } else {
          console.error('Logout failed on the server');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  
    // Clear tokens from sessionStorage
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('username');
  
    // Update the account context to reflect logout
    setAccount({
      name: '',
      username: '',
      isLoggedIn: false,
    });
  };
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">FULLSTACK CRUD </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                ALL
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                CREATE
              </Link>
            </li>
            {account.isLoggedIn ? (
              <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    SignUp
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
