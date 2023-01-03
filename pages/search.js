import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Store } from '../utils/store'
import { toast, ToastContainer } from "react-toastify";
import Navbardetail from '../components/Navbardetail';
import ProductBox from '../components/ProductBox';
import { getSession } from 'next-auth/react';
import db from '../utils/db';
import Product from '../models/Product';
import Seller from '../models/Seller';
const search = ({store,products}) => {
    const router = useRouter()
    const { query } = router.query
    const { state, dispatch } = useContext(Store);
    const addToCartHandler = async(product) => {
        const existItem = state.cart.cartItems.find(
          (x) => x.slug === product.slug
        );
        const data = await axios.get(`/api/products/${product._id}`)
        console.log(data); 
        const qty = existItem ? existItem.qty + 1 : 1;
      
        if (product.countInStock < qty) {
          return toast.error("Sorry, Product is out of stock");
        }
        else{

          toast.success("Product added to cart")
          dispatch({ type: "CART_ADD_ITEM", payload: { ...product, qty:qty } });
        }
      };
  return (
    <div >
        <ToastContainer />
        <Navbardetail/>
 <div className='flex flex-wrap'>
 {products.map((product) => {
           if(product.store!==store.store)
           {
             return <ProductBox
               key={product.id}
               product={product}
               addToCartHandler={addToCartHandler}
             />
           
           }
         
})}
 </div>
    </div>
  )
}

export default search;
export async function getServerSideProps(context) {
    const session = await getSession(context);
    const user = session?.user;
    await db.connect();
    const products = await Product.find().lean();
    const store = await Seller.findOne({ user: user._id }).lean();
    return {
      props: {
        products: products.map(db.convertDocToObj),
        store: store ? db.convertDocToObj(store) : null,
      },
    };
  }