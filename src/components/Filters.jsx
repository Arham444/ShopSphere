import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { IoFilter, IoChevronDown, IoChevronUp } from "react-icons/io5";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

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
    dispatch(setSearchCategory("All"));
    dispatch(setPriceRange([0, 500]));
    dispatch(setMinRating(0));
    dispatch(setSortBy("newest"));
    setIsOpen(false);
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
    <>
      <Button
        variant="outline"
        onClick={handleOpen}
        className="gap-2 bg-background shadow-sm hover:bg-muted"
      >
        <IoFilter className="h-4 w-4" />
        <span>Filter and sort</span>
        {hasActiveFilters && (
          <span className="flex h-2 w-2 rounded-full bg-primary" />
        )}
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-[85vw] sm:max-w-md flex flex-col p-0 h-full overflow-hidden bg-background"
        >
          <SheetHeader className="p-4 pr-12 border-b shrink-0 flex flex-row items-center justify-between text-left">
            <SheetTitle>FILTER AND SORT</SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="h-8 "
            >
              Clear All
            </Button>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {/* Categories */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <button
                onClick={() => toggleSection("categories")}
                className="flex w-full items-center justify-between p-4 font-medium"
              >
                <span>Categories</span>
                {expandedSections.categories ? (
                  <IoChevronUp className="h-4 w-4" />
                ) : (
                  <IoChevronDown className="h-4 w-4" />
                )}
              </button>
              {expandedSections.categories && (
                <div className="p-4 pt-0 flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const isActive = localCategory === category;
                    return (
                      <Badge
                        key={category}
                        variant={isActive ? "default" : "secondary"}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setLocalCategory(category)}
                      >
                        {category}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <button
                onClick={() => toggleSection("price")}
                className="flex w-full items-center justify-between p-4 font-medium"
              >
                <span>Price Range</span>
                {expandedSections.price ? (
                  <IoChevronUp className="h-4 w-4" />
                ) : (
                  <IoChevronDown className="h-4 w-4" />
                )}
              </button>
              {expandedSections.price && (
                <div className="p-4 pt-0 flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min $"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    placeholder="Max $"
                    value={maxPrice === Infinity ? "" : maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                  />
                </div>
              )}
            </div>

            {/* Min Rating */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <button
                onClick={() => toggleSection("rating")}
                className="flex w-full items-center justify-between p-4 font-medium"
              >
                <span>Min. Rating</span>
                {expandedSections.rating ? (
                  <IoChevronUp className="h-4 w-4" />
                ) : (
                  <IoChevronDown className="h-4 w-4" />
                )}
              </button>
              {expandedSections.rating && (
                <div className="p-4 pt-0">
                  <Input
                    type="number"
                    placeholder="e.g. 4.0"
                    value={localRating}
                    onChange={(e) => setLocalRating(e.target.value)}
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
              )}
            </div>

            {/* Sort By */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <button
                onClick={() => toggleSection("sort")}
                className="flex w-full items-center justify-between p-4 font-medium"
              >
                <span>Sort By</span>
                {expandedSections.sort ? (
                  <IoChevronUp className="h-4 w-4" />
                ) : (
                  <IoChevronDown className="h-4 w-4" />
                )}
              </button>
              {expandedSections.sort && (
                <div className="p-4 pt-0 flex flex-col gap-1">
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
                        className={`flex items-center justify-between w-full p-2 rounded-md text-sm transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-muted"
                        }`}
                      >
                        <span>{option.label}</span>
                        {isActive && <span>✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <SheetFooter className="p-4 border-t shrink-0">
            <Button onClick={handleApply} className="w-full">
              SHOW PRODUCTS
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Filters;
