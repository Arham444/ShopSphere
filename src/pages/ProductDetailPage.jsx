import { useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProductById,
  selectProductReviews,
} from "../features/products/productSelectors";
import {
  setSearchCategory,
  addReview,
} from "../features/products/productSlice";
import { selectCurrentUser } from "../features/auth/authSelectors";
import { FaHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import {
  IoShieldCheckmarkOutline,
  IoRocketOutline,
  IoReturnDownBackOutline,
} from "react-icons/io5";
import { useWishlist } from "../features/wishlist/useWishlist";
import { useCartActions } from "../features/cart/useCartActions";
import StockStatus from "../components/StockStatus";
import QuantityControl from "../components/QuantityControl";
import StarRating from "../components/StarRating";
import PageBreadcrumb from "../components/PageBreadcrumb";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

// ── Main component ──────────────────────────────────────────
function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => selectProductById(state, id));
  const { isInWishlist, toggleWishlist } = useWishlist(product);
  const {
    cartQuantity,
    isOutOfStock,
    isLimitReached,
    handleAddToCart,
    isGuest,
  } = useCartActions(product);

  const currentUser = useSelector(selectCurrentUser);
  const reviews = useSelector((state) => selectProductReviews(state, id));
  const reviewCount = reviews.length;

  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [formError, setFormError] = useState("");

  if (!product) return <Navigate to="/404" replace />;

  const rating = product.rating;

  const handleToggleWishlist = () => {
    if (isGuest) navigate("/wishlist");
    else toggleWishlist();
  };

  const handleCategoryClick = (e) => {
    e.preventDefault();
    dispatch(setSearchCategory(product.category));
    navigate("/");
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setFormError("");

    if (!newTitle.trim()) return setFormError("Review title is required.");
    if (!newBody.trim()) return setFormError("Review body is required.");

    const newReview = {
      id: `review-${Date.now()}`,
      name: currentUser.username,
      rating: newRating,
      title: newTitle.trim(),
      body: newBody.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    dispatch(addReview({ productId: product.id, review: newReview }));

    setNewTitle("");
    setNewBody("");
    setNewRating(5);
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8 min-h-[calc(100dvh-140px)]">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <PageBreadcrumb
          items={[
            ...(product.category
              ? [
                  {
                    label: product.category,
                    href: "#",
                    onClick: handleCategoryClick,
                  },
                ]
              : []),
            { label: product.name },
          ]}
        />
      </div>

      {/* ═══ Hero Section: Image + Details ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative w-full flex items-start justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[280px] sm:max-h-[400px] object-contain mix-blend-multiply dark:mix-blend-normal"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-5">
          {/* Category */}
          <div>
            <Badge
              variant="secondary"
              className="text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-secondary/80 transition-colors"
              onClick={handleCategoryClick}
            >
              {product.category}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {product.name}
          </h1>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-3 flex-wrap">
            <StarRating rating={rating} />
            <span className="text-sm font-semibold text-foreground">
              {rating}
            </span>
            <span className="text-sm text-muted-foreground">
              ({reviewCount} reviews)
            </span>
          </div>

          <Separator />

          {/* Price + Stock */}
          <div className="flex items-end gap-4 flex-wrap">
            <span className="text-3xl sm:text-4xl font-black text-primary tracking-tight">
              ${product.price}
            </span>
            <StockStatus product={product} />
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {product.description ||
              "No description available for this product. Check back later for more details."}
          </p>

          <Separator />

          {/* Delivery & Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <IoRocketOutline className="h-5 w-5 text-primary shrink-0" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <IoReturnDownBackOutline className="h-5 w-5 text-primary shrink-0" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <IoShieldCheckmarkOutline className="h-5 w-5 text-primary shrink-0" />
              <span>Secure Checkout</span>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {!isOutOfStock && cartQuantity > 0 ? (
              <div className="flex-1 w-full">
                <QuantityControl product={product} className="h-12 text-base px-4" />
              </div>
            ) : (
              <Button
                onClick={handleAddToCart}
                disabled={isLimitReached}
                size="lg"
                className="flex-1 h-12 text-base font-semibold rounded-full"
                variant={isOutOfStock ? "secondary" : "default"}
              >
                {isOutOfStock
                  ? "Out of Stock"
                  : cartQuantity >= product.stock
                    ? "Limit Reached"
                    : "Add to Cart"}
              </Button>
            )}
            <Button
              onClick={handleToggleWishlist}
              size="icon"
              variant="outline"
              className={`h-12 w-12 shrink-0 rounded-full ${isInWishlist ? "text-red-500 border-red-500 hover:text-red-600 hover:bg-red-50" : "text-muted-foreground"}`}
            >
              <FaHeart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* ═══ Product Details Tabs Section ═══ */}
      <div className="mt-12 lg:mt-16 space-y-12">
        {/* Specifications */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-6">
            Product Specifications
          </h2>
          <Card className="shadow-sm overflow-hidden">
            <div className="divide-y">
              {[
                { label: "Category", value: product.category },
                { label: "Rating", value: `${rating} / 5.0` },
                {
                  label: "Availability",
                  value:
                    product.stock > 0
                      ? `In Stock (${product.stock} units)`
                      : "Out of Stock",
                },
                {
                  label: "Added",
                  value: product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A",
                },
                { label: "Shipping", value: "Free standard delivery" },
                { label: "Returns", value: "30-day hassle-free returns" },
              ].map((spec, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 px-5 py-3.5"
                >
                  <span className="text-sm font-semibold text-foreground sm:w-48 shrink-0">
                    {spec.label}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Customer Reviews */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={rating} size="text-sm" />
                <span className="text-sm text-muted-foreground">
                  Based on {reviewCount} reviews
                </span>
              </div>
            </div>

            {/* Rating Summary Bar */}
            <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-5 py-3">
              <span className="text-3xl font-black text-primary">{rating}</span>
              <div className="flex flex-col">
                <StarRating rating={rating} size="text-xs" />
                <span className="text-xs text-muted-foreground mt-0.5">
                  {reviewCount} ratings
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <Card key={review.id} className="shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {review.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} size="text-xs" />
                  </div>

                  <p className="text-sm font-semibold text-foreground">
                    {review.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {!isGuest && (
            <Card className="mt-8 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Write a Review
                </h3>
                {formError && (
                  <div className="p-3 mb-4 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 font-medium">
                    {formError}
                  </div>
                )}
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground block">
                      Overall Rating *{" "}
                      <span className="text-xs text-muted-foreground font-normal">
                        ({newRating} {newRating === 1 ? "star" : "stars"})
                      </span>
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((index) => {
                        const halfValue = index - 0.5;
                        const fullValue = index;
                        return (
                          <div
                            key={index}
                            className="relative w-8 h-8 flex items-center justify-center group/star"
                          >
                            {/* Star Icon Display */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform group-hover/star:scale-110">
                              {newRating >= fullValue ? (
                                <FaStar className="h-7 w-7 text-yellow-500" />
                              ) : newRating >= halfValue ? (
                                <FaStarHalfAlt className="h-7 w-7 text-yellow-500" />
                              ) : (
                                <FaRegStar className="h-7 w-7 text-yellow-500/30" />
                              )}
                            </div>
                            {/* Left half clickable trigger */}
                            <button
                              type="button"
                              onClick={() => setNewRating(halfValue)}
                              className="absolute left-0 top-0 w-4 h-8 cursor-pointer focus:outline-none z-10"
                              title={`${halfValue} Stars`}
                            />
                            {/* Right half clickable trigger */}
                            <button
                              type="button"
                              onClick={() => setNewRating(fullValue)}
                              className="absolute right-0 top-0 w-4 h-8 cursor-pointer focus:outline-none z-10"
                              title={`${fullValue} Stars`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="review-title"
                      className="text-sm font-semibold text-foreground"
                    >
                      Review Title *
                    </label>
                    <input
                      id="review-title"
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Summarize your experience..."
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="review-body"
                      className="text-sm font-semibold text-foreground"
                    >
                      Review Details *
                    </label>
                    <textarea
                      id="review-body"
                      value={newBody}
                      onChange={(e) => setNewBody(e.target.value)}
                      placeholder="What did you like or dislike?"
                      rows={4}
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto cursor-pointer"
                  >
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}

export default ProductDetailPage;
