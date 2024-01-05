import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from './DataProvider';
import { getRefreshToken } from './utils/common';
import axios from 'axios';
import './Menu.css';

const Menu = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { account, setAccount } = useContext(DataContext);

  const handleToggleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');

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

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('username');

    setAccount({
      name: '',
      username: '',
      isLoggedIn: false,
    });

    setIsNavOpen(false); // Close the navigation after logout
  };

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  const renderLoginLogoutButton = () => {
    if (account.isLoggedIn) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/profile" onClick={handleLinkClick}>
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => { handleLogout(); }}>
              Logout
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/signup" onClick={handleLinkClick}>
              SignUp
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={handleLinkClick}>
              Login
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <div>
      <nav>
        <div className="logo">
          <h2>Ray Blogs</h2>
        </div>
        <ul className={isNavOpen ? 'slide' : ''}>
          <li><Link to="/" onClick={handleLinkClick}>ALL</Link></li>
          <li><Link to="/create" onClick={handleLinkClick}>CREATE</Link></li>
          {renderLoginLogoutButton()}
        </ul>
        <div className={`menu-bars ${isNavOpen ? 'open' : ''}`} id="toggle" onClick={handleToggleClick}>
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
