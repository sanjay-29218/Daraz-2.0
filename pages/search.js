import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Store } from "../utils/store";
import { toast, ToastContainer } from "react-toastify";
import Navbardetail from "../components/Navbardetail";
import ProductBox from "../components/ProductBox";
import { getSession } from "next-auth/react";
import db from "../utils/db";
import Product from "../models/Product";
import Seller from "../models/Seller";
import User from "../models/User";
import dynamic from "next/dynamic";

const PAGE_SIZE = 3;

const prices = [
  {
    name: "Rs 1 to Rs 50",
    value: "1-50",
  },
  {
    name: "Rs 51 to Rs 200",
    value: "51-200",
  },
  {
    name: "Rs 201 to Rs 1000",
    value: "201-1000",
  },
];
const ratings = [1, 2, 3, 4, 5];

const Search = ({
  products,
  countProducts,
  categories,
  brands,
  pages,
  store,
  searchQuery
}) => {
  const session = getSession();
  const router = useRouter();
  const {
    query = "all",
    category = "all",
    brand = "all",
    price = "all",
    rating = "all",
    sort = "featured",
    page = 1,
  } = router.query;
  console.log(router.query)

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const data = await axios.get(`/api/products/${product._id}`);
    console.log(data);
    const qty = existItem ? existItem.qty + 1 : 1;

    if (product.countInStock < qty) {
      return toast.error("Sorry, Product is out of stock");
    } else {
      toast.success("Product added to cart");
      dispatch({ type: "CART_ADD_ITEM", payload: { ...product, qty: qty } });
    }
  };
  return (
    <div className="h-screen p-4">
      <ToastContainer />
      <Navbardetail />
     {session?(
      <div>
         <div className="flex flex-col md:flex-row ">
       <div className="md:w-[20%]">
         <div className="my-3">
           <h2>Categories</h2>
           <select
             className="w-full py-3 border-2 "
             value={category}
             onChange={categoryHandler}
           >
             <option value="all">All</option>
             {categories &&
               categories.map((category) => (
                 <option key={category} value={category}>
                   {category}
                 </option>
               ))}
           </select>
         </div>
         <div className="my-3">
           <h2>Brands</h2>
           <select className="w-full  py-3 border-2 " value={brand} onChange={brandHandler}>
             <option value="all">All</option>
             {brands &&
               brands.map((brand) => (
                 <option key={brand} value={brand}>
                   {brand}
                 </option>
               ))}
           </select>
         </div>
         <div className="my-3">
           <h2>Prices</h2>
           <select className="w-full  py-3 border-2 " value={price} onChange={priceHandler}>
             <option value="all">All</option>
             {prices &&
               prices.map((price) => (
                 <option key={price.value} value={price.value}>
                   {price.name}
                 </option>
               ))}
           </select>
         </div>
         <div className="my-3">
           <h2>Ratings</h2>
           <select className="w-full  py-3 border-2 " value={rating} onChange={ratingHandler}>
             <option value="all">All</option>
             {ratings &&
               ratings.map((rating) => (
                 <option key={rating} value={rating}>
                   {rating} star{rating > 1 && "s"} & up
                 </option>
               ))}
           </select>
         </div>
       </div>

       <div className=" flex flex-col md:w-[80%] ">
         <div className="mb-2 flex items-center  justify-between border-b-2 pb-2">
           <div className="flex  items-center p-2 md:p-4 text-sm">
             {products.length === 0 ? "No" : countProducts} Results
             {query !== "all" && query !== "" && " : " + query}
             {category !== "all" && " : " + category}
             {brand !== "all" && " : " + brand}
             {price !== "all" && " : Price " + price}
             {rating !== "all" && " : Rating " + rating + " & up"}
             &nbsp;
             {(query !== "all" && query !== "") ||
             category !== "all" ||
             brand !== "all" ||
             rating !== "all" ||
             price !== "all" ? (
               <button onClick={() => router.push("/search")}>
                 hello
                 {/* <XCircleIcon className="h-5 w-5" /> */}
               </button>
             ) : null}
           </div>
           <div className="pr-3 ">
             Sort by{" "}
             <select value={sort}  onChange={sortHandler}>
               <option value="lowest">Price: Low to High</option>
               <option value="highest">Price: High to Low</option>
               <option value="toprated">Customer Reviews</option>
               <option value="newest">Newest Arrivals</option>
             </select>
           </div>
         </div>

         <div>
           <div className="flex flex-wrap gap-8  ">
             {products.map((product) => (
               <ProductBox
                 key={product._id}
                 product={product}
                 addToCartHandler={addToCartHandler}
               />
             ))}
           </div>
         </div>
       </div>
     </div>
     <ul className="flex fixed bottom-0 justify-center w-full">
       {products.length > 0 &&
         [...Array(pages).keys()].map((pageNumber) => (
           <li key={pageNumber}>
             <button
               className={`default-button m-2 ${
                 page == pageNumber + 1 ? "font-bold" : ""
               } `}
               onClick={() => pageHandler(pageNumber + 1)}
             >
               {pageNumber + 1}
             </button>
           </li>
         ))}
     </ul>
      </div>
     ):(<p>login required</p>)}
    </div>
  );
};
Search.auth = true;

export default dynamic(() => Promise.resolve(Search), { ssr: false });

export async function getServerSideProps(context) {
  const query = context.query;
  const session = await getSession(context);
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const brand = query.brand || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const sort = query.sort || "";
  const searchQuery = query.search || "";
  const order =
    sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };
  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
        name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const brandFilter = brand && brand !== "all" ? { brand } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  await db.connect();
  const categories = await Product.find().distinct("category");
  const brands = await Product.find().distinct("brand");
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    "-reviews"
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });
 
  let store;
  if (session) {
    const user = await User.findOne({ email: session.user.email }).lean();
    store = await Seller.findOne({ user: user._id }).lean();
  }
  await db.disconnect();
  const products = productDocs.map(db.convertDocToObj);
  return {
    props: {
      products,
      searchQuery,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
      store: store ? db.convertDocToObj(store) : null,
    },
  };
}
