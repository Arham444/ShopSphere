import { Navigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "../features/products/productSelectors";
import { addToCart } from "../features/cart/cartSlice";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../features/wishlist/useWishlist";
import { selectCartItems } from "../features/cart/cartSelectors";
import { theme } from "../theme";

import StockStatus from "../components/StockStatus";

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const product = useSelector((state) => selectProductById(state, id));
  const { isInWishlist, toggleWishlist } = useWishlist(product);

  if (!product) return <Navigate to="/404" replace />;

  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const isLimitReached = isOutOfStock || cartQuantity >= product.stock;

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>
        Back to All Products
      </Link>
      <div style={styles.detailWrapper}>
        <div style={styles.imageSection}>
          <img src={product.image} alt={product.name} style={styles.image} />
        </div>
        <div style={styles.infoSection}>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.title}>{product.name}</h1>
          <div style={styles.metaRow}>
            <span style={styles.rating}>⭐ {product.rating}</span>
            <StockStatus product={product} style={styles.stock} />
          </div>
          <div style={styles.priceRow}>
            <span style={styles.price}>${product.price}</span>
          </div>
          <p style={styles.description}>
            {product.description || "No description available for this product"}
          </p>
          <div style={styles.actionRow}>
            <button
              onClick={() => dispatch(addToCart(product))}
              disabled={isLimitReached}
              style={{
                ...styles.cartBtn,
                ...(isLimitReached ? theme.buttons.disabled : {}),
              }}
            >
              {isOutOfStock
                ? "Out of Stock"
                : cartQuantity >= product.stock
                  ? "Limit Reached"
                  : "Add to cart"}
            </button>
            <button
              onClick={toggleWishlist}
              style={{
                ...styles.wishlistBtn,
                borderColor: isInWishlist
                  ? theme.colors.error
                  : "var(--color-border)",
                backgroundColor: isInWishlist
                  ? theme.colors.errorLight
                  : "var(--color-card-bg)",
              }}
            >
              <FaHeart
                style={{
                  color: isInWishlist
                    ? theme.colors.error
                    : "var(--color-text-muted)",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  container: {
    ...theme.layouts.page,
  },
  backLink: {
    display: "inline-block",
    marginBottom: "1.5rem",
    color: "var(--color-text-muted)",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  detailWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "3rem",
    backgroundColor: "var(--color-card-bg)",
    borderRadius: "12px",
    overflow: "hidden",
  },
  imageSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--color-background-light)",
    borderRadius: "12px",
    padding: "1.5rem",
    border: `1px solid ${theme.colors.border}`,
  },
  image: {
    maxWidth: "100%",
    maxHeight: "450px",
    objectFit: "contain",
    borderRadius: "8px",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem",
  },
  category: {
    fontSize: "0.875rem",
    textTransform: "uppercase",
    color: theme.colors.textMuted,
    fontWeight: "600",
    letterSpacing: "0.05em",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "2.25rem",
    color: theme.colors.primary,
    fontWeight: "700",
    lineHeight: "1.2",
    margin: "0 0 1rem 0",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    marginBottom: "1.5rem",
    fontSize: "0.95rem",
  },
  rating: {
    color: theme.colors.warning,
    fontWeight: "600",
  },
  stock: {
    fontWeight: "600",
  },
  priceRow: {
    marginBottom: "1.5rem",
  },
  price: {
    fontSize: "2rem",
    fontWeight: "700",
    color: theme.colors.textDark,
  },
  description: {
    fontSize: "1rem",
    color: "var(--color-text-dark)",
    lineHeight: "1.6",
    margin: "0 0 2rem 0",
  },
  actionRow: {
    display: "flex",
    gap: "1rem",
  },
  cartBtn: {
    ...theme.buttons.primary,
    flex: 1,
    padding: "1rem",
  },
  wishlistBtn: {
    ...theme.buttons.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    width: "55px",
  },
};
export default ProductDetailPage;
