import React, { useContext, useEffect, useState } from 'react';
import './AllBlogs.css';
import { Link, useSearchParams } from 'react-router-dom';
import { DataContext } from '../DataProvider';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 6;

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { account } = useContext(DataContext);
  const [searchParams] = useSearchParams();
  const [activePage, setActivePage] = useState(0);
  const category = searchParams.get('category');

  const getAllBlogs = async () => {
    const apiurl = 'https://blogback-qong.onrender.com/api/v1/users/all';
    try {
      const response = await axios.get(apiurl, {
        params: { category },
      });
      setBlogs(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, [category]);

  const handlePageClick = (data) => {
    setActivePage(data.selected);
  };

  const addElipses = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
  };

  const formatDate = (createdAt) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Date(createdAt).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const paginatedBlogs = blogs.slice(activePage * ITEMS_PER_PAGE, (activePage + 1) * ITEMS_PER_PAGE);

  return (
    <>
      <div className='container'>
        <div className='row'>
          {paginatedBlogs.map((item) => (
            <div className='col-md-6' key={item._id}>
              <div className='blog-body'>
                <Link to={`/blog/${item._id}`} className='blog-card'>
                  <div className='meta'>
                    <div className='photo' style={{ backgroundImage: `url(${item.blogimg})` }}></div>
                    <ul className='details'>
                      <li className='author'>
                        <a href='#'> {item.username} </a>
                      </li>
                      <li className='date'>{formatDate(item.createdAt)}</li>
                      <li className='category'>{item.categories}</li>
                    </ul>
                  </div>
                  <div className='description'>
                    <h1>{addElipses(item.title, 15)}</h1>
                    <p>{addElipses(item.desc, 50)}</p>
                    <p className='read-more'>
                      <a href='#'>Read More</a>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='pagination-container'>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(blogs.length / ITEMS_PER_PAGE)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </>
  );
};

export default AllBlogs;
