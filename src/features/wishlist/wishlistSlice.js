import { createSlice } from "@reduxjs/toolkit";
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
      if (!inWishList) {
        state.wishListItems.push(action.payload);
      }
    },
    removeFromWishlist(state, action) {
      state.wishListItems = state.wishListItems.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});
export const { addToWishlist, removeFromWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;
