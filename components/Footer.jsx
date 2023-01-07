import React, { useEffect,useContext, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import Link from "next/link";
import { Store } from "../utils/store";

const Footer = () => {
  const {state} = useContext(Store)
  const { cart } = state;
  const [cartcount, setCartcount] = useState(0);
  useEffect(() => {
    setCartcount(cart.cartItems.reduce((a, c) => a + c.qty, 0));
  }, [cart.cartItems]);
  return (
    <div className=" md:hidden  bg-white flex fixed bottom-0 h-[3rem] z-50 shadow-inner  w-screen justify-around text-[2rem]  items-center">
      <Link href={"/"}>
        <AiOutlineHome className="btn-shadow" />
      </Link>
      <Link href={"/Category"}>
        <BiCategory className="btn-shadow" />
      </Link>
      <Link href={"/Cart"}>
        {" "}
        <div className="relative">
          <AiOutlineShoppingCart className="btn-shadow" />
          {cartcount > 0 && (
            <span className=" ml-1 rounded-full w-5 h-5  bg-[#F57224] text-white text-sm text-center font-semibold absolute -top-2 left-5  ">
              {cartcount}
            </span>
          )}
        </div>{" "}
      </Link>
      <Link href={"/me"}>
        <RiAccountCircleLine className="btn-shadow" />
      </Link>
    </div>
  );
};
export default Footer;
