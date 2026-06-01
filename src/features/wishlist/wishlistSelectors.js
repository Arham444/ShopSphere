export const selectWishlistItems = (state) => state.wishlist.wishListItems;

export const selectIsInWishlist = (state, productId) =>
  state.wishlist.wishListItems.some((item) => item.id === productId);
