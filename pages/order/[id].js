import Router, { useRouter } from "next/router";
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import Navbardetail from "../../components/Navbardetail";
import axios from "axios";
import { data } from "autoprefixer";
import Link from "next/link";
import { Store } from "../../utils/storea";
import KhaltiCheckout from "khalti-checkout-web";
import { Button, mobileStepperClasses } from "@mui/material";
import { Alert } from "@mui/material";
import { AlertTitle } from "@mui/material";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { loading: true, order: {}, error: "" };
    case "FETCH_SUCCESS":
      return { loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { loading: false, order: {}, error: action.payload };
    default:
      return state;
  }
};
const OrderScreen = () => {
  const { query } = useRouter();
  const [stores, setStores] = useState([]);
  const router = useRouter();

  const orderId = query.id;
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
    isDelivered: false,
    isPaid: false,
  });
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    isPaid,
    isDelivered,
    deliveryFee,
    itemsPrice,
    totalPrice,
    updatedAt,
    paidAt,
  } = order;
  useMemo(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/op/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        let storesObj = handleStore(data);
        if (storesObj) {
          return Object.keys(storesObj);
        }
        return [];
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      let stores = fetchOrder().then((res) => setStores(res));
    }
  }, [orderId, order._id]);

  // Khalti config file

  let config = {
    // replace this key with yours
    publicKey: "test_public_key_9554da7faed04c2ca62653e8dcbd1aea",
    productIdentity: "1234567890",
    productName: "Drogon",
    productUrl: `http://localhost:3000/orderhistory`,
    eventHandler: {
      onSuccess(payload) {
        if (payload) {
          // Router.push('/orderhistory');
          const orderId = query.id;
          const orderRes = axios.put(`/api/orders/${orderId}/pay`, payload);
          console.log(orderRes);
          console.log(payload);
        }
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  //   Handling store count

  function handleStore(data) {
    let storeCount = {};
    let uniqueStore = [];
    data.orderItems.filter((item) =>
      uniqueStore.includes(item.store)
        ? storeCount[item.store]++
        : ((storeCount[item.store] = 1), uniqueStore.push(item.store))
    );
    return storeCount;
  }
  async function handlePlaceOrder(paymentMethod) {
    if (!isPaid && paymentMethod === "Khalti") {
      let checkout = new KhaltiCheckout(config);
      checkout.show({ amount: totalPrice * 100 });
      if (checkout) {
        Router.push("/orderhistory");
      }
    } else if (!isPaid && paymentMethod === "Cash on Delivery") {
      const orderId = query.id;
      const orderRes = await axios.put(`/api/orders/${orderId}/pay`, {
        amount: totalPrice,
        paymentMethod: paymentMethod,
      });
      Router.push("/orderhistory");
    } else {
      Router.push("/orderhistory");
    }
  }

  return (
    <div>
      <Navbardetail isHome />
      {loading && stores && order ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1>Order {orderId}</h1>
          <div>
            <div className="md:grid-p  ">
              <div className="grid-item shadow-md md:w-[60vw] p-5 bg-white border rounded-md ">
                <p>Deliver to : {shippingAddress.fullname} </p>
                <p className="flex gap-2 items-center">
                  Address : {shippingAddress.street}, {shippingAddress.city},
                  {shippingAddress.postal}
                </p>
              </div>
              <div className="md:grid-item flex md:relative shadow-md fixed bottom-0 w-full justify-between items-center md:h-[20rem] md:grid gap-3 bg-white ">
                <div className="hidden md:block font-bold mb-2">
                  Order Summary{" "}
                </div>
                <hr />
                <p className="md:flex gap-[2rem] hidden  items-center justify-between font-bold">
                  Payment Method : {paymentMethod}
                  {isPaid ? (
                    <div className="font-bold text-green-400">
                      Paid : {paidAt}{" "}
                    </div>
                  ) : (
                    <div className="font-bold text-[#f85300] ">Not Paid</div>
                  )}
                </p>

                <div className="font-bold md:block hidden">
                  Items Total :{itemsPrice}
                </div>
                <div className="font-bold md:block hidden">
                  Delivery Fee :{deliveryFee}
                </div>
                <div className="font-bold md:flex hidden  justify-between gap-[2rem]">
                  Total Payment :{totalPrice}
                  {isDelivered ? (
                    <div className="font-bold  text-green-400">
                      Delivered : {updatedAt}{" "}
                    </div>
                  ) : (
                    <div className="font-bold text-[#f85300]">
                      Not Delivered{" "}
                    </div>
                  )}
                </div>

                <div className="font-bold text-[#f85300]">
                  Total : {totalPrice}{" "}
                </div>
                {paymentMethod === "Khalti" && !isPaid ? (
                  <button
                    className="bg-[#f85300] text-white font-bold p-2 rounded-md"
                    onClick={() => {
                      handlePlaceOrder(paymentMethod);
                    }}
                  >
                    Pay with Khalti
                  </button>
                ) : paymentMethod === "Esewa" && !isPaid ? (
                  <button
                    className="bg-[#f85300] text-white font-bold p-2 rounded-md"
                    onClick={() => {
                      handlePlaceOrder(paymentMethod);
                    }}
                  >
                    Pay with Esewa
                  </button>
                ) : paymentMethod === "CashOnDelivery" && !isPaid ? (
                  <button
                    className="bg-[#f85300] text-white font-bold p-2 rounded-md"
                    onClick={() => {
                      handlePlaceOrder(paymentMethod);
                    }}
                  >
                    Pay After Delivery
                  </button>
                ) : (
                  <button
                    className="bg-[#f85300] text-white font-bold p-2 rounded-md"
                    onClick={() => {
                      router.push("/orderhistory");
                    }}
                  >
                    Go to the Order History
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1   ">
                {stores.length !== 0 ? (
                  stores.map((store, i) => (
                    <div key={i}>
                      <div className="flex gap-2 p-4">
                        <h3>{store}</h3>
                      </div>
                      {order.orderItems.map((storeitem, i) => {
                        if (storeitem.store === store) {
                          return (
                            <div key={storeitem.id}>
                              <hr />

                              <div className="grid grid-cols-[1fr_1fr] grid-rows-1   gap-2 p-4 ">
                                <img
                                  src={storeitem.image}
                                  alt=""
                                  className="w-50 h-36 "
                                />

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
      )}
    </div>
  );
};
OrderScreen.auth = true;
export default OrderScreen;
