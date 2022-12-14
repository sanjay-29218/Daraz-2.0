import Link from "next/link";
import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Cartsection from "./Cartsection";
import { useRouter } from "next/router";

const discountPercentage = (price, discountedPrice) => {
  return ((price - discountedPrice) / price) * 100;
};

const ProductBox = ({ product, addToCartHandler }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:w-[20rem] bg-white p-2 md:p-3 hover:shadow-lg hover:cursor-pointer ">
      <div
        onClick={() => {
          router.push(`product/${product.slug}`);
        }}
      >
        <img src={product.image} alt="" />
        <p className="md:text-[1.2rem]">{product.name}</p>
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
        <div className="hidden md:block">
          <Stack spacing={1}>
            <Rating
              name="half-rating-read"
              defaultValue={product.rating}
              precision={0.5}
              readOnly
            />
          </Stack>
        </div>
      </div>

      <div className="hidden md:block">
        <Cartsection product={product} addToCartHandler={addToCartHandler} />
      </div>
    </div>
  );
};

export default ProductBox;
