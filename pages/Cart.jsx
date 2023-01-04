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
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import CheckBox from "../components/CheckBox";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

const Cart = (props) => {
  const [secCount, setSecCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [primaryTotal, setPrimaryTotal] = useState(0);
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  // const {
  //   cart: { cartItems },

  // } = state;
  const { cart } = state;

  function handleTotal() {
    let total = cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    setTotal(total);
    cart.cartItems.map((item) =>
      dispatch({ type: "CART_ADD_SELECTED_ITEMS", payload: item })
    );
  }

  function handlePrimaryTotal(item, test) {
    let total = cart.cartItems
      .filter((i) => i.store === item)
      .reduce((a, c) => a + c.price * c.qty, 0);
    if (test === true) {
      setTotal((prev) => prev + total);
      console.log(state);
      cart.cartItems
        .filter((i) => i.store === item)
        .map((item) =>
          dispatch({ type: "CART_ADD_SELECTED_ITEMS", payload: item })
        );
      // dispatch({ type: "CART_ADD_SELECTED_ITEMS",payload: item } );
      // setTotal(total)
    } else {
      setTotal((prev) => prev - total);
      cart.cartItems
        .filter((i) => i.store === item)
        .map((item) =>
          dispatch({ type: "CART_REMOVE_SELECTED_ITEMS", payload: item })
        );
    }
  }

  function secondaryTotal(item, test) {
    let total = cart.cartItems
      .filter((i) => i.slug === item.slug)
      .reduce((a, c) => a + c.price * c.qty, 0);
    if (test === true) {
      dispatch({ type: "CART_ADD_SELECTED_ITEMS", payload: item });
      setTotal((prev) => prev + total);
      console.log(state);
      return;
    }
    setTotal((prev) => prev - total);
    dispatch({ type: "CART_REMOVE_SELECTED_ITEMS", payload: item });
  }

  function handleStore() {
    let storeCount = {};
    let uniqueStore = [];
    cart.cartItems.filter((item) =>
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
  }, [cart.cartItems]);

  // Handling checkboxes using usecallback
  function handleMainCheckbox() {
    let mainCheckbox = document.querySelector("#mainCheckbox");

    if (mainCheckbox.checked) {
      let allcheckboxes = document.querySelectorAll('input[type="checkbox"]');

      allcheckboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
      handleTotal();
    } else {
      let allcheckboxes = document.querySelectorAll('input[type="checkbox"]');

      allcheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      dispatch({ type: "CART_RESET_SELECTED_ITEMS" });
      console.log(state);
      setTotal(0);
    }
  }

  //  For primary checkbox

  function handlePrimaryCheckbox(item) {
    let mainCheckbox = document.getElementById("mainCheckbox");
    console.log(mainCheckbox.checked);
    let store = document.querySelector(`input[type="checkbox"][id="${item}"]`);
    console.log(store, store.checked);
    if (store.checked) {
      document
        .querySelectorAll(`input[name="${item}"][type="checkbox"]`)
        .forEach((checkbox) => {
          checkbox.checked = true;
        });

      handlePrimaryTotal(item, true);
    } else {
      mainCheckbox.checked = false;
      document.querySelectorAll(`input[name="${item}"]`).forEach((checkbox) => {
        checkbox.checked = false;
      });
      document.querySelectorAll(`input[name="${item}"]`).forEach((checkbox) => {
        checkbox.checked = false;
      });
      handlePrimaryTotal(item, false);
    }
    // document.querySelector(`input[name=store]`).checked = false;
  }
  function handleSecondaryCheckbox(slug, ritem, c, store) {
    let storeItem = document.querySelector(
      `input[type="checkbox"][id="${slug}"]`
    );
    console.log(storeItem.checked);
    if (storeItem.checked) {
      secondaryTotal(ritem, true);
      setSecCount((prev) => prev + 1);
      console.log(secCount);
      if (secCount == c) {
        console.log("hey");
        let s = document.getElementById(`${store}`);
        s.checked = false;
      } else {
        let s = document.getElementById(`${store}`);
        s.checked = true;
      }
    } else {
      setSecCount((prev) => prev - 1);
      console.log(secCount);
      storeItem.checked = false;
      secondaryTotal(ritem, false);
    }
  }
  const addToCartHandler = (item) => {
    const existItem = cart.cartItems.find((x) => x.slug === item.slug);
    console.log(existItem);

    const qty = existItem ? existItem.qty + 1 : 1;
    // console.log(qty)
    if (item.countInStock < qty) {
      return toast.error("Sorry, Product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, qty } });
  };

  // Update to Cart

  const updateCartHandler = (item, value) => {
    const existItem = cart.cartItems.find((x) => x.slug === item.slug);
    console.log(existItem);
    console.log(value);
    const qty = existItem ? value : 1;
    // console.log(qty)
    if (item.countInStock < qty) {
      return window.alert("Sorry, Product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, qty } });
  };

  const removeItemHandler = (item) => {
    console.log(item);
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const deleteCartHandler = (item) => {
    const existItem = cart.cartItems.find((x) => x.slug === item.slug);
    console.log(existItem);
    const qty = existItem ? existItem.qty - 1 : 1;
    // console.log(qty)
    if (item.countInStock < qty) {
      return window.alert("Sorry, Product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, qty } });
  };

  useEffect(() => {
    dispatch({ type: "CART_RESET_SELECTED_ITEMS" });
  }, []);

  return (
    <div className="bg-gray-100 h-screen ">
      <section className="hidden  md:block">
        <Navbardetail isHome />
      </section>
      <div className=" gap-4 md:hidden h-[3rem] shadow-md flex items-center">
        <IoIosArrowBack onClick={() => router.back()} />
        <p className="text-[1rem] relative">
          MY CART
          {cart.cartItems.length > 0 && (
            <span className="ml-1 rounded-full w-5 h-5 bg-[#F57224] text-white text-sm text-center font-semibold absolute -right-8 top-1">
              {cart.cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </p>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name=""
            onChange={() => {
              handleMainCheckbox();
            }}
            className="h-6 w-6 m-4 ml-2"
            id="mainCheckbox"
          />
          <p>Select all</p>
        </div>
        <hr />
      </div>
      <div className="  md:grid md:grid-cols-[70vw_30vw]  ">
        <div className="grid grid-cols-1 ">
          {cart.cartItems.length !== 0 ? (
            stores.map((store, i) => (
              <div key={i} className="h-fit">
                <div className="flex gap-2 p-4">
                  <input
                    type="checkbox"
                    name="store"
                    id={store}
                    onChange={() => {
                      handlePrimaryCheckbox(store);
                    }}
                  />
                  <h3>{store}</h3>
                </div>
                {cart.cartItems.map((storeitem, i) => {
                  if (storeitem.store === store) {
                    return (
                      <div key={storeitem._id}>
                        <hr />

                        <div className="md:grid md:grid-cols-[10px_1fr_1fr_20px] flex gap-3 grid-rows-1 md:gap-2 md:p-4 items-center">
                          <input
                            type="checkbox"
                            name={store}
                            id={storeitem.slug}
                            onChange={() => {
                              handleSecondaryCheckbox(
                                storeitem.slug,
                                storeitem,
                                storesObj[store],
                                store
                              );
                            }}
                          />
                          <Link href={`/product/${storeitem.slug}`}>
                            <img
                              src={storeitem.image}
                              alt=""
                              className="w-20 md:w-50 h-20 col-auto"
                            />
                          </Link>
                          <div className="flex flex-col gap-2">
                            <h3 className="uppercase">
                              {storeitem.description}
                            </h3>
                            <h3 className="text-sm text-[#f57224]">
                              Only {storeitem.countInStock - storeitem.qty}{" "}
                              items remaining
                            </h3>
                            <div className="grid grid-cols-2 ">
                              <h3 className="text-[#f57224] font-bold">
                                {" "}
                                Rs {storeitem.price}
                              </h3>
                              <div className="flex gap-2">
                                {storeitem.qty === 1 ? (
                                  <button
                                    disabled
                                    className=" px-1  border rounded-sm w-5 font-semibold "
                                  >
                                    -
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      deleteCartHandler(storeitem);
                                    }}
                                    className=" px-1  border rounded-sm w-5 font-semibold "
                                  >
                                    -
                                  </button>
                                )}
                                <input
                                  type="number"
                                  name=""
                                  value={storeitem.qty}
                                  onChange={(e) => {
                                    updateCartHandler(
                                      storeitem,
                                      e.target.value
                                    );
                                  }}
                                  className=" m-0 appearance-none text-center px-1 bg-gray-200 border rounded-sm w-8 "
                                  id=""
                                />
                                <button
                                  onClick={() => {
                                    addToCartHandler(storeitem);
                                  }}
                                  className=" px-1  border rounded-sm w-5 font-semibold "
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              removeItemHandler(storeitem);
                            }}
                          >
                            <AiFillDelete className="text-red-500 md:text-[2rem]" />
                          </button>
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
        <div className=" fixed bottom-12 md:relative w-full md:h-[35vh] rounded-lg md:m-[3rem]  md:p-4 gap-2   flex justify-end md:justify-between items-center md:flex-col md:w-[25vw] bg-white ">
          <p className="hidden md:block font-bold text-[1.5rem]">
            Order Summary
          </p>
          <small className="hidden md:block">Subtotal ( {total} ) items </small>
          <p className="font-bold">
            Total: <span className="text-[#ff7624]">Rs. {total}</span>
          </p>

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
              if (state.cart.selectedCartItems.length === 0) {
                toast.error("Please select items to proceed");
              } else {
                router.push("Login?redirect=/shipping");
              }
            }}
            className="border hidden rounded-sm mt-2 bg-[#ff7624] hover:bg-[#e58244] p-3"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => {
              if (state.cart.selectedCartItems.length === 0) {
                toast.error("Please select items to proceed");
              } else {
                router.push("Login?redirect=/shipping");
              }
            }}
            className="border w-[8rem] rounded-sm  bg-[#ff7624] hover:bg-[#e58244] p-3"
          >
            Checkout
          </button>
        </div>
      </div>

      <Footer />
      {/* <ToastContainer /> */}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
