import React from 'react'
import Table from 'react-bootstrap/Table';

import { Link, useSearchParams } from 'react-router-dom';
const Categories = () => {

    const categories = [
        { id: 1, type: "Music" },
        { id: 2, type: "Movies" },
        { id: 3, type: "Sports" },
        { id: 4, type: "Tech" },
        { id: 5, type: "Fashion" }
    ];
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

  return (
    <div className='cate-wrap'>
      
     <Link to={`/create?category=${category || ''}`}> <button>Create blog</button> </Link> 
    
       <div className='cate-list'>
       <ul className='list-wrap'>
       {
        categories.map(category =>(
           <Link  key={category.id} to={`/?category=${category.type}`}>
            <li className='list-item'> {category.type} </li>
           </Link>
          
        ))
      }
       </ul>
       </div>
        
    </div>
  )
}

export default Categories