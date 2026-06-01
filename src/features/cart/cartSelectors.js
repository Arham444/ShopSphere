import { createSelector } from "@reduxjs/toolkit";
export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => {
    items.reduce((total, item) => total + item.quantity, 0);
  },
);
export const selectCartWithSubTotals = createSelector(
  [selectCartItems],
  (items) =>
    items.map((item) => ({
      ...item,
      subTotal: parseFloat(
        (Number(item.price) * Number(item.quantity)).toFixed(2),
        0,
      ),
    })),
);
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  parseFloat(
    items
      .reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0,
      )
      .toFixed(2),
    0,
  ),
);
