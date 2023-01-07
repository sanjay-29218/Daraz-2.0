import React from 'react'
import DarazMall from './DarazMall';
import FlashSale from './FlashSale';
import Categories from './Categories';
import JustForYout from './JustForYout';
import dynamic from 'next/dynamic';


const Main = ({products,addToCartHandler,store}) => {
  return (
    <div>
        {/* Flash sale */}
        <FlashSale products={products} store = {store}  addToCartHandler={addToCartHandler}/>
        {/* Categories */}
        <Categories value={false}  />
        {/* just for you */}
        <JustForYout products={products} store = {store}  addToCartHandler={addToCartHandler}/>
    </div>
  )
}
export default dynamic(() => Promise.resolve(Main), { ssr: false });
