import ReactImageMagnify from "react-image-magnify";
import { useRouter } from "next/router";
import React from "react";
import Cartsection from "../../components/Cartsection";
import Rating from "@mui/material/Rating";
import { FcRating } from "react-icons/fc";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Navbardetail from "../../components/Navbardetail";
import Product from "../../models/Product";
import db from "../../utils/db";

const ProductDetails = ({ product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }
  const discountPercentage = (price, discountedPrice) => {
    return ((price - discountedPrice) / price) * 100;
  };
  return (
    <div className="h-screen   bg-gray-50 ">
      <Navbardetail isHome={true} />
      <div className="md:grid md:grid-cols-3 gird grid-rows-2 ">
        {/* image part */}
        <div className="p-10 col-span-1  bg-white">
          <div className="fluid__image-container">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: `${product.image}`,
                },
                largeImage: {
                  src: `${product.image}`,
                  width: 600,
                  height: 1800,
                },
                enlargedImageContainerDimensions: {
                  width: "200%",
                  height: "100%",
                },
                // isHintEnabled: true,
                shouldHideHintAfterFirstActivation: false,
              }}
            />
          </div>
        </div>
        {/* product details */}
        <div className="flex-col h-full  gap-5 justify-center bg-white items-center pt-2 md:p-4 ">
          <p className=" md:text-[1.5rem] text-center  md:self-start text-[1.5rem] font-bold uppercase  ">
            {product.description}
          </p>

          
          {/* product raing */}
          <span className="flex  justify-center gap-1 py-2 md:hidden   ">
            <FcRating className="text-[2rem]" />
            {product.rating}/5
          </span>
          {/* detail description */}
          <div className="bg-white  w-screen md:w-full items-start px-4 md:m-0 md:mt-[2rem]    mb-[4rem] border rounded-lg  flex flex-col  py-[2rem]">
            <hr className="h-10px text-red-50" />
            <p>{product.store}</p>
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
                <Box sx={{ "& button": { m: 1 } }}>
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
              <section className="hidden md:block">
                <Cartsection product={product} />
              </section>
            </div>
          </div>
        </div>

        <div className=" hidden "></div>
      </div>
      <section className="md:hidden">
        <Cartsection product={product} />
      </section>
    </div>
  );
};

export default ProductDetails;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug: slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
};
