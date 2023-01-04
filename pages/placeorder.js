import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import Navbardetail from "../components/Navbardetail";
import { Store } from "../utils/storea";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import { AiFillEdit } from "react-icons/ai";
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
import { getSession, useSession } from "next-auth/react";
const Placeorder = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod, selectedCartItems },
  } = state;
  console.log(state);
  console.log(session);

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
    let summary = { total: 0, deliveryFee: 0, totalqty: 0, itemsTotal: 0 };
    selectedCartItems.forEach((item) => {
      summary.itemsTotal += item.price * item.qty;
      summary.totalqty += item.qty;
      summary.deliveryFee += item.price > 200 ? 0 : 15;
    });
    summary.total = round2(summary.itemsTotal + summary.deliveryFee);
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
  };
  return (
    <div className="bg-gray-200 h-fit">
      <Navbardetail isHome />
      <CheckOutWizard activeStep={3} />
      <ToastContainer />
      <div className="flex flex-col md:grid-p ">
        <div className="grid-item p-4 shadow-md md:w-[60vw]  bg-white border rounded-md ">
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
          <p className="flex gap-2 items-center">
            Payment Method : {paymentMethod}
            <Link href={"/payment"}>
              <span>
                <AiFillEdit />
              </span>
            </Link>
          </p>
        </div>

        <div className="fixed md:relative bottom-0  w-full  md:grid-item md:h-[35vh] rounded-lg   md:m-[3rem]  md:p-4 gap-2   flex justify-end md:justify-between items-center md:flex-col md:w-[25vw] bg-white ">
          {/* <hr /> */}
          <div className="hidden font-bold mb-2">Order Summary </div>
          <hr />
          <div className="hidden md:block font-bold">
            Items Total :{summary.itemsTotal}
          </div>
          <div className="hidden md:block font-bold">
            Total Qty :{summary.totalqty}
          </div>
          <div className="hidden md:block font-bold">
            Delivery Fee :{summary.deliveryFee}
          </div>
          <div className="hidden md:block font-bold">
            Total Payment :{summary.total}
          </div>
          <div className="font-bold text-[#f85300]">
            Total : {summary.total}{" "}
          </div>
          <button
            className="p-2 md:block w-full hidden    bg-[#f85300]"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
          <button
            className="  md:hidden p-2  w-[20%]   bg-[#f85300]"
            onClick={handlePlaceOrder}
          >
            Order
          </button>
        </div>
        <div className="md:grid-item shadow-md md:w-[60vw] bg-white border rounded-md">
          <div className="  ">
            <div className="grid grid-cols-1   ">
              {selectedCartItems.length !== 0 ? (
                stores.map((store, i) => (
                  <div key={i}>
                    <div className="flex gap-2 p-4">
                      <h3>{store}</h3>
                    </div>
                    {selectedCartItems.map((storeitem, i) => {
                      if (storeitem.store === store) {
                        return (
                          <div key={storeitem.id}>
                            <hr />
                            {/* item description */}
                            <div className="md:grid flex  grid-cols-[1fr_1fr] grid-rows-1   gap-2 p-4 ">
                              <Link href={`/product/${storeitem.slug}`}>
                                <img
                                  src={storeitem.image}
                                  alt=""
                                  className="w-15 h-14 md:w-50 md:h-36 "
                                />
                              </Link>
                              <div className="flex md:flex-col gap-2">
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

export default dynamic(() => Promise.resolve(Placeorder), { ssr: false });
Placeorder.auth = true;
export async function getServersideProps(context) {
  const session = await getSession(context);
  return { props: {} };
}
