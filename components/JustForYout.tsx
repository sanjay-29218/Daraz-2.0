import React from 'react'
import data from '../utils/flashdata'
import { Swiper, SwiperSlide } from 'swiper/react';
import Product from './Product';
import 'swiper/css';
type Props = {}

const JustForYout = (props: Props) => {
  return (
    <div className=' mt-[2rem]   md:pb-[10rem] md:px-[10rem]' id='forYou'>
    <h1 className='text-[2rem] mb-5'>Just For You</h1>
     <Swiper
  spaceBetween={10}
  slidesPerView={3}
  // onSlideChange={() => console.log('slide change')}
  // onSwiper={(swiper:any) => console.log(swiper)}
>
    {data.products.map((product:any) => (
        <SwiperSlide key={product.id}>
            <Product
                id={product.id}
                name={product.name}
                slug={product.slug}
                category={product.category}
                image={product.image}
                price={product.price}
                brand={product.brand}
                rating={product.rating}
                numReviews={product.numReviews}
                countInStock={product.countInStock}
                description={product.description}
                discountedPrice={product.discountedPrice}
            />
            
            </SwiperSlide>
            ))}
</Swiper>

    
</div>
  )
}

export default JustForYout