import axios from "axios";
import { getSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbardetail from "../components/Navbardetail";
import Seller from "../models/Seller";
import User from "../models/User";
import db from "../utils/db";

const AddProduct = ({ store, user }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const submitHandler = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("upload_preset", "products");
    console.log(formData);
    const resdata = await fetch(
      "https://api.cloudinary.com/v1_1/dygpr02gq/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    const { res } = await axios.post("/api/products/newproduct", {
      name: data.productname,
      user: user._id,
      slug: data.slug,
      store: store.store,
      category: data.category,
      image: resdata.secure_url,
      price: data.price,
      discountedPrice: data.discountedPrice,
      brand: data.brand,
      countInStock: data.countInStock,
      description: data.description,
    });
    router.push("/seller");
  };

  return (
    <div>
      <Navbardetail isHome />
      <form
        action=""
        className="mx-auto max-w-screen-md p-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="md:text-[3rem] text-xl text-center font-bold pt-3 pb-[5rem]">
          Product Description
        </h1>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="productname">Name of the Product</label>
          <input
            type="text"
            placeholder="Enter your Full Name"
            id="productname"
            className="p-2 bg-gray-50"
            {...register("productname", {
              required: "Please Enter Product Name",
            })}
          />

          {errors.productname && (
            <p className="text-red-500">{errors.productname.message}</p>
          )}
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="slug">Slug</label>
          <input
            type="type"
            placeholder="slug must be unique"
            id="slug"
            className="p-2 bg-gray-50"
            {...register("slug", {
              required: "Please Enter your slug",
            })}
          />

          {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            placeholder="Enter your product Category"
            id="category"
            autoFocus
            className="p-2 bg-gray-50"
            {...register("category", {
              required: "Please enter category",
            })}
          />
          {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="image">Image of the product</label>
          <input
            type="file"
            id="image"
            autoFocus
            className="p-2 bg-gray-50"
            {...register("image", {
              required: "Please upload image of the product",
            })}
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="postal">Price</label>
          <input
            type="number"
            placeholder="Enter your Product price"
            id="price"
            autoFocus
            className="p-2 bg-gray-50"
            {...register("price", {
              required: "Please Enter price of the product",
            })}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="mb-4 flex flex-col gap-2"></div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="postal">Brand</label>
            <input
              type="text"
              placeholder="Enter your product brand"
              id="brand"
              autoFocus
              className="p-2 bg-gray-50"
              {...register("brand", {
                required: "Please Enter your valid street address",
              })}
            />
            {errors.brand && (
              <p className="text-red-500">{errors.brand.message}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="countInStock">Count In Stock</label>
            <input
              type="number"
              placeholder="Enter Product Count in Stock"
              id="countInStock"
              autoFocus
              className="p-2 bg-gray-50"
              {...register("countInStock", {
                required: "Please Enter your Product Count in Stock",
              })}
            />
            {errors.countInStock && (
              <p className="text-red-500">{errors.countInStock.message}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="postal">Discounted Price</label>
            <input
              type="number"
              placeholder="Enter your Product Discounted Price"
              id="discountedPrice"
              autoFocus
              className="p-2 bg-gray-50"
              {...register("discountedPrice", {
                required: "Please Enter your Product Discounted Price",
              })}
            />
            {errors.discountedPrice && (
              <p className="text-red-500">{errors.discountedPrice.message}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="postal">Description</label>
            <input
              type="text"
              placeholder="Enter your City address"
              id="description"
              autoFocus
              className="p-2 bg-gray-50"
              {...register("description", {
                required: "Please Enter your Product Description",
              })}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>
        <div className="mb-4 flex  justify-center">
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
AddProduct.auth = true;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = await User.findOne({ email: session.user.email }).lean();
  await db.connect();
  const store = await Seller.findOne({ user: user._id }).lean();
  await db.disconnect();
  console.log(store);
  return {
    props: {
      user: user ? db.convertDocToObj(user) : null,
      store: store ? db.convertDocToObj(store) : null,
    },
  };
}
