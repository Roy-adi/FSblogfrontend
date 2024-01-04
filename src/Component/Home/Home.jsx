import React from 'react'
import AllPost from '../AllPost'
import Categories from '../Categories/Categories'

const Home = () => {
  return (
    <div className='home-wrap row'>
    <div className='col-md-3'> <Categories/> </div>
    <div className='col-md-8'> <AllPost/> </div>
      
    </div>
  )
}

export default Home
