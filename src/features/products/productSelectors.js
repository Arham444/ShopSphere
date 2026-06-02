import { createSelector } from "@reduxjs/toolkit";

export const selectAllProducts = (state) => state.products.items;
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectCategory = (state) => state.products.selectedCategory;
export const selectPriceRange = (state) => state.products.priceRange;
export const selectMinRating = (state) => state.products.minRating;
export const selectSortBy = (state) => state.products.sortBy;

export const selectProductById = (productId) =>
  createSelector([selectAllProducts], (items) =>
    items.find((item) => item.id === productId),
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
