import { Navigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "../features/products/productSelectors";
import { selectIsInWishlist } from "../features/wishlist/wishlistSelectors";
import { addToCart } from "../features/cart/cartSlice";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(selectProductById(id));
  const isInWishlist = useSelector((state) => selectIsInWishlist(state, id));

  if (!product) {
    return <Navigate to="/404" replace />;
  }
  const handleWishListClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

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
            <span
              style={{
                ...styles.stock,
                color: product.stock > 0 ? "#10b981" : "#ef4444",
              }}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} left)`
                : "Out of Stock"}
            </span>
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
              disabled={product.stock <= 0}
              style={{
                ...styles.cartBtn,
                opacity: product.stock <= 0 ? 0.6 : 1,
                cursor: product.stock <= 0 ? "not-allowed" : "pointer",
              }}
            >
              Add to cart
            </button>
            <button
              onClick={handleWishListClick}
              style={{
                ...styles.wishlistBtn,
                borderColor: isInWishlist ? "#ef4444" : "#ccc",
                backgroundColor: isInWishlist ? "#ffe4e6" : "white",
              }}
            >
              <FaHeart
                style={{
                  color: isInWishlist ? "#ef4444" : "#6b7280",
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
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "0 1.5rem",
    fontFamily: "system-ui, sans-serif",
  },
  backLink: {
    display: "inline-block",
    marginBottom: "1.5rem",
    color: "#4b5563",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  detailWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "3rem",
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
  },
  imageSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "1.5rem",
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
    color: "#9ca3af",
    fontWeight: "600",
    letterSpacing: "0.05em",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "2.25rem",
    color: "#111827",
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
    color: "#f59e0b",
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
    color: "#e44d26",
  },
  description: {
    fontSize: "1rem",
    color: "#4b5563",
    lineHeight: "1.6",
    margin: "0 0 2rem 0",
  },
  actionRow: {
    display: "flex",
    gap: "1rem",
  },
  cartBtn: {
    flex: 1,
    padding: "1rem",
    backgroundColor: "#1a1a1a",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    transition: "background-color 0.2s",
  },
  wishlistBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    border: "1px solid",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    width: "55px",
  },
};

export default ProductDetailPage;
