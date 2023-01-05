import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductBox from "./ProductBox";

const JustForYout = ({ products,store,addToCartHandler }) => {
  return (
    <div className=" my-[3rem]   md:pb-[10rem] md:px-[10rem]" id="forYou">
      <h1 className="text-[2rem] mb-5">Just For You</h1>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper:any) => console.log(swiper)}
      >
        {products.map((product) => {
          return  store ? (
            product.store !== store.store ? (
              <SwiperSlide >
              <ProductBox
                key={product._id}
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </SwiperSlide>
            ) : null
          ) : (
            <SwiperSlide key={product._id}>
              <ProductBox
                key={product.id}
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </SwiperSlide>
          );
          })}
      </Swiper>
    </div>
  );
};

export default JustForYout;
