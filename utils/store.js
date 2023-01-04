import { createContext, useReducer } from "react";
import Cookies from "js-cookie";
export const Store = createContext();

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {}, selectedCartItems: [] },
};
// hello from store
function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      // find already existing items
      const existItem = state.cart.cartItems.find(
        (x) => x.slug === newItem.slug
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((x) =>
            x.slug === existItem.slug ? newItem : x
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      console.log(state.cart.cartItems);
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );

      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_RESET": {
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };
    }
    case "CART_SAVE_SHIPPING_ADDRESS": {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    }
    case "CART_SAVE_PAYMENT_METHOD": {
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    }
    case "CART_ADD_SELECTED_ITEMS": {
      // const selectedCartItems = action.payload;
      console.log("hey from store");
      return {
        ...state,
        cart: {
          ...state.cart,
          selectedCartItems: [...state.cart.selectedCartItems, action.payload],
        },
      };
    }
    case "CART_REMOVE_SELECTED_ITEMS": {
      // const selectedCartItems = action.payload;
      if (state.cart.selectedCartItems.length > 0) {
        const selectedCartItems = state.cart.selectedCartItems.filter(
          (item) => item.slug !== action.payload.slug
        );
        

        return {
          ...state,
          cart: {
            ...state.cart,
            selectedCartItems: selectedCartItems,
          },
        };
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: [],
          },
        };
      }
    }
    case "CART_RESET_SELECTED_ITEMS": {
      return {
        ...state,
        cart: {
          ...state.cart,
          selectedCartItems: [],
        },
      };
    }

    default:
      return state;
  }
}
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
