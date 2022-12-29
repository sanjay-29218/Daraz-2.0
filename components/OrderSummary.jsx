import { useRouter } from 'next/router';
import React,{useContext} from 'react'
import { toast } from 'react-toastify';
import { Store } from '../utils/store';

const OrderSummary = ({total}) => {
    const {router} = useRouter();
    const {state,dispatch} = useContext(Store);
    const {cart} = state;
  return (
    <div className='sticky bottom-20'>
         <div className=" md:h-[35vh] rounded-lg  bottom-0  md:m-[3rem]  md:p-4 gap-2  flex justify-end items-center md:flex-col md:w-[25vw] bg-white ">
          <p className="hidden font-bold text-[1.5rem]">Order Summary</p>
          <small className="hidden">Subtotal ( {total} ) items </small>
          <p className="font-bold">Total: <span className="text-[#ff7624]">Rs. {total}</span></p>

          <div className="md:flex  hidden justify-center md:gap-2">
            <input
              placeholder="Enter Voucher Card"
              className="p-2 border rounded-sm bg-gray-100"
              type="text"
            />
            <button className="md:px-3 md:py-2 bg-[#25a5d8]">Submit</button>
          </div>
          <button
            onClick={() => {
             if(cart.selectedCartItems.length===0){
               toast.error("Please select items to proceed")
             }else{
              router.push("Login?redirect=/shipping");
              }
            }}
            className="border hidden rounded-sm mt-2 bg-[#ff7624] hover:bg-[#e58244] p-3"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => {
             if(cart.selectedCartItems.length===0){
               toast.error("Please select items to proceed")
             }else{
              router.push("Login?redirect=/shipping");
              }
            }}
            className="border w-[8rem] rounded-sm  bg-[#ff7624] hover:bg-[#e58244] p-3"
          >      
            Checkout
          </button>
        </div>

    </div>

  )
}

export default OrderSummary