import React, { useContext, useEffect, useState } from 'react';
import './Blogdetails.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaFacebook, FaTwitter, FaInstagram, FaGooglePlus } from 'react-icons/fa';
import { DataContext } from '../DataProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Blogdetails = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  const { account } = useContext(DataContext);
  const navigate = useNavigate()
  const getBlog = async () => {
    try {
      const response = await axios.get(`https://blogback-qong.onrender.com/api/v1/users/post/${id}`);
      setBlog(response);
      console.log(response, 'blog');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://blogback-qong.onrender.com/api/v1/users/delete/${id}`);
      if (response.data.success) {
        // Update the state to reflect the deleted post
        setBlog((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        console.log('Post successfully deleted!', response.data.message);
      } else {
        console.error('Failed to delete post. Response:', response.data.message);
      }
      navigate('/')
      toast.success('Successfully Deleted');
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <section className="blog-sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="blog-box2">
              <div className="blo-img">
                <img className="img-responsive" src={blog.data?.data.blogimg} alt="" />
              </div>
              <div className="blog-dtl-txt">
                <div className="event-sechudle">
                  <div className="date bg-sky-blue">
                    <h4>15 <span>JUN</span></h4>
                  </div>
                  <h3>{blog.data?.data.title}</h3>
                </div>
                <p> {blog.data?.data.desc}</p>
                <ul className="blog-details-inner">
                  <li>* Username: {blog.data?.data.username}</li>
                  <li>* Category: {blog.data?.data.categories}</li>
                </ul>
                <div className="blog-footr-prt">
                  <ul className="blog-social">
                    <li>Share this on:</li>
                    <li>
                      <a href="#">
                        <FaFacebook size="2em" style={{ color: "#245ec2" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FaTwitter size="2em" style={{ color: "#1da1f2" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FaInstagram size="2em" style={{ color: "#c32aa3" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FaGooglePlus size="2em" style={{ color: "#dd4b39" }} />
                      </a>
                    </li>
                  </ul>
                  { account.username === blog.data?.data?.username && (
                    <>
                    <div className='auth-btn-wrap'>
                    <Link to={`/update/${blog.data?.data?._id}`}><button className='auth-btn'>Update</button> </Link> 
                    <button className='auth-btn' onClick={() => handleDelete(blog.data?.data?._id)}>Delete</button>
                    </div>
                    </>
                  ) }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogdetails;
