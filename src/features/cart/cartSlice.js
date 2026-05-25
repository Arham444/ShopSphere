import { createSlice } from "@reduxjs/toolkit";
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
      if (existingItem) {
        existingItem.quantity += 1; //imer
      } else {
        state.cartItems.push({ ...Product, quantity: 1 }); //spread
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      ); //filter removes item by not adding the one with id eqaul.
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
