// DataContext.js
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({
    name: '',
    username: '',
    isLoggedIn: false,
  });
  useEffect(() => {
    // Check for the existence of tokens in sessionStorage
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    const name = sessionStorage.getItem('name');
    const username = sessionStorage.getItem('username');
    // console.log(refreshToken, 'con');
    // console.log(accessToken, 'context');
    if (accessToken && refreshToken && name && username) {
      // Set the account context with user information and isLoggedIn status
      setAccount({
        name,
        username,
        isLoggedIn: true,
      });
    }
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const values = {
    account,
    setAccount,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

export default DataProvider;



// export const getAllPosts = async (request, response) => {
//   let category = request.query.category;
//   let posts;
//   try {
//       if (category) 
//           posts = await Post.find({ categories: category });
//       else 
//           posts = await Post.find({});
          
//       response.status(200).json(posts);
//   } catch (error) {
//       response.status(500).json(error)
//   }
// }