import { createSelector } from "@reduxjs/toolkit";

export const selectAllProducts = (state) => state.products.items;

export const selectProductById = (productId) =>
  createSelector([(state) => state.products.items], (items) =>
    items.find((item) => item.id === productId),
  );
