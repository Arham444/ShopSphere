import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { IoFilter, IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { theme } from "../theme";
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
  const [localCategory, setLocalCategory] = useState(selectedCategory);
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(
    priceRange[1] === Infinity ? "" : priceRange[1],
  );
  const [localRating, setLocalRating] = useState(minRating);
  const [localSortBy, setLocalSortBy] = useState(sortBy);

  const [expandedSections, setExpandedSections] = useState({
    categories: false,
    price: false,
    rating: false,
    sort: false,
  });

  const toggleSection = (openSection) => {
    setExpandedSections((prev) => ({
      ...prev,
      [openSection]: !prev[openSection],
    }));
  };

  const handleOpen = () => {
    setLocalCategory(selectedCategory);
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1] === Infinity ? "" : priceRange[1]);
    setLocalRating(minRating);
    setLocalSortBy(sortBy);
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleApply = () => {
    const minVal = minPrice === "" ? 0 : Number(minPrice);
    const maxVal = maxPrice === "" ? Infinity : Number(maxPrice);
    const ratingVal = localRating === "" ? 0 : Number(localRating);

    dispatch(setSearchCategory(localCategory));
    dispatch(setPriceRange([minVal, maxVal]));
    dispatch(setMinRating(ratingVal));
    dispatch(setSortBy(localSortBy));

    setIsOpen(false);
  };

  const handleClearAll = () => {
    setLocalCategory("All");
    setMinPrice(0);
    setMaxPrice(500);
    setLocalRating(0);
    setLocalSortBy("newest");
  };

  const handleSortBy = (value) => {
    setLocalSortBy(value);
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 500 ||
    minRating !== 0;

  return (
    <div style={styles.container}>
      <button onClick={handleOpen} style={styles.filterTag}>
        <IoFilter size={18} />
        <span style={styles.filterTagText}>Filter and sort</span>
        {hasActiveFilters && <span style={styles.filterDot} />}
      </button>

      {isOpen && (
        <>
          <div style={styles.backdrop} onClick={handleCancel} />
          <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <h2 style={styles.sidebarTitle}>FILTER AND SORT</h2>
              <button onClick={handleClearAll} style={styles.clearAllBtn}>
                Clear All
              </button>
              <button onClick={handleCancel} style={styles.closeBtn}>
                <IoClose size={18} />
              </button>
            </div>

            <div style={styles.sidebarContent}>
              <div style={styles.accordionSection}>
                <button
                  onClick={() => toggleSection("categories")}
                  style={styles.accordionHeader}
                >
                  <span>Categories</span>
                  {expandedSections.categories ? (
                    <IoChevronUp size={16} />
                  ) : (
                    <IoChevronDown size={16} />
                  )}
                </button>
                {expandedSections.categories && (
                  <div style={styles.accordionBody}>
                    <div style={styles.pillContainer}>
                      {categories.map((category) => {
                        const isActive = localCategory === category;
                        return (
                          <button
                            key={category}
                            onClick={() => setLocalCategory(category)}
                            style={{
                              ...styles.pill,
                              backgroundColor: isActive
                                ? "var(--button-primary-bg)"
                                : "var(--color-background-light)",
                              color: isActive
                                ? "var(--button-primary-color)"
                                : "var(--color-text-dark)",
                              borderColor: isActive
                                ? "var(--button-primary-bg)"
                                : "var(--color-border)",
                              fontWeight: isActive ? "600" : "500",
                            }}
                          >
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.accordionSection}>
                <button
                  onClick={() => toggleSection("price")}
                  style={styles.accordionHeader}
                >
                  <span>Price Range</span>
                  {expandedSections.price ? (
                    <IoChevronUp size={16} />
                  ) : (
                    <IoChevronDown size={16} />
                  )}
                </button>
                {expandedSections.price && (
                  <div style={styles.accordionBody}>
                    <div style={styles.inputRow}>
                      <input
                        type="number"
                        placeholder="Min $"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        style={styles.numberInput}
                        min="0"
                      />
                      <span style={styles.separator}>-</span>
                      <input
                        type="number"
                        placeholder="Max $"
                        value={maxPrice === Infinity ? "" : maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        style={styles.numberInput}
                        min="0"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.accordionSection}>
                <button
                  onClick={() => toggleSection("rating")}
                  style={styles.accordionHeader}
                >
                  <span>Min. Rating</span>
                  {expandedSections.rating ? (
                    <IoChevronUp size={16} />
                  ) : (
                    <IoChevronDown size={16} />
                  )}
                </button>
                {expandedSections.rating && (
                  <div style={styles.accordionBody}>
                    <div style={styles.inputRow}>
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
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.accordionSection}>
                <button
                  onClick={() => toggleSection("sort")}
                  style={styles.accordionHeader}
                >
                  <span>Sort By</span>
                  {expandedSections.sort ? (
                    <IoChevronUp size={16} />
                  ) : (
                    <IoChevronDown size={16} />
                  )}
                </button>
                {expandedSections.sort && (
                  <div style={styles.accordionBody}>
                    <div style={styles.sortList}>
                      {[
                        { value: "newest", label: "Newest" },
                        {
                          value: "price-ascending",
                          label: "Price: Low to High",
                        },
                        {
                          value: "price-descending",
                          label: "Price: High to Low",
                        },
                        { value: "name", label: "Name" },
                      ].map((option) => {
                        const isActive = localSortBy === option.value;
                        return (
                          <button
                            key={option.value}
                            onClick={() => handleSortBy(option.value)}
                            style={{
                              ...styles.sortOption,
                              fontWeight: isActive ? "600" : "400",
                              color: isActive
                                ? theme.colors.primary
                                : "var(--color-text-muted)",
                            }}
                          >
                            <span>{option.label}</span>
                            {isActive && (
                              <span style={styles.checkmark}>✓</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.sidebarFooter}>
              <button onClick={handleApply} style={styles.showItemsBtn}>
                SHOW PRODUCTS
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "1.5rem",
    fontFamily: "system-ui, sans-serif",
  },
  filterTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem 0",
    fontSize: "0.95rem",
    fontWeight: "500",
    color: theme.colors.primary,
    outline: "none",
    position: "relative",
    marginLeft: "auto",
  },
  filterTagText: {
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  },
  filterDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: theme.colors.accent,
    position: "absolute",
    top: "4px",
    right: "-12px",
  },
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.colors.overlayBg,
    zIndex: 999,
  },
  sidebar: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "400px",
    height: "100vh",
    backgroundColor: "var(--color-card-bg)",
    boxShadow: "var(--shadow-card)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    animation: "slideIn 0.3s ease-out",
  },
  sidebarHeader: {
    padding: "1.5rem",
    borderBottom: `1px solid ${theme.colors.border}`,
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
    position: "relative",
  },
  sidebarTitle: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: "700",
    letterSpacing: "0.05em",
    color: "var(--color-text-dark)",
  },
  clearAllBtn: {
    background: "transparent",
    border: "none",
    color: "var(--color-text-muted)",
    fontSize: "0.85rem",
    textDecoration: "underline",
    cursor: "pointer",
    padding: 0,
    fontWeight: "500",
  },
  closeBtn: {
    background: "var(--color-primary)",
    color: "var(--button-primary-color)",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "absolute",
    right: "1.5rem",
    top: "1.25rem",
    outline: "none",
  },
  sidebarContent: {
    flex: 1,
    overflowY: "auto",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  accordionSection: {
    borderBottom: `1px solid ${theme.colors.border}`,
    paddingBottom: "1.25rem",
  },
  accordionHeader: {
    width: "100%",
    background: "transparent",
    border: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: "600",
    color: theme.colors.primary,
    padding: "0.5rem 0",
    cursor: "pointer",
    outline: "none",
  },
  accordionBody: {
    paddingTop: "0.75rem",
  },
  pillContainer: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  pill: {
    padding: "0.4rem 1rem",
    fontSize: "0.85rem",
    borderRadius: "9999px",
    border: "1px solid",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    outline: "none",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  numberInput: {
    ...theme.inputs.text,
    width: "100%",
    padding: "0.5rem 0.75rem",
  },
  separator: {
    color: "var(--color-text-muted)",
    fontSize: "1rem",
  },
  sortList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  sortOption: {
    width: "100%",
    background: "transparent",
    border: "none",
    textAlign: "left",
    fontSize: "0.95rem",
    padding: "0.5rem 0",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    outline: "none",
    color: "var(--color-text-dark)",
  },
  checkmark: {
    color: theme.colors.accent,
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  sidebarFooter: {
    padding: "1.5rem",
    borderTop: `1px solid ${theme.colors.border}`,
  },
  showItemsBtn: {
    ...theme.buttons.primary,
    width: "100%",
    padding: "1rem",
    fontSize: "0.95rem",
    fontWeight: "600",
    letterSpacing: "0.05em",
  },
};

export default Filters;
