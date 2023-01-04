import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CheckOutWizard from "../components/CheckOutWizard";


import { Store } from "../utils/store";

// import toastcontainer
import { ToastContainer } from "react-toastify";
import Navbardetail from "../components/Navbardetail";
export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({
      type: "CART_SAVE_PAYMENT_METHOD",
      payload: selectedPaymentMethod,
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };
  useEffect(() => {
    if (!shippingAddress.street) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, shippingAddress.street]);

  return (
    <div>
      <ToastContainer />
      <Navbardetail isHome />
      <CheckOutWizard activeStep={2} />
      <form className="mx-auto p-3 max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {["Khalti", "CashOnDelivery"].map((payment) => (
          <div key={payment} className=" flex mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
            <img className="h-[3rem] " src={`${payment}.png`} alt="" />
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push("/shipping")}
            type="button"
            className="btn"
          >
            Back
          </button>
          <button className="btn">Next</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

PaymentScreen.auth = true;
