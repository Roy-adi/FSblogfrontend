import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Component/NavBar';
import Create from './Component/Create';
import Update from './Component/Update';
import Signup from './Component/Auth/Signup';
import Login from './Component/Auth/Login';
import DataProvider, { DataContext } from './Component/DataProvider';
import Profile from './Component/Profile';
import Home from './Component/Home/Home';
import Blogdetails from './Component/BlogDetails/Blogdetails';
import News from './Component/News/News';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './Component/Contact/Contact';

function App() {
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <NavBar />
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/create' element={<PrivateRoute component={<Create />} />} />
            <Route path='/update/:id' element={<Update />} />
            <Route path='/blog/:id' element={<Blogdetails />} />
          </Routes>
          <News />
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

const PrivateRoute = ({ component }) => {
  // Assuming DataContext provides the account information
  const { account } = useContext(DataContext);

  return account.isLoggedIn ? (
    component
  ) : (
    <Navigate to='/login' replace={true} />
  );
};

export default App;
