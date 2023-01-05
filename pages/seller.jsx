import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";

import Navbardetail from "../components/Navbardetail";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import SellerM from "../models/Seller";
import Product from "../models/Product";
import db from "../utils/db";
import Link from "next/link";
import { Rating, Stack } from "@mui/material";
import User from "../models/User";

const Seller = ({ store, products }) => {
  const { status, data: session } = useSession();
  const user = session.user;
 
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm();
  async function submitHandler(data) {
    const { res } = await axios.post("api/seller/newseller", {
      name: data.fullname,
      email: data.email,
      store: data.store,
      mobile: data.mobile,
      postal: data.postal,
      city: data.city,
      street: data.street,
    });
    router.reload()
    
  }
  const handelAddProduct = () => {
    router.push("/addproduct");
  };

  const discountPercentage = (price, discountedPrice) => {
    return ((price - discountedPrice) / price) * 100;
  };

  useEffect(() => {
    setValue("fullname", user?.name);
    setValue("email", user?.email);
  }, [user?.name, user?.email]);
  return (
    <div>
      <Navbardetail isHome />
      {!store ? (
        <form
          action=""
          className="mx-auto max-w-screen-md p-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-center font-bold text-[2rem]">
            Seller Description
          </h1>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="fulName">Full Name</label>
            <input
              type="text"
              placeholder="Enter your Full Name"
              id="fullname"
              className="p-2 bg-gray-50"
              {...register("fullname", {
                required: "Please Enter fulname",
              })}
            />

            {errors.fullname && (
              <p className="text-red-500">{errors.fullname.message}</p>
            )}
            {/* {errors.fullname&&(<p className="text-red-500">{errors}</p>)} */}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="fulName">Email</label>
            <input
              type="email"
              placeholder="Enter your Full Name"
              id="email"
              className="p-2 bg-gray-50"
              {...register("email", {
                required: "Please Enter your email",
              })}
            />

            {errors.fullname && (
              <p className="text-red-500">{errors.fullname.message}</p>
            )}
            {/* {errors.fullname&&(<p className="text-red-500">{errors}</p>)} */}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="number"
              placeholder="Enter your Mobile Number"
              id="mobile"
              autoFocus
              className="p-2 bg-gray-50"
              {...register("mobile", {
                required: "Please Enter your valid number",
              })}
            />
            {errors.mobile && (
              <p className="text-red-500">{errors.mobile.message}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="postal">Store Name</label>
            <input
              type="text"
              placeholder="Enter your Postal Code"
              id="store"
              autoFocus
              className="p-2 bg-gray-50"
              {...register("store", {
                required: "Please Enter your Store Name",
              })}
            />
            {errors.postal && (
              <p className="text-red-500">{errors.postal.message}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="postal">Postal Code</label>
            <input
              type="number"
              placeholder="Enter your Postal Code"
              id="postal"
              autoFocus
              className="p-2 bg-gray-50"
              {...register("postal", {
                required: "Please Enter your valid Postal Code",
              })}
            />
            {errors.postal && (
              <p className="text-red-500">{errors.postal.message}</p>
            )}
          </div>

          <div className="mb-4">
            <div className="mb-4 flex flex-col gap-2"></div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="postal">Street address</label>
              <input
                type="text"
                placeholder="Enter your Street address"
                id="street"
                autoFocus
                className="p-2 bg-gray-50"
                {...register("street", {
                  required: "Please Enter your valid street address",
                })}
              />
              {errors.street && (
                <p className="text-red-500">{errors.postal.message}</p>
              )}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="postal">City</label>
              <input
                type="text"
                placeholder="Enter your City address"
                id="city"
                autoFocus
                className="p-2 bg-gray-50"
                {...register("city", {
                  required: "Please Enter your valid city address",
                })}
              />
              {errors.street && (
                <p className="text-red-500">{errors.postal.message}</p>
              )}
            </div>
            <div className="mb-4 flex justify-between">
              <button className="btn" type="submit">
                Next
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="p-4 min-h-screen bg-slate-200">
          <div className="flex justify-between"><p className="text-[2rem] ">Store: {store.store}</p>
          <Link href={'/sellerorder'}><div className="btn cursor-pointer ">See orders</div></Link>
          </div>
          <p className="text-[2rem] mb-4  ">Products:</p>
          <div className="flex flex-wrap items-stretch gap-3 ">
          {products.map((product) => (
            <div key={product._id} className="flex h-fit flex-col md:w-[20rem]    bg-white p-2 md:p-3 hover:shadow-lg  ">
              <Link href={`updateproduct/${product._id}`}>
                <p className="p-3 text-lg font-bold">{product.name}</p>
                <img className="w-[20rem] h-[20rem] object-contain" src={product.image} alt="" />
                <p className="md:text-[1.2rem]">{product.description}</p>
                <p className="text-[#F57224] md:text-[1.5rem]">
                  Rs {product.discountedPrice}
                </p>
                <div className="flex gap-2">
                  <s className="text-gray-500">Rs {product.price}</s>
                  <p>
                    -
                    {Math.floor(
                      discountPercentage(product.price, product.discountedPrice)
                    )}
                    %
                  </p>

                  <p>{product.id}</p>
                </div>
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={product?.rating}
                    precision={0.5}
                    readOnly
                  />
                </Stack>
                
              </Link>
            </div>
          ))}
          <button
            className="md:w-[20rem] w-full text-[5rem] cursor-pointer  bg-slate-100 hover:bg-slate-300"
            onClick={() => {
              handelAddProduct();
            }}
          >
            +
          </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Seller;
Seller.auth = true;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = await User.findOne({ email: session.user.email }).lean();  
  await db.connect();
  const store = await SellerM.findOne({ user: user._id }).lean();
  let products;
  if(store){
     products = await Product.find({ store: store.store }).lean();
  }
  await db.disconnect();

  return {
    props: {
      store: store ? db.convertDocToObj(store) : null,
      products: products ? products.map(db.convertDocToObj) : null,
    },
  };
}
