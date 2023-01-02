import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaStore } from "react-icons/fa";
import { useContext } from "react";
import Link from "next/link";
const Cartsection = ({product,addToCartHandler}) => {
  
  return (
    <div className="flex  fixed md:static bottom-0  bg-white w-screen md:w-full h-[3rem] md:mt-[1rem]   ">
      <div className="flex text-[1.5rem] items-center  text-[#F57224] ">
        <div className="px-4 md:hidden border-r-2 ">
          <FaStore />
         
        </div>
        <Link href={"/Cart"}>
        <div className="px-6 md:hidden  onClick={()=>addToCartHandler(product)}    ">
          <AiOutlineShoppingCart />
          {/* <p>Chat</p> */}
        </div>
        </Link>
      </div>
      <div className="flex gap-2 ">
        <Link href={'/Checkout'}>
        <div className="hover:cursor-pointer bg-gradient-to-r font-bold text-white  from-cyan-500 to-blue-500 grow-[2] p-2 md:skew-x-0 -skew-x-12">
          Buy Now
        </div>
        </Link>
        <Link href={"/Cart"}>
        <div
          onClick={()=>addToCartHandler(product)}
          className="hover:cursor-pointer bg-gradient-to-r font-bold text-white from-[#F57224] md:skew-x-0 to-red-500 p-2 grow-[2] -skew-x-12"
        >
          Add to Cart
        </div>
        </Link>

      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Cartsection;
