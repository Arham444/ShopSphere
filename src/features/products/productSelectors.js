import { createSelector } from "@reduxjs/toolkit";

export const selectRawProducts = (state) => state.products.items;
export const selectReviews = (state) => state.products.reviews;

export const selectAllProducts = createSelector(
  [selectRawProducts, selectReviews],
  (items, reviews) =>
    items.map((product) => {
      const productReviews = reviews[product.id] || [];
      const reviewCount = productReviews.length;
      const rating =
        reviewCount > 0
          ? Number(
              (
                productReviews.reduce((sum, r) => sum + r.rating, 0) /
                reviewCount
              ).toFixed(1),
            )
          : 5;
      return {
        ...product,
        rating,
      };
    }),
);

export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectCategory = (state) => state.products.selectedCategory;
export const selectPriceRange = (state) => state.products.priceRange;
export const selectMinRating = (state) => state.products.minRating;
export const selectSortBy = (state) => state.products.sortBy;

export const selectProductById = createSelector(
  [selectAllProducts, (state, productId) => productId],
  (products, productId) => products.find((item) => item.id === productId),
);

export const selectFilteredProducts = createSelector(
  [
    selectAllProducts,
    selectSearchQuery,
    selectCategory,
    selectPriceRange,
    selectMinRating,
    selectSortBy,
  ],
  (items, searchQuery, category, priceRange, minRating, sortBy) => {
    let result = [...items];

    if (category != "All")
      result = result.filter((p) => p.category === category);

    if (searchQuery.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );
    result = result.filter((p) => p.rating >= minRating);
    switch (sortBy) {
      case "price-ascending":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-descending":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    return result;
  },
);

export const selectCategories = createSelector([selectAllProducts], (items) => [
  "All",
  ...new Set(items.map((p) => p.category)),
]);

export const selectProductReviews = (state, productId) => {
  return state.products.reviews[productId] || [];
};
