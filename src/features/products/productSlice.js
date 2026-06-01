import { createSlice } from "@reduxjs/toolkit";
import products from "./productData";
import { act } from "react";

const initialState = {
  items: products,
  searchQuery: "",
  selectedCategory: "All",
  priceRange: [0, 500],
  minRating: 0,
  sortBy: "newest",
};

const productSlice = createSlice({
  name: "prodcuts",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSearchCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    setMinRating(state, action) {
      state.minRating = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    addProduct(state, action) {
      state.items.push(action.payload);
    },
  },
});
export const {
  setSearchCategory,
  setSearchQuery,
  setPriceRange,
  setMinRating,
  setSortBy,
  addProduct,
} = productSlice.actions;
export default productSlice.reducer;
