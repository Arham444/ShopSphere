import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useWishlist } from "../features/wishlist/useWishlist";
import { FaHeart } from "react-icons/fa";
import PropTypes from "prop-types";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { isInWishlist, toggleWishlist } = useWishlist(product);

  return (
    <div style={styles.card}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} style={styles.image} />
      </Link>
      <div style={styles.body}>
        <p style={styles.category}>{product.category}</p>
        <Link to={`/product/${product.id}`} style={styles.name}>
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
            onClick={toggleWishlist}
            style={{
              ...styles.wishBtn,
              borderColor: isInWishlist ? "#ef4444" : "#ccc",
            }}
          >
            <FaHeart
              style={{
                color: isInWishlist ? "#ef4444" : "#6b7280",
                cursor: "pointer",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

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
    flex: 1,
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
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    height: "2.8rem",
    lineHeight: "1.4rem",
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
