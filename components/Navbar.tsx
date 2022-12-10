import React from "react";
import { BiCart } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="flex flex-col gap-5 left-0 sticky top-0 bg-white  items-center pt-[10px]   shadow-md  ">
      {/* upper part of navbar */}
      <div className="flex  lg:hidden gap-[1rem]">
        <img src="/daraz.png" alt="" className=" " />
        <button className="  btn mx-[1rem] ">Login</button>
        <button className="  btn ">Sign Up </button>
        <BiCart className=" hidden  w-[30px] h-[30px] ml-[28px]" />
      </div>
      {/* lower part of navbar */}
      <div className="flex justify-evenly items-center pt-3  w-screen  md:border-0  ">
        <Link href={"/"}>
          <img src="daraz.png" alt="" className=" hidden  lg:block " />
        </Link>
        <div className="  flex  items-center">
          <input
            type="text"
            className="w-[80vw] h-[45px] bg-[#F5F5F5]   md:w-[600px]  md:h-[45px] "
          />
          <AiOutlineSearch className="bg-[#F57224] w-[45px] h-[45px] text-white p-[5px]" />
        </div>
        <Link href="/cart">
          <BiCart className=" hidden w-[30px] h-[30px]  ml-[2rem] md:block" />
        </Link>
        {/*  login and signup part */}
        <div className="flex">
        <Link href="/login">
          <button className=" hidden btn mx-[2rem] lg:block">Login</button>
        </Link>
        <Link href="/signup">
          <button className=" hidden btn lg:block">Sign Up </button>
        </Link>
        </div>
        
      </div>
      {/* Categories part */}
      <div className="flex justufy-start w-screen">
          <select name="" id="" >
            <option value="none" selected className="clear">All Categories</option>
            <option value="">Women's Fashion</option>
            <option value="">Men's Fashion</option>

          </select>
        </div>
    </div>
  );
}
