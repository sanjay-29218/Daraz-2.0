import React from "react";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { FaStore } from "react-icons/fa";
import { useContext } from "react";
import { Store } from "../utils/store";
import Link from "next/link";
import axios from "axios";  
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Cartsection = (props) => {
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async() => {
    const existItem = state.cart.cartItems.find(
      (x) => x.slug === props.product.slug
    );
    // console.log(props.product)
    const data = await axios.get(`/api/products/${props.product._id}`)
    console.log(data); 
    const qty = existItem ? existItem.qty + 1 : 1;
  
    if (props.product.countInStock < qty) {
      return toast.error("Sorry, Product is out of stock");
    }
    else{
      // const qty = existItem ? existItem.qty + 1 : 1;
      toast.success("Product added to cart")
      dispatch({ type: "CART_ADD_ITEM", payload: { ...props.product, qty:qty } });
    }
  };

  return (
    <div className="flex  fixed md:static bottom-0  bg-white w-screen md:w-full h-[3rem] md:mt-[1rem]   ">
      <div className="flex text-[1.5rem] items-center  text-[#F57224] ">
        <div className="px-4 md:hidden border-r-2 ">
          <FaStore />
         
        </div>
        <div className="px-4 md:hidden     ">
          <BsFillChatRightTextFill />
          {/* <p>Chat</p> */}
        </div>
      </div>
      <div className="flex gap-2 ">
        <Link href={'/Checkout'}>
        <div className="hover:cursor-pointer bg-gradient-to-r font-bold text-white  from-cyan-500 to-blue-500 grow-[2] p-2 md:skew-x-0 -skew-x-12">
          Buy Now
        </div>
        </Link>
        <Link href={"/Cart"}>
        <div
          onClick={addToCartHandler}
          className="hover:cursor-pointer bg-gradient-to-r font-bold text-white from-[#F57224] md:skew-x-0 to-red-500 p-2 grow-[2] -skew-x-12"
        >
          Add to Cart
        </div>
        </Link>

      </div>
      <ToastContainer />
    </div>
  );
};

export default Cartsection;
