import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import data from "../utils/flashdata";
const Categories = ({ value }) => {
  const res = () => {
    const uniqueCategory = [
      ...new Set(data.products.map((item) => [item.category, item.image])),
    ];
    const finalCategory = [];
    const onlyCategory = [];
    uniqueCategory.forEach((item) => {
      if (!onlyCategory.includes(item[0])) {
        onlyCategory.push(item[0]);
        finalCategory.push(item);
      }
    });
    return finalCategory;
  };
  const final = res();
  

  {
    return value === true ? (
      <div
        className=" md:p-[3rem] "
        id="category"
      >
        <h1 className="text-[2rem] mb-10 text-center">Categories</h1>
        <div className="flex items-center justify-center flex-wrap gap-2">
          {final.map((item, i) => {
            return (
              <div className="bg-white p-2">
                <div
                  key={i}
                  className=" w-[8rem] md:w-[15rem] text-center hover:shadow-md "
                >
                  <img src={item[1]} alt={""} />
                  <p>{item[0]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <></>
    );
  }
};

export default Categories;
