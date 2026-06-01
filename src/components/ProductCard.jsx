import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { FaHeart } from "react-icons/fa";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div style={styles.card}>
      <Link to={`/products/${product.id}`}>
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
    border: "1px solid #ddd",
    padding: "1rem",
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  body: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  category: {
    fontSize: "0.75 rem",
    color: "#888",
    margin: "0",
  },
  name: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#1a1a1a",
  },
  price: {
    fontWeight: "600",
    color: "#e44d26",
    margin: "0",
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
  },
  cartBtn: {
    flex: 1,
    padding: "0.5rem",
    backgroundColor: "#1a1a1a",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  wishBtn: {
    padding: "0.5rem",
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ProductCard;
