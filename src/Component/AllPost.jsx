import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import './Allpost.css'
import { DataContext } from './DataProvider';
const AllPost = () => {
  const [blogs, setBlogs] = useState([]);

  const { account } = useContext(DataContext); 

  // console.log(account.username, 'UN');
  
  const [searchParams] = useSearchParams();

  // Get category from URL parameters
  const category = searchParams.get('category');
   
  
 
  const getAllblogs = async () => {
    const apiurl = 'https://blogback-qong.onrender.com/api/v1/users/all';
    try {
      const response = await axios.get(apiurl, {
        params: { category },
      });
      console.log('API Response:', response.data); // Add this line
      setBlogs(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://blogback-qong.onrender.com/api/v1/users/delete/${id}`);
      if (response.data.success) {
        // Update the state to reflect the deleted post
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        console.log('Post successfully deleted!', response.data.message);
      } else {
        console.error('Failed to delete post. Response:', response.data.message);
      }
      getAllblogs()
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllblogs();
  }, [category]);


  const addElipses = (str, limit)=>{
    return str.length > limit ? str.substring(0,limit) + '...' : str
  }

  return (
    <div className='container'>
      <div className='row'>
        {blogs?.map((item) => (
          <div className='col-md-4' key={item._id}>
         <Link to={`/blog/${item._id}`}>
         <div className="main">
         <div className="cards">
           <div className="cards_item">
             <div className="card">
               <div className="card_image">
                 <img src={item.blogimg} alt="mixed vegetable salad in a mason jar." />
               </div>
               {account.username === item.username && (
                 <>
                   <Link to={`/update/${item._id}`}><button className='edit_btn'>Edit</button></Link>
                   <Link><button onClick={() => handleDelete(item._id)} className='delete_btn'>Delete</button></Link>
                 </>
               )}
               <h2 className="card_title">  {addElipses(item.title,15)} </h2> 
               <div className="card_content">
                 
                 <div className="card_text">
                   <p> {addElipses(item.desc, 50)} </p>
                   
                 </div>
               </div>
             </div>
           </div>
         </div>
        </div>
         </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPost;



