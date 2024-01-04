import React from 'react'
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './Categories.css'
import { Link, useSearchParams } from 'react-router-dom';
const Categories = () => {

    const categories = [
        { id: 1, type: "Music" },
        { id: 2, type: "Spritual" },
        { id: 3, type: "Sports" },
        { id: 4, type: "Tech" },
        { id: 5, type: "Fashion" },
        { id: 6, type: "Movies" }
    ];
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

  return (
    <div className='cate-wrap'>
    <div className='create-button'>
      <Link to={`/create?category=${category || ''}`}>
        <FontAwesomeIcon icon={faPlusCircle} /> Create blog
      </Link>
    </div>
    <div className='cate-list'>
      <ul className='list-wrap'>
        {categories.map(category => (
          <Link key={category.id} to={`/?category=${category.type}`}>
            <li className='list-item'>{category.type}</li>
          </Link>
        ))}
      </ul>
    </div>
  </div>
  )
}

export default Categories