// import Main from '../components/Main'
import Main from "../components/Main";
import Head from "next/head";
import React, { useContext } from "react";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Navbardetail from "../components/Navbardetail";
import "react-toastify/dist/ReactToastify.css";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/store";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Seller from "../models/Seller";
import { getSession } from "next-auth/react";
import User from "../models/User";

const Homepage = ({ products, store }) => {
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const data = await axios.get(`/api/products/${product._id}`);
    console.log(data);
    const qty = existItem ? existItem.qty + 1 : 1;

    if (product.countInStock < qty) {
      return toast.error("Sorry, Product is out of stock");
    } else {
      // const qty = existItem ? existItem.qty + 1 : 1;
      toast.success("Product added to cart");
      dispatch({ type: "CART_ADD_ITEM", payload: { ...product, qty: qty } });
    }
  };

  return (
    <>
      <Head>
        <title>Daraz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" w-screen  bg-[#F5F5F5]">
        <ToastContainer />
        <Navbardetail />

        <main>
          <Main
            products={products}
            store={store}
            addToCartHandler={addToCartHandler}
          />
        </main>
        <section>
          <Sidebar />
        </section>
        <footer className=" ">
          <Footer />
        </footer>
      </div>
    </>
  );
};
export default Homepage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  await db.connect();
  const products = await Product.find().lean();
  const user = await User.findOne({ email: session.user.email }).lean();
  let store;
  if (session) {
    store = await Seller.findOne({ user: user._id }).lean();
  }
  return {
    props: {
      products: products.map(db.convertDocToObj),
      store: store ? db.convertDocToObj(store) : null,
    },
  };
}
