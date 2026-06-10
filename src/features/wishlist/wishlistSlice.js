import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../auth/authSlice.js";

const initialState = {
  wishListItems: [],
};
const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const inWishList = state.wishListItems.find(
        (item) => item.id === action.payload.id,
      );
      if (!inWishList) state.wishListItems.push(action.payload);
    },
    removeFromWishlist(state, action) {
      state.wishListItems = state.wishListItems.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login, (state, action) => {
        if (action.payload && action.payload.wishListItems)
          state.wishListItems = action.payload.wishListItems;
      })
      .addCase(logout, (state) => {
        state.wishListItems = [];
      });
  },
});
export const { addToWishlist, removeFromWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;
