import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { IoFilter, IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";
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
import styles from "./Filters.module.css";

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
    <div className={styles.container}>
      <button onClick={handleOpen} className={styles.filterTag}>
        <IoFilter size={18} />
        <span className={styles.filterTagText}>Filter and sort</span>
        {hasActiveFilters && <span className={styles.filterDot} />}
      </button>

      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={handleCancel} />
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h2 className={styles.sidebarTitle}>FILTER AND SORT</h2>
              <button onClick={handleClearAll} className={styles.clearAllBtn}>
                Clear All
              </button>
              <button onClick={handleCancel} className={styles.closeBtn}>
                <IoClose size={18} />
              </button>
            </div>

            <div className={styles.sidebarContent}>
              <div className={styles.accordionSection}>
                <button
                  onClick={() => toggleSection("categories")}
                  className={styles.accordionHeader}
                >
                  <span>Categories</span>
                  {expandedSections.categories ? (
                    <IoChevronUp size={16} />
                  ) : (
                    <IoChevronDown size={16} />
                  )}
                </button>
                {expandedSections.categories && (
                  <div className={styles.accordionBody}>
                    <div className={styles.pillContainer}>
                      {categories.map((category) => {
                        const isActive = localCategory === category;
                        return (
                          <button
                            key={category}
                            onClick={() => setLocalCategory(category)}
                            className={`${styles.pill} ${isActive ? styles.activePill : ""}`}
                          >
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.accordionSection}>
                <button
                  onClick={() => toggleSection("price")}
                  className={styles.accordionHeader}
                >
                  <span>Price Range</span>
                  {expandedSections.price ? (
                    <IoChevronUp size={16} />
                  ) : (
                    <IoChevronDown size={16} />
                  )}
                </button>
                {expandedSections.price && (
                  <div className={styles.accordionBody}>
                    <div className={styles.inputRow}>
                      <input
                        type="number"
                        placeholder="Min $"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className={styles.numberInput}
                        min="0"
                      />
                      <span className={styles.separator}>-</span>
                      <input
                        type="number"
                        placeholder="Max $"
                        value={maxPrice === Infinity ? "" : maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className={styles.numberInput}
                        min="0"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.accordionSection}>
                <button
                  onClick={() => toggleSection("rating")}
                  className={styles.accordionHeader}
                >
                  <span>Min. Rating</span>
                  {expandedSections.rating ? (
                    <IoChevronUp size={16} />
                  ) : (
                    <IoChevronDown size={16} />
                  )}
                </button>
                {expandedSections.rating && (
                  <div className={styles.accordionBody}>
                    <div className={styles.inputRow}>
                      <input
                        type="number"
                        placeholder="e.g. 4.0"
                        value={localRating}
                        onChange={(e) => setLocalRating(e.target.value)}
                        className={styles.numberInput}
                        min="0"
                        max="5"
                        step="0.1"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.accordionSection}>
                <button
                  onClick={() => toggleSection("sort")}
                  className={styles.accordionHeader}
                >
                  <span>Sort By</span>
                  {expandedSections.sort ? (
                    <IoChevronUp size={16} />
                  ) : (
                    <IoChevronDown size={16} />
                  )}
                </button>
                {expandedSections.sort && (
                  <div className={styles.accordionBody}>
                    <div className={styles.sortList}>
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
                            className={`${styles.sortOption} ${isActive ? styles.activeSortOption : ""}`}
                          >
                            <span>{option.label}</span>
                            {isActive && (
                              <span className={styles.checkmark}>✓</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.sidebarFooter}>
              <button onClick={handleApply} className={styles.showItemsBtn}>
                SHOW PRODUCTS
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Filters;
