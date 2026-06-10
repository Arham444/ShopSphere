import { Navigate, useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "../features/products/productSelectors";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";
import { setSearchCategory } from "../features/products/productSlice";
import { FaHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import {
  IoTrashOutline,
  IoAdd,
  IoRemove,
  IoShieldCheckmarkOutline,
  IoRocketOutline,
  IoReturnDownBackOutline,
} from "react-icons/io5";
import { useWishlist } from "../features/wishlist/useWishlist";
import { selectCartItems } from "../features/cart/cartSelectors";
import { selectCurrentUser } from "../features/auth/authSelectors";
import StockStatus from "../components/StockStatus";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

// ── Deterministic mock data generators ──────────────────────
function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i);
  }
  return function () {
    h |= 0;
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const REVIEW_NAMES = [
  "Alex M.",
  "Jordan K.",
  "Sam P.",
  "Morgan R.",
  "Casey L.",
  "Taylor W.",
  "Riley J.",
  "Quinn B.",
];

const REVIEW_TITLES = [
  "Exceeded my expectations!",
  "Great value for money",
  "Solid quality product",
  "Very happy with this purchase",
  "Exactly what I needed",
  "Good but could be better",
  "Impressive build quality",
  "Would definitely recommend",
];

const REVIEW_BODIES = [
  "I've been using this for a few weeks now and I'm genuinely impressed. The quality is noticeably better than what I expected at this price point. Shipping was fast too!",
  "Really solid product overall. It does exactly what it promises and the build quality feels premium. I've recommended it to several friends already.",
  "Great purchase! The product matches the description perfectly. I was a bit hesitant at first but I'm glad I went ahead. Would buy again without hesitation.",
  "This has become my daily go-to. The attention to detail is remarkable and you can tell the manufacturer cares about quality. Five stars from me.",
  "Decent product for the price. There are a few minor things I'd change but overall it delivers good value. The packaging was also really well done.",
  "Love it! Arrived earlier than expected and the quality blew me away. It's clear that a lot of thought went into the design. Highly recommended.",
];

function generateReviews(productId, productRating) {
  const rng = seededRandom(productId);
  const count = 3 + Math.floor(rng() * 2); // 3-4 reviews
  const reviews = [];

  for (let i = 0; i < count; i++) {
    const nameIdx = Math.floor(rng() * REVIEW_NAMES.length);
    const titleIdx = Math.floor(rng() * REVIEW_TITLES.length);
    const bodyIdx = Math.floor(rng() * REVIEW_BODIES.length);
    // Ratings cluster around the product rating
    const baseRating = Math.max(
      3,
      Math.min(5, Math.round(productRating + (rng() - 0.5))),
    );
    const daysAgo = Math.floor(rng() * 90) + 7;
    const date = new Date(Date.now() - daysAgo * 86400000);

    reviews.push({
      id: `${productId}-r${i}`,
      name: REVIEW_NAMES[nameIdx],
      title: REVIEW_TITLES[titleIdx],
      body: REVIEW_BODIES[bodyIdx],
      rating: baseRating,
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      verified: rng() > 0.3,
    });
  }

  return reviews;
}

function generateReviewCount(productId) {
  const rng = seededRandom(productId + "_count");
  return Math.floor(rng() * 180) + 24;
}

// ── Star rendering ──────────────────────────────────────────
function StarRating({ rating, size = "text-base" }) {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3;

  for (let i = 0; i < full; i++) {
    stars.push(
      <FaStar key={`full-${i}`} className={`text-yellow-500 ${size}`} />,
    );
  }
  if (hasHalf) {
    stars.push(
      <FaStarHalfAlt key="half" className={`text-yellow-500 ${size}`} />,
    );
  }
  const remaining = 5 - stars.length;
  for (let i = 0; i < remaining; i++) {
    stars.push(
      <FaRegStar key={`empty-${i}`} className={`text-yellow-500/40 ${size}`} />,
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

// ── Main component ──────────────────────────────────────────
function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);

  const product = useSelector((state) => selectProductById(state, id));
  const { isInWishlist, toggleWishlist } = useWishlist(product);

  const isGuest = !currentUser || currentUser.role === "guest";

  if (!product) return <Navigate to="/404" replace />;

  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const isLimitReached = isOutOfStock || cartQuantity >= product.stock;

  const reviews = generateReviews(product.id, product.rating);
  const reviewCount = generateReviewCount(product.id);

  const handleAddToCart = () => {
    if (isGuest) {
      navigate("/cart");
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleToggleWishlist = () => {
    if (isGuest) {
      navigate("/wishlist");
    } else {
      toggleWishlist();
    }
  };

  const handleCategoryClick = (e) => {
    e.preventDefault();
    dispatch(setSearchCategory(product.category));
    navigate("/");
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8 min-h-[calc(100vh-140px)]">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {product.category && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={handleCategoryClick}>
                    {product.category}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* ═══ Hero Section: Image + Details ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative w-full flex items-start justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[400px] object-contain mix-blend-multiply dark:mix-blend-normal"
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
            <StarRating rating={product.rating} />
            <span className="text-sm font-semibold text-foreground">
              {product.rating}
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
              <div className="flex-1 flex items-center justify-between h-12 border-[3px] border-[#FFC107] rounded-full px-6 text-foreground font-bold text-lg">
                <button
                  onClick={() => {
                    if (cartQuantity === 1) {
                      dispatch(removeFromCart(product.id));
                    } else {
                      dispatch(
                        updateQuantity({
                          id: product.id,
                          quantity: cartQuantity - 1,
                        }),
                      );
                    }
                  }}
                  className="text-foreground/80 hover:text-foreground transition-colors flex items-center justify-center"
                >
                  {cartQuantity === 1 ? (
                    <IoTrashOutline size={24} />
                  ) : (
                    <IoRemove size={24} />
                  )}
                </button>
                <span className="text-xl text-foreground">{cartQuantity}</span>
                <button
                  onClick={() => {
                    dispatch(
                      updateQuantity({
                        id: product.id,
                        quantity: cartQuantity + 1,
                      }),
                    );
                  }}
                  disabled={cartQuantity >= product.stock}
                  className="text-foreground/80 hover:text-foreground transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  <IoAdd size={24} />
                </button>
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
                { label: "Rating", value: `${product.rating} / 5.0` },
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
                <StarRating rating={product.rating} size="text-sm" />
                <span className="text-sm text-muted-foreground">
                  Based on {reviewCount} reviews
                </span>
              </div>
            </div>

            {/* Rating Summary Bar */}
            <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-5 py-3">
              <span className="text-3xl font-black text-primary">
                {product.rating}
              </span>
              <div className="flex flex-col">
                <StarRating rating={product.rating} size="text-xs" />
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
                  <div className="flex items-start justify-between gap-3">
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
                    {review.verified && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] shrink-0"
                      >
                        Verified
                      </Badge>
                    )}
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
        </section>
      </div>
    </div>
  );
}

export default ProductDetailPage;
