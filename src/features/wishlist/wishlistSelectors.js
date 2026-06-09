import { createSelector } from "@reduxjs/toolkit";

export const selectWishlistItems = (state) => state.wishlist.wishListItems;

export const selectIsInWishlist = (state, productId) =>
  state.wishlist.wishListItems.find((item) => item.id === productId);

export const selectWishlistItemsCount = createSelector(
  selectWishlistItems,
  (items) => items.length,
);
