import React, { useContext, useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { Store } from "../utils/store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import Dropdown from "./Dropdown";


const Navbardetail = (props) => {
  const { status, data: session } = useSession();
  const [search, setSearch] = useState("");
  const [cartcount, setCartcount] = useState(0);
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  useEffect(() => {
    setCartcount(cart.cartItems.reduce((a, c) => a + c.qty, 0));
  }, [cart.cartItems]);

  const logoutCLickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/Login" });
  };
  const handleSearch = ()=>{
    router.push(`/search?search=${search}`);
  }
  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    
  };

  return (
    <div className="flex flex-col gap-5 left-0 sticky top-0 md:sticky z-[999] bg-white  items-center pt-[10px]   shadow-md  ">
      {/* upper part of navbar */}
      <div className="flex  lg:hidden gap-[1rem] pt-5">
        {props.isHome && <IoIosArrowBack onClick={() => router.back()} />}
        <Link href={"/"}>
          <img
            src="https://icms-image.slatic.net/images/ims-web/fb7adc81-c369-4fe8-b62e-7595b09c7741.png"
            alt=""
            className="h-10  "
          />
        </Link>
        <div className="  btn  ">
          {status === "loading" ? (
            "Loading..."
          ) : session?.user ? (
            <div className="relative inline-block">
              <Dropdown
                session={session}
                href={{
                  profile: "/profile",
                  order: "/order-history",
                  logout: "#",
                }}
                logoutCLickHandler={logoutCLickHandler}
              />
            </div>
          ) : (
            <div>
              <Link href="/Login">LogIn</Link>
            </div>
          )}
        </div>
        {!session && (
          <Link href="/signup">
            <button className=" btn ">SignUp</button>
          </Link>
        )}
        <Link href={"/Cart"}>
          <BiCart className="   w-[30px] h-[30px] ml-[20px] " />
        </Link>
        {cartcount > 0 && (
          <span className="ml-1 rounded-full w-5 h-5 bg-[#F57224] text-white text-sm text-center font-semibold absolute right-[10px] top-[20px]">
            {cartcount}
          </span>
        )}
      </div>
      {/* lower part of navbar */}
      <div className="flex justify-evenly items-center pt-3  w-full  md:border-0  ">
        <Link href={"/"}>
          <img src="/daraz.png" alt="" className=" hidden  lg:block " />
        </Link>
        <div className="  flex  items-center">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={(e) => {
              onChangeHandler(e);
            }}
            className="w-[80vw] h-[45px] bg-[#F5F5F5]   md:w-[600px]  md:h-[45px] "
          />
          <AiOutlineSearch onClick={handleSearch} className="bg-[#F57224] w-[45px] h-[45px] text-white p-[5px]" />
        </div>
        <Link href="/Cart">
          <div className="relative hidden md:block">
            <BiCart className=" hidden w-[30px] h-[30px]   ml-[2rem] md:block" />
            {cartcount > 0 && (
              <span className=" ml-1 rounded-full w-5 h-5 bg-[#F57224] text-white text-sm text-center font-semibold absolute -right-4 -top-2 ">
                {cartcount}
              </span>
            )}
          </div>
        </Link>
        {/*  login and signup part */}
        <div className="flex">
          <div className=" hidden btn mx-[2rem] lg:block">
            {status === "loading" ? (
              "Loading..."
            ) : session?.user ? (
              <div className="relative  inline-block">
                <Dropdown
                  session={session}
                  href={{
                    profile: "/profile",
                    order: "/orderhistory",
                    logout: "#",
                  }}
                  logoutCLickHandler={logoutCLickHandler}
                />
              </div>
            ) : (
              <div>
                {" "}
                <Link href="/Login">LogIn</Link>
              </div>
            )}
          </div>
          {!session && (
            <Link href="/signup">
              <button className=" hidden btn lg:block">Sign Up</button>
            </Link>
          )}
        </div>
      </div>
      {/* Categories part */}
      <div className="flex justufy-start w-screen">
        <select name="" id="">
          <option
            value="none"
            defaultValue={"All Categories"}
            className="clear"
          >
            All Categories
          </option>
          <option value="">Women's Fashion</option>
          <option value="">Men's Fashion</option>
        </select>
      </div>
    </div>
  );
};

export default Navbardetail;
