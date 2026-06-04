import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
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

  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);
  const [localRating, setLocalRating] = useState(minRating);

  const handleApplyPrice = (e) => {
    e.preventDefault();
    const minVal = minPrice === "" ? 0 : Number(minPrice);
    const maxVal = maxPrice === "" ? Infinity : Number(maxPrice);
    dispatch(setPriceRange([minVal, maxVal]));
  };

  const handleApplyRating = (e) => {
    e.preventDefault();
    const ratingVal = localRating === "" ? 0 : Number(localRating);
    dispatch(setMinRating(ratingVal));
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 500 ||
    minRating !== 0;

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            ...styles.toggleButton,
            backgroundColor: isOpen ? "#1a1a1a" : "#ffffff",
            color: isOpen ? "#ffffff" : "#1a1a1a",
          }}
        >
          <IoFilter size={18} />
          <span>{isOpen ? "Hide Filters" : "Show Filters"}</span>
          {hasActiveFilters && <span style={styles.filterDot} />}
        </button>

        <div style={styles.sortWrapper}>
          <label style={styles.sortLabel}>Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            style={styles.select}
          >
            <option value="newest">Newest</option>
            <option value="price-ascending">Price: Low to High</option>
            <option value="price-descending">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {isOpen && (
        <div style={styles.panel}>
          <div style={styles.categoriesRow}>
            <span style={styles.sectionTitle}>Categories</span>
            <div style={styles.pillContainer}>
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => dispatch(setSearchCategory(category))}
                    style={{
                      ...styles.pill,
                      backgroundColor: isActive ? "#1a1a1a" : "#f3f4f6",
                      color: isActive ? "#ffffff" : "#4b5563",
                      borderColor: isActive ? "#1a1a1a" : "#e5e7eb",
                      fontWeight: isActive ? "600" : "500",
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={styles.controlsRow}>
            <div style={styles.controlGroup}>
              <label style={styles.controlLabel}>Price Range</label>
              <form onSubmit={handleApplyPrice} style={styles.inputRow}>
                <input
                  type="number"
                  placeholder="Min $ (e.g. 10)"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={styles.numberInput}
                  min="0"
                />
                <span style={styles.separator}>-</span>
                <input
                  type="number"
                  placeholder="Max $ (e.g. 250)"
                  value={maxPrice === Infinity ? "" : maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={styles.numberInput}
                  min="0"
                />
                <button type="submit" style={styles.okButton}>
                  OK
                </button>
              </form>
            </div>

            <div style={styles.controlGroup}>
              <label style={styles.controlLabel}>Min. Rating</label>
              <form onSubmit={handleApplyRating} style={styles.inputRow}>
                <input
                  type="number"
                  placeholder="e.g. 4.0"
                  value={localRating}
                  onChange={(e) => setLocalRating(e.target.value)}
                  style={styles.numberInput}
                  min="0"
                  max="5"
                  step="0.1"
                />
                <button type="submit" style={styles.okButton}>
                  OK
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    marginBottom: "2rem",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    boxSizing: "border-box",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  toggleButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    border: "1px solid #1a1a1a",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    outline: "none",
  },
  filterDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#ef4444",
    display: "inline-block",
    marginLeft: "0.25rem",
  },
  sortWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  sortLabel: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#4b5563",
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    borderTop: "1px solid #f3f4f6",
    paddingTop: "1.25rem",
  },
  categoriesRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  sectionTitle: {
    fontSize: "0.8rem",
    fontWeight: "700",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  pillContainer: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  pill: {
    padding: "0.5rem 1.2rem",
    fontSize: "0.85rem",
    borderRadius: "9999px",
    border: "1px solid",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    outline: "none",
  },
  controlsRow: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  controlGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    minWidth: "240px",
    flex: "1 1 auto",
  },
  controlLabel: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#374151",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  numberInput: {
    width: "140px",
    padding: "0.5rem 0.75rem",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  separator: {
    color: "#9ca3af",
    fontSize: "1rem",
  },
  okButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "600",
    transition: "background 0.2s",
    outline: "none",
  },
  select: {
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    fontSize: "0.9rem",
    color: "#1f2937",
    cursor: "pointer",
    outline: "none",
    transition: "border-color 0.2s",
  },
};

Filters.propTypes = {};

export default Filters;
