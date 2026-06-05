import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice.js";
import productsReducer from "../features/products/productSlice.js";
import wishListReducer from "../features/wishlist/wishlistSlice.js";
import authReducer from "../features/auth/authSlice.js";
import { loadState, saveState } from "../utils/localStorage";

//Loading state from storage using loadState helper function.
const preloadedState = {
  cart: { cartItems: loadState("cartItems", []) },
  wishlist: { wishListItems: loadState("wishlistItems", []) },
  auth: { currentUser: loadState("userSession", null) },
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
  saveState("cartItems", state.cart.cartItems);
  saveState("wishlistItems", state.wishlist.wishListItems);
  saveState("userSession", state.auth.currentUser);
});

export default store;
