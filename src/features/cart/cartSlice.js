import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../auth/authSlice.js";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const Product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === Product.id,
      );

      if (existingItem && existingItem.quantity < Product.stock)
        existingItem.quantity += 1;
      if (!existingItem && Product.stock > 0)
        state.cartItems.push({ ...Product, quantity: 1 });
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) existingItem.quantity = quantity;
    },

    clearCart(state) {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login, (state, action) => {
        if (action.payload && action.payload.cartItems)
          state.cartItems = action.payload.cartItems;
      })
      .addCase(logout, (state) => {
        state.cartItems = [];
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
