// Nav.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from './DataProvider';
import { getRefreshToken } from './utils/common';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Menu.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    toast.success('Successfully logged out!');
  
    // Update the account context to reflect logout
    setAccount({
      name: '',
      username: '',
      isLoggedIn: false,
    });
  };
  

  return (
    <div>
    <nav
    className="navbar navbar-expand-md navbar-dark"
    style={{ backgroundColor: "#595B83" }}
  >
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        <h2 className='blog-name'>Ray-Blogs</h2>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link to='/' className="nav-link active" aria-current="page" href="#">
              Home
            </Link>
          </li>
          <li className="nav-item">
          <Link to='/about' className="nav-link active" aria-current="page" href="#">
            About Us
          </Link>
        </li>
          <li className="nav-item"  >
            <a className="nav-link">Search </a>
          </li>
          <li className="nav-item">
            <Link to='/contact' className="nav-link">Contact</Link>
          </li>
 
          <div className='d-flex'> 
          { account.isLoggedIn? (
           <>
             <li className="nav-item dropdown" >
               <Link className='nav-link' to= '/profile'> Hello { "😊 " } {account.username} </Link>
             </li>
 
            <li className="nav-item" >
               <button className='nav-link' onClick={handleLogout}> Logout </button>
             </li>
           </>
         ) : (
           <>
           <li className="nav-item" >
           <Link className='nav-link' to= '/login'> Login </Link>
           </li>
           <li className="nav-item" >
           <Link className='nav-link' to= '/signup'> Signup </Link>
           </li>
           </>
         )} 
          </div>
        
 
        </ul>
      </div>
    </div>
    
  </nav>
    </div>
  );
};

export default NavBar;
