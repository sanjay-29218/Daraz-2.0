import ReactImageMagnify from "react-image-magnify";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Cartsection from "../../components/Cartsection";
import { FcRating } from "react-icons/fc";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Navbardetail from "../../components/Navbardetail";
import Product from "../../models/Product";
import { FiArrowRight } from "react-icons/fi";
import db from "../../utils/db";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../../utils/store";
import axios from "axios";
import { useContext } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import User from "../../models/User";
import { getSession } from "next-auth/react";
import RatingModel from "../../models/Rating";
import Comment from "../../models/Comment";
import { Rating } from "@mui/material";
import { useEffect, useRef } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { serialize } from "bson";
const ProductDetails = ({ product, rating, user, comments }) => {
  const { state, dispatch } = useContext(Store);
  const com = useRef();
  const [productRating, setProductRating] = useState(rating?.rating || 0);
  const [productNumReviews, setProductNumReviews] = useState(
    product?.numReviews || 0
  );
  const session = getSession();
  
  const [allProductRating, setAllProductRating] = useState(
    product?.rating || 0
  );
  const [comment, setComment] = useState("");
  const [allcomment, setAllComment] = useState(comments);
  console.log(allcomment);
  console.log(product);

  // Handling the add to cart functionality
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const data = await axios.get(`/api/products/${product._id}`);

    const qty = existItem ? existItem.qty + 1 : 1;

    if (product.countInStock < qty) {
      return toast.error("Sorry, Product is out of stock");
    } else {
      // const qty = existItem ? existItem.qty + 1 : 1;
      toast.success("Product added to cart");
      dispatch({ type: "CART_ADD_ITEM", payload: { ...product, qty: qty } });
    }
  };

  useEffect(() => {
    if (productRating) {
      setProductRating(rating?.rating);
      setProductNumReviews(product.numReviews);
      setAllProductRating(product.rating);
    }
  }, [rating, product, comments]);

  async function handleRating(newValue) {
    if (session.user.name===undefined) {
      return toast.error("Please login to give rating");
    } else {
      if (rating) {
        const { data } = await axios.put(`/api/rating/updaterating`, {
          ratingid: rating._id,
          rating: newValue,
        });
        const { productres } = await axios.put(`/api/rating/updateallrating`, {
          ratingid: rating._id,
          productid: product._id,
          rating: newValue,
        });
        console.log(productres, data);
        toast.success("Rating updated successfully");
        setProductRating(newValue);
      } else {
        const { data } = await axios.post(`/api/rating/newrating`, {
          rating: newValue,
          productid: product._id,
          userid: user._id,
        });
        const { productres } = await axios.put(`/api/rating/updateallrating`, {
          productid: product._id,
          rating: newValue,
        });
        toast.success("Rating added successfully");
        setProductRating(newValue);
      }
    }

    if (product === null) {
      return <div>Product not found</div>;
    }
  }

  async function handleComment(e) {
    // e.preventDefault();
    if (!session) {
      return toast.error("Please login to give comment");
    } else {
      const comment = com.current.value;
      console.log(comment);
      const { commentdata } = await axios.post(`/api/comment/newcomment`, {
        comment: comment,
        productid: product._id,
        userid: user._id,
      });
      setAllComment([...allcomment, { comment: comment, user: user.name }]);
      setComment("");
      toast.success("Comment added successfully");
    }
  }

  const discountPercentage = (price, discountedPrice) => {
    return ((price - discountedPrice) / price) * 100;
  };
 if(!product){
   return <div>Product not found</div>
 }
 return (
  <div className="h-screen   bg-gray-50 ">
    <Navbardetail isHome={true} />
    <ToastContainer />
    <div className="md:grid md:grid-cols-3  gird grid-rows-1 ">
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
      <div className="flex-col h-full  gap-5 justify-center bg-white items-center pt-2 md:p-4 ">
        <p className=" md:text-[1.5rem] text-center  md:self-start text-[1.5rem] font-bold uppercase  ">
          {product.name}
        </p>
        {/* product raing */}
        <span className="flex  justify-center gap-1 py-2 md:hidden   ">
          <FcRating className="text-[2rem]" />
          {Math.round(allProductRating * 10) / 10}/5
        </span>
        {/* detail description */}
        <div className="bg-white  w-screen md:w-full items-start px-4 md:m-0 md:mt-[2rem]    mb-[2rem] border rounded-lg  flex flex-col  py-[2rem]">
          <hr className="h-10px text-red-50" />
          <Link href={"/store"}>
            <div className="flex items-center">
              <div className="">{product.store}</div>
              <FiArrowRight />
            </div>
          </Link>

          <div className="flex flex-col ">
            {/* product raing for medium */}
            <p className=" text-[1rem] py-2 ">Brand: {product.brand}</p>
            <div className="md:flex hidden   ">
              <Rating
                name="half-rating-read"
                defaultValue={allProductRating}
                precision={0.5}
                readOnly
              />
              <span>({productNumReviews})</span>
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
              <Cartsection
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </section>
          </div>
        </div>
      </div>
      <div className="flex-col h-full  gap-5 justify-center bg-white items-center pt-2 md:p-4 ">
        <p className=" md:text-[1.5rem] text-center  md:self-start text-[1.5rem] font-bold uppercase  ">
          Product Details
        </p>
        {/* detail description */}
        <div className="bg-white  w-screen md:w-full items-start px-4 md:m-0 md:mt-[2rem]    mb-[2rem] border rounded-lg  flex flex-col  py-[2rem]">
          <hr className="h-10px text-red-50" />
          <Link href={"/store"}>
            <div className="flex items-center">
              <div className="">Store: {product.store}</div>
              <FiArrowRight />
            </div>
          </Link>

          <div className="flex flex-col ">
            {/* product raing for medium */}
            <p className=" text-[1rem] py-2 ">Brand: {product.brand}</p>
            <div className="flex gap-2    ">
              Description:<p className="italic">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p className=" md:text-[1.5rem] text-center  md:self-start md:my-[2rem] text-[1.5rem] font-bold uppercase  ">
      Product Reviews
    </p>
    <hr />
    <div className=" bg-white md:ml-5 p-3 md:px-[10rem] md: ">
      {rating ? (
        <div className="flex items-center justify-center text-[2rem]">
          <p>Rating:</p>{" "}
          <Rating
            name="half-rating-read"
            defaultValue={0}
            precision={1}
            value={productRating}
            onChange={(event, newValue) => {
              handleRating(newValue);
            }}
          />
        </div>
      ) : (
        <div className="flex justify-center gap-5 text-[2rem] ">
          <p className="text-lg">Rating:</p>
          <Rating
            name="half-rating-read"
            defaultValue={0}
            precision={0.5}
            value={0}
            onChange={(event, newValue) => {
              handleRating(newValue);
            }}
          />
        </div>
      )}
      <div className="flex flex-col mt-4 text-[1.5rem] pb-16 gap-5">
        <input
          type="text"
          placeholder="Leave your comment here"
          value={comment}
          ref={com}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleComment();
            }
          }}
          name=""
          id="comment"
          className="border-b-2 w-[70%] md:w-full focus:outline-none p-3 text-sm md:text-xl"
        />
        <button
          className="bg-[#f57224] text-white text-sm md:text-lg absolute right-8  p-2 md:mb-[3rem] rounded-lg"
          onClick={handleComment}
        >
          Submit
        </button>
        <p>Comments:</p>
        <div className=" h-[10rem] overflow-scroll scroll-auto   bg-slate-50 p-4 flex flex-col gap-5">
          {allcomment ? (
            allcomment.map((comment) => (
              <div key={comment._id} className="flex gap-3 items-center">
                <BsPersonCircle />
                {console.log(comment)}
                <p className="text-sm font-bold">{comment.user}</p>
                <p className="text-sm ">{comment.comment}</p>
                <hr className=" border-1 border-gray-200" />
              </div>
            ))
          ) : (
            <div>Be the first one to comment</div>
          )}
        </div>
      </div>
    </div>
    <section className="md:hidden">
      <Cartsection product={product} addToCartHandler={addToCartHandler} />
    </section>
  </div>
);
};

export default dynamic(() => Promise.resolve(ProductDetails), { ssr: false });

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { slug } = params;
  const session = await getSession(context);
  await db.connect();
  let product,user, rating, comments, serializedcomments;
   product = await Product.findOne({ slug: slug }).lean();
  if(session){
  user = await User.findOne({ email: session.user.email }).lean();
  rating = await RatingModel.findOne({
    $and: [{ product: product._id }, { user: user._id }],
  }).lean();
  }
  if (product) {
    
    comments = await Comment.find({ product: product._id })
      .populate("user")
      .lean();
    serializedcomments = comments.map((comment) => {
      return {
        ...comment,
        user: comment.user.name,
      };
    });
  }

  // rating= await RatingModel.findOne({$and:[{product:product._id},{user:user._id}]}).lean();
  await db.disconnect();
  return {
    props: {
      user: user ? db.convertDocToObj(user) : null,
      product: product ? db.convertDocToObj(product) : null,
      rating: rating ? db.convertDocToObj(rating) : null,
      comments: serializedcomments
        ? serializedcomments.map(db.convertDocToObj)
        : null,
    },
  };
};
