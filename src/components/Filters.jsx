import { useDispatch, useSelector } from "react-redux";
import {
  setSearchCategory,
  setPriceRange,
  setMinRating,
  setSortBy,
} from "../features/products/productSlice";

import {
  selectCategory,
  selectPriceRange,
  selectMinRating,
  selectSortBy,
  selectCategories,
} from "../features/products/productSelectors";

function Filters() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectCategory);
  const priceRange = useSelector(selectPriceRange);
  const minRating = useSelector(selectMinRating);
  const sortBy = useSelector(selectSortBy);
  const categories = useSelector(selectCategories);

  return (
    <div style={styles.wrapper}>
      <div style={styles.group}>
        <label style={styles.label}>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => dispatch(setSearchCategory(e.target.value))}
          style={styles.select}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.group}>
        <label style={styles.label}>Max Price: ${priceRange[1]}</label>
        <input
          type="range"
          min={0}
          max={500}
          step={10}
          value={priceRange[1]}
          onChange={(e) =>
            dispatch(setPriceRange([priceRange[0], Number(e.target.value)]))
          }
          style={styles.range}
        />
      </div>

      <div style={styles.group}>
        <label style={styles.label}>MinRating:{minRating}⭐</label>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={minRating}
          onChange={(e) => dispatch(setMinRating(Number(e.target.value)))}
          style={styles.range}
        />
      </div>

      <div style={styles.group}>
        <label style={styles.label}>Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          style={styles.select}
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    alignItems: "flex-end",
    padding: "1rem",
    background: "#f9f9f9",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    boxSizing: "border-box",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    minWidth: "150px",
    flex: "1 1 auto",
  },
  label: {
    fontSize: "0.8rem",
    color: "#555",
    fontWeight: "600",
  },
  select: {
    padding: "0.4rem 0.6rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "0.9rem",
    backgroundColor: "white",
  },
  range: {
    cursor: "pointer",
  },
};

export default Filters;
