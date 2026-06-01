import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { FaHeart } from "react-icons/fa";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div style={styles.card}>
      <Link
        to={`/products/${product.id}`}
        style={{ textDecoration: "none", color: "var(--text-h)" }}
      >
        <img src={product.image} alt={product.name} style={styles.image} />
      </Link>
      <div style={styles.body}>
        <p style={styles.category}>{product.category}</p>
        <Link to={`/products/${product.id}`} style={styles.name}>
          {product.name}
        </Link>
        <p style={styles.price}>${product.price}</p>
        <p style={styles.rating}>⭐ {product.rating}</p>
        <div style={styles.actions}>
          <button
            onClick={() => dispatch(addToCart(product))}
            style={styles.cartBtn}
          >
            Add to Cart
          </button>
          <button
            onClick={() => dispatch(addToWishlist(product))}
            style={styles.wishBtn}
          >
            ♡
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid var(--border)",
    padding: "1rem",
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--card-bg)",
    boxShadow: "var(--shadow)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  body: {
    padding: "0.75rem 0 0 0",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  category: {
    fontSize: "0.75rem",
    color: "var(--text)",
    margin: "0",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  name: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "var(--text-h)",
    fontSize: "1.1rem",
    lineHeight: "1.3",
  },
  price: {
    fontWeight: "600",
    color: "var(--accent)",
    margin: "0",
    fontSize: "1.2rem",
  },
  rating: {
    margin: 0,
    color: "#f59e0b",
    fontSize: "0.85rem",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "auto",
    paddingTop: "0.75rem",
  },
  cartBtn: {
    flex: 1,
    padding: "0.6rem",
    backgroundColor: "var(--text-h)",
    color: "var(--bg)",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  },
  wishBtn: {
    padding: "0.6rem 0.8rem",
    backgroundColor: "var(--accent-bg)",
    color: "var(--accent)",
    border: "1px solid var(--accent-border)",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s ease",
  },
};

export default ProductCard;
