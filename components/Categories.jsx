import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import data from '../utils/flashdata'
const Categories = () => {
    const res = () =>{
        const uniqueCategory = [...new Set(data.products.map((item) => ([item.category,item.image])))]
        const finalCategory = [];
        const onlyCategory =[]
        uniqueCategory.forEach((item) => {
            if(!onlyCategory.includes(item[0])){
                onlyCategory.push(item[0])
                finalCategory.push(item)
            }
            
        })
            return finalCategory
    }
const final = res()
    // console.log(final)
    // shirts
    // console.log(uniqueCategory)
  return (
    <div className='  md:mt-[1rem] hidden md:block overflow-hidden md:p-[10rem]' id='category'>
        <h1 className='text-[2rem] mb-10'>Categories</h1>
       <div className='flex flex-wrap gap-2'>
        
       {final.map((item,i) => {
return (
    <div className='bg-white' >
        <div key={i} className=' w-[15rem] text-center hover:shadow-md '>
              <img src={item[1]   } alt={''} />
              <p>{item[0]}</p>
         </div>
        </div>
)
})
}

       </div>
        
    </div>
  )
}

export default Categories