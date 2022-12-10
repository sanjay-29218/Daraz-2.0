import { useRouter } from "next/router";
import React from "react";
import Cartsection from "../../components/Cartsection";
import Navbar from "../../components/Navbar";
import data from "../../utils/flashdata";
import Rating from "@mui/material/Rating";
import { FcRating } from "react-icons/fc";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
type Props = {};

const ProductDetails = (props: Props) => {
  const { query } = useRouter();
  console.log(query);
  const { slug } = query;
  console.log(slug);
  const product = data.products.find((product: any) => product.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }
  const discountPercentage = (price: number, discountedPrice: number) => {
    return ((price - discountedPrice) / price) * 100;
  };
  return (
    <div className="h-screen   bg-gray-50 ">
      <Navbar />
      <div className="md:grid md:grid-cols-3 flex flex-col justify-center items-center ">
        {/* image part */}
        <div className="p-10 col-span-1  bg-white">
          <img
            src={product.image}
            className="h-[40%] md:h-[500px] md:w-[400px] rounded-md w-screen object-cover"
            alt=""
          />
        </div>
        {/* product details */}
        <div className="flex gap-5 justify-center items-center pt-2">
          <p className="  text-lg md:text-[2.5rem] self-center text-[1rem] font-bold uppercase  ">
            {product.description}
          </p>

          {/* product raing */}
          <div className="flex items-center gap-1 py-2   ">
            <FcRating className="text-[2rem]" />
            {product.rating}/5
          </div>
        </div>
        <div className="bg-white w-screen items-start px-4 m-[2rem] mb-[4rem] border rounded-lg  flex flex-col  py-[2rem]">
          <hr className="h-10px text-red-50" />
          <div className="flex flex-col ">
            {/* product raing for medium */}
            <div className="md:flex hidden   ">
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
              />
              <span>({product.numReviews})</span>
            </div>
            {/* product price */}
            <p className="font-bold text-[#f57224] text-[1.5rem] md:text-[1.5rem] py-2 ">
              Rs {product.discountedPrice}
            </p>
            <div className="text-[#f57224] flex py-2 ">
              <s className="text-gray-500">Rs {product.price}</s>
              <p>
                -
                {Math.floor(
                  discountPercentage(product.price, product.discountedPrice)
                )}
                %
              </p>
            </div>
            <div className="flex gap-3 items-center mt-3">
              <p className="text-[1rem]">Size</p>
              <Box sx={{ '& button': { m: 1 } }}>
      
      <div>
        <Button variant="outlined" color="primary" size="medium">
          Small
        </Button>
        <Button variant="outlined" size="medium">
          Medium
        </Button>
        <Button variant="outlined" size="medium">
          Large
        </Button>
      </div>
      
    </Box>
            </div>
          </div>
        </div>
        <div className=" hidden "></div>
      </div>
      <section className="md:hidden">
        <Cartsection />
      </section>
    </div>
  );
};

export default ProductDetails;
