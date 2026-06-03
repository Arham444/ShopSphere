import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice.js";
import productsReducer from "../features/products/productSlice.js";
import wishListReducer from "../features/wishlist/wishlistSlice.js";
import { loadState, saveState } from "../utils/localStorage";

//Loading state from storage using loadState helper function.
const preloadedState = {
  cart: { cartItems: loadState("cartItems", []) },
  wishlist: { wishListItems: loadState("wishlistItems", []) },
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishListReducer,
  },
  preloadedState,
});

//subscribe to store save state to localStorage using saveState helper function.
store.subscribe(() => {
  const state = store.getState();
  saveState("cartItems", state.cart.cartItems);
  saveState("wishlistItems", state.wishlist.wishListItems);
});

export default store;
