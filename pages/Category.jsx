import React from 'react'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Navbardetail from '../components/Navbardetail'


const Category = (props) => {
  return (
    <div>
        <div className='hidden md:block'>
        <Navbardetail />
        </div>
        <div className='block md:hidden'>
        <Navbardetail isHome/>
        
        </div>
        <Categories value={true} />
        <Footer/>
        
    </div>
  )
}

export default Category