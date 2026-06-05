import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useWishlist } from "../features/wishlist/useWishlist";
import { FaHeart } from "react-icons/fa";
import PropTypes from "prop-types";
import { selectCartItems } from "../features/cart/cartSelectors";
import { theme } from "../theme";

import StockStatus from "./StockStatus";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { isInWishlist, toggleWishlist } = useWishlist(product);

  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const isLimitReached = isOutOfStock || cartQuantity >= product.stock;

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
        <StockStatus product={product} />
        <div style={styles.actions}>
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
                : "Add to Cart"}
          </button>
          <button
            onClick={toggleWishlist}
            style={{
              ...styles.wishBtn,
              borderColor: isInWishlist ? theme.colors.error : "#ccc",
            }}
          >
            <FaHeart
              style={{
                color: isInWishlist ? theme.colors.error : "#6b7280",
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
    ...theme.layouts.card,
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
    alignItems: "center",
    textAlign: "center",
  },
  category: {
    fontSize: "0.75rem",
    color: theme.colors.textMuted,
    margin: "0",
    width: "100%",
  },
  name: {
    fontWeight: "bold",
    textDecoration: "none",
    color: theme.colors.primary,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    height: "2.8rem",
    lineHeight: "1.4rem",
    width: "100%",
  },
  price: {
    fontWeight: "600",
    color: theme.colors.textDark,
    margin: "0",
    width: "100%",
  },
  rating: {
    margin: 0,
    color: theme.colors.warning,
    fontSize: "0.85rem",
    width: "100%",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "auto",
    width: "100%",
  },
  cartBtn: {
    ...theme.buttons.smallPrimary,
    flex: 1,
  },
  wishBtn: {
    ...theme.buttons.smallSecondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default ProductCard;
