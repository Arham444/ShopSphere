import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice.js";
import productsReducer from "../features/products/productSlice.js";
import wishListReducer from "../features/wishlist/wishlistSlice.js";
import authReducer from "../features/auth/authSlice.js";
import { loadState, saveState } from "../utils/localStorage";

const user = loadState("userSession", null);
const userKey = user?.username;

//Loading state from storage using loadState helper function.
const preloadedState = {
  cart: {
    cartItems:
      userKey && user?.role !== "guest"
        ? loadState(`cartItems_${userKey}`, [])
        : [],
  },
  wishlist: {
    wishListItems:
      userKey && user?.role !== "guest"
        ? loadState(`wishlistItems_${userKey}`, [])
        : [],
  },
  auth: { currentUser: user },
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishListReducer,
    auth: authReducer,
  },
  preloadedState,
});

//subscribe to store save state to localStorage using saveState helper function.
store.subscribe(() => {
  const state = store.getState();
  const currentUser = state.auth.currentUser;
  const currentUserKey = currentUser?.username;

  if (currentUserKey && currentUser?.role !== "guest") {
    saveState(`cartItems_${currentUserKey}`, state.cart.cartItems);
    saveState(`wishlistItems_${currentUserKey}`, state.wishlist.wishListItems);
  }

  const productStocks = state.products.items.reduce((acc, product) => {
    acc[product.id] = product.stock;
    return acc;
  }, {});
  saveState("productStocks", productStocks);

  saveState("userSession", currentUser);
});

export default store;
