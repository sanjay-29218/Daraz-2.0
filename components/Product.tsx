import Link from "next/link";
import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
type Props = {
  id: number;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  discountedPrice: number;
  store: string;
};
const discountPercentage = (price: number, discountedPrice: number) => {
  return ((price - discountedPrice) / price) * 100;
};

const Product = (props: Props) => {
  return (
    <div className="flex flex-col md:w-[20rem] bg-white p-2 md:p-3 hover:shadow-lg  ">
      <Link href={`product/${props.slug}`}>
        <img src={props.image} alt="" />
        <p className="md:text-[1.2rem]">{props.description}</p>
        <p className="text-[#F57224] md:text-[1.5rem]">
          Rs {props.discountedPrice}
        </p>
        <div className="flex gap-2">
          <s className="text-gray-500">Rs {props.price}</s>
          <p>
            -
            {Math.floor(discountPercentage(props.price, props.discountedPrice))}
            %
          </p>
        </div>
        <Stack spacing={1}>
          <Rating
            name="half-rating-read"
            defaultValue={props.rating}
            precision={0.5}
            readOnly
          />
        </Stack>
      </Link>
    </div>
  );
};

export default Product;
