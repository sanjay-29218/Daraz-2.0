import React, { useContext } from "react";
import CheckOutWizard from "../components/CheckOutWizard";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { Store } from "../utils/storea";
import Cookies from "js-cookie";
import Navbardetail from "../components/Navbardetail";
import { useRouter } from "next/router";

let country = [
  { label: "Bagmati Province", value: "Bagmati" },
  { label: "Gandaki Province", value: "Gandaki" },
  { label: "Karnali Province", value: "Karnali" },
  { label: "Lumbini Province", value: "Lumbini" },
  { label: "Madhesh Province", value: "Madhesh" },
  { label: "Province 1", value: "Province1" },
  { label: "Sudurpashchim Province", value: "Sudurpashchim" },
];

const ProductScreen = (props) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  function submitHandler(data) {
    dispatch({
      type: "CART_SAVE_SHIPPING_ADDRESS",
      payload: {
        fullname: data.fullname,
        mobile: data.mobile,
        postal: data.postal,
        city: data.city,
        street: data.street,
      },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullname: data.fullname,
          mobile: data.mobile,
          postal: data.postal,
          city: data.city,
          street: data.street,
          // country: countryValue,
        },
      })
    );
    router.push("/payment");
    console.log("shippingAddress", shippingAddress);
  }

  useEffect(() => {
    setValue("fullname", shippingAddress?.fullname);
    setValue("mobile", shippingAddress?.mobile);
    setValue("postal", shippingAddress?.postal);
    setValue("city", shippingAddress?.city);
    setValue("street", shippingAddress?.street);
    // setValue("country",countryValue);
  }, []);
  // router.push("/payment");
  return (
    <div>
      <Navbardetail isHome />
      <CheckOutWizard activeStep={1}></CheckOutWizard>
      <form
        action=""
        className="mx-auto max-w-screen-md p-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="fulName">Full Name</label>
          <input
            type="text"
            placeholder="Enter your Full Name"
            id="fullname"
            className="p-2 bg-gray-50"
            {...register("fullname", {
              required: "Please Enter fulname",
            })}
          />

          {errors.fullname && (
            <p className="text-red-500">{errors.fullname.message}</p>
          )}
          {/* {errors.fullname&&(<p className="text-red-500">{errors}</p>)} */}
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="number"
            placeholder="Enter your Mobile Number"
            id="mobile"
            autoFocus
            className="p-2 bg-gray-50"
            {...register("mobile", {
              required: "Please Enter your valid number",
            })}
          />
          {errors.mobile && (
            <p className="text-red-500">{errors.mobile.message}</p>
          )}
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="postal">Postal Code</label>
          <input
            type="number"
            placeholder="Enter your Postal Code"
            id="postal"
            autoFocus
            className="p-2 bg-gray-50"
            {...register("postal", {
              required: "Please Enter your valid Postal Code",
            })}
          />
          {errors.postal && (
            <p className="text-red-500">{errors.postal.message}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="mb-4 flex flex-col gap-2">
            {/* <label htmlFor="country">Choose your Province</label>
            {!countryValue && (
          <Controller
            name="country"
            control={control}
            render={({ onChange, value, ref }) => (
              <Select
                options={country}
                value={country.find((c) => c.value === value)}
                onChange={(val) => setCountryValue(val.value)}
              />
            )}
            rules={{ required: true }}
          />
        )} */}
            {/* {countryValue && (
          <Controller
            name="country"

            control={control}
            render={({ onChange, value, ref }) => (
              <Select
                options={country}
                value={country.find((c) => c.value === value)}
                onChange={(val) => setCountryValue(val.value)}
                defaultValue={country.find((c) => c.value === countryValue)}
                {...register("country", {
                  required: "Please Enter your valid country",
                })
                }
              />
            )}
            rules={{ required: true }}
          />
        )}
        {errors.country && <div>Field is rquired</div>} */}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="postal">Street address</label>
            <input
              type="text"
              placeholder="Enter your Street address"
              id="street"
              autoFocus
              className="p-2 bg-gray-50"
              {...register("street", {
                required: "Please Enter your valid street address",
              })}
            />
            {errors.street && (
              <p className="text-red-500">{errors.postal.message}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="postal">City</label>
            <input
              type="text"
              placeholder="Enter your City address"
              id="city"
              autoFocus
              className="p-2 bg-gray-50"
              {...register("city", {
                required: "Please Enter your valid city address",
              })}
            />
            {errors.street && (
              <p className="text-red-500">{errors.postal.message}</p>
            )}
          </div>
          <div className="mb-4 flex justify-between">
            <button className="btn" type="submit">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
ProductScreen.auth = true;
export default ProductScreen;
