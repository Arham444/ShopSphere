import { createSlice } from "@reduxjs/toolkit";
import products from "./productData";
import { loadState, saveState } from "../../utils/localStorage";

const initialState = {
  items: [...products, ...loadState("addedProducts", [])],
  searchQuery: "",
  selectedCategory: "All",
  priceRange: [0, 500],
  minRating: 0,
  sortBy: "newest",
};

const productSlice = createSlice({
  name: "products",
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
      const currentAdded = loadState("addedProducts", []);
      saveState("addedProducts", [...currentAdded, action.payload]);
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
