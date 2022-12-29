import React from 'react'
import Categories from '../components/Categories'
import Navbar from '../components/Navbar'
import Navbardetail from '../components/Navbardetail'


const Category = (props) => {
  return (
    <div>
        <div className='hidden md:block'>
        <Navbardetail/>
        </div>
        <div className='block md:hidden'>
        <Navbardetail/>
        
        </div>
        <Categories value={true} />
        
    </div>
  )
}

export default Category