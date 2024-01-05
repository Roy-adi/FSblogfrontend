import React from 'react'

import Categories from '../Categories/Categories'
import AllBlogs from '../Allblogs/AllBlogs'

const Home = () => {
  return (
    <div className='home-wrap row'>
    <div className='col-md-3'> <Categories/> </div>
    <div className='col-md-8'> <AllBlogs/> </div>
    </div>
  )
}

export default Home
