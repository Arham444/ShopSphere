import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice.js";
import productsReducer from "../features/products/productSlice.js";
import wishListReducer from "../features/wishlist/wishlistSlice.js";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishListReducer,
  },
});
export default store;
