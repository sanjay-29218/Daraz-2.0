import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import data from "../utils/flashdata";
import ProductBox from "./ProductBox";
import db from "../utils/db";
// import Product from "../models/ProductM"
const FlashSale = ({ products, store }) => {
  console.log(store)
  return (
    <div
      className="md:mt-[5rem] mt-[2rem] overflow-hidden  md:px-[10rem]"
      id="flash"
    >
      <h1 className="text-[2rem] mb-5">Flash Sale</h1>
      <Swiper spaceBetween={10} slidesPerView={3}>
        {products.map((product) => (
           store ? (
          product.store !== store.store ? (
            <SwiperSlide >
            <ProductBox
              key={product._id}
              product={product}
              
            />
          </SwiperSlide>
          ) : null
        ) : (
          <SwiperSlide key={product._id}>
            <ProductBox
              key={product._id}
              product={product}
              
            />
          </SwiperSlide>
        )
          ))}
      </Swiper>
    </div>
  );
};
export default FlashSale;
