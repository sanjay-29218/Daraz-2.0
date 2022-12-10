import React from "react";
import { MdLocalMall } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="  hidden md:flex  flex-col fixed bottom-[20%] text-[2rem] gap-3  p-3  ">
      <div className=" hover:after:transition-all hover:after:content-['Flash_Sale']   flex items-center text-sm ">
        <a href="#flash"><MdLocalMall className="sidebar "/></a>
      </div>
      <div className="hover:after:content-['Categories'] flex items-center text-sm">
        <a href={"#category"}><BiCategoryAlt className="sidebar " /></a>
      </div>
      <div className=" hover:after:content-['For_you'] flex items-center text-sm ">
        <a href="#forYou"><BsFillPersonFill className="sidebar" /></a>
      </div>
    </div>
  );
};
export default Sidebar;
