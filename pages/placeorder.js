import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import Navbardetail from "../components/Navbardetail";
import { Store } from "../utils/store";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import {  AiFillEdit,  } from "react-icons/ai";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Link from "next/link";
import dynamic from "next/dynamic";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOutWizard from "../components/CheckOutWizard";
import { getError } from "../utils/error";
import axios from "axios";

const placeorder = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod, selectedCartItems },
  } = state;
  console.log(state)

  // for handling store

  function handleStore() {
    let storeCount = {};
    let uniqueStore = [];
    selectedCartItems.filter((item) =>
      uniqueStore.includes(item.store)
        ? storeCount[item.store]++
        : ((storeCount[item.store] = 1), uniqueStore.push(item.store))
    );
    return storeCount;
  }
  const storesObj = handleStore();

  const stores = useMemo(() => {
    let storesObj = handleStore();

    if (storesObj) {
      return Object.keys(storesObj);
    }
    return [];
  }, [selectedCartItems]);

  // for rounding number upto 2 decimal places
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  
  const handleSummary = () => {
    let summary = {total:0, deliveryFee:0,totalqty:0,itemsTotal:0};
    selectedCartItems.forEach((item) => {
      summary.itemsTotal += item.price * item.qty;
      summary.totalqty +=  item.qty;
      summary.deliveryFee += item.price > 200 ? 0 : 15;
    }
    );
     summary.total = round2(summary.itemsTotal + summary.deliveryFee );
    return summary;
  };
  const summary = useMemo(() => {
    return handleSummary();
  }, []);
  
const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/orders/neworder", {
        orderItems: selectedCartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: summary.itemsTotal,
        deliveryFee: summary.deliveryFee,
        totalPrice: summary.total,
      });
      selectedCartItems.forEach((item) => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item });
      });
      dispatch({ type: "CART_RESET_SELECTED_ITEMS" });
      router.push(`/order/${data._id}`);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  }
  return (
    <div className="bg-gray-200 h-fit">
      <Navbardetail />
      <CheckOutWizard activeStep={3} />
      <ToastContainer/>
      <div className=" grid-p ">
        <div className="grid-item shadow-md w-[60vw]  bg-white border rounded-md ">
          <p>Deliver to : {shippingAddress.fullname} </p>
          <p className="flex gap-2 items-center">
            Address : {shippingAddress.street}, {shippingAddress.city},
            {shippingAddress.postal}
            <Link href={"/shipping"}>
              <span>
                <AiFillEdit />
              </span>
            </Link>
          </p>
          <p className="flex gap-2 items-center">Payment Method : {paymentMethod}
          <Link href={"/payment"}>
              <span>
                <AiFillEdit />
              </span>
            </Link>
          </p>
        </div>

        <div className="grid-item shadow-md h-[20rem] grid gap-3 bg-white ">
          {/* <hr /> */}
          <div className="font-bold mb-2">Order Summary </div>
          <hr />
          <div className="font-bold">Items Total :{summary.itemsTotal}</div>
          <div className="font-bold">Total Qty :{summary.totalqty}</div>
          <div className="font-bold">Delivery Fee :{summary.deliveryFee}</div>
          <div className="font-bold">Total Payment :{summary.total}</div>
          <div className="font-bold text-[#f85300]">Total : {summary.total} </div>
          <button className="p-2 w-full   bg-[#f85300]" onClick={handlePlaceOrder}>Place Order</button>
        </div>
        <div className="grid-item shadow-md w-[60vw] bg-white border rounded-md">
          <div className="  ">
            <div className="grid grid-cols-1   ">
              {selectedCartItems.length !== 0 ? (
                stores.map((store) => (
                  <div>
                    <div className="flex gap-2 p-4">
                      <h3>{store}</h3>
                    </div>
                    {selectedCartItems.map((storeitem, i) => {
                      if (storeitem.store === store) {
                        return (
                          <div key={storeitem.id}>
                            <hr />
                            {/* item description */}
                            <div className="grid grid-cols-[1fr_1fr] grid-rows-1   gap-2 p-4 ">
                              <Link href={`/product/${storeitem.slug}`}>
                                <img
                                  src={storeitem.image}
                                  alt=""
                                  className="w-50 h-36 "
                                />
                              </Link>
                              <div className="flex flex-col gap-2">
                                <h3 className="uppercase">
                                  {storeitem.description}
                                </h3>

                                <h3 className="text-[#f57224] font-bold">
                                  {" "}
                                  Rs {storeitem.price}
                                </h3>
                                <p>Qty: {storeitem.qty}</p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                ))
              ) : (
                <div className="h-screen  pt-5 px-2">
                  <Alert severity="info">
                    <AlertTitle className="">
                      There is no item in your cart
                    </AlertTitle>
                    <Button variant="outlined" href="/">
                      Continue Shopping
                    </Button>
                  </Alert>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(placeorder), { ssr: false });
placeorder.auth = true;