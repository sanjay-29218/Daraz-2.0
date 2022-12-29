import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import data from "../utils/flashdata";
import Product from "./Product";
import mongoose from "mongoose";
import db from "../utils/db";

const FlashSale = ({product}) => {
  return (
    <div
      className="md:mt-[5rem] mt-[2rem] overflow-hidden  md:px-[10rem]"
      id="flash"
    >
      <h1 className="text-[2rem] mb-5">Flash Sale</h1>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper:any) => console.log(swiper)}
      >
        {data.products.map((product) => (
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
              store={product.store}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default FlashSale;

export const getStaticProps = async () => {
  db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj)
      ,
    },
  };
};
