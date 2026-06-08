import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useWishlist } from "../features/wishlist/useWishlist";
import { FaHeart } from "react-icons/fa";
import PropTypes from "prop-types";
import { selectCartItems } from "../features/cart/cartSelectors";
import { selectCurrentUser } from "../features/auth/authSelectors";
import styles from "./ProductCard.module.css";
import StockStatus from "./StockStatus";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const { isInWishlist, toggleWishlist } = useWishlist(product);
  const currentUser = useSelector(selectCurrentUser);

  const isGuest = !currentUser || currentUser.role === "guest";

  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const isLimitReached = isOutOfStock || cartQuantity >= product.stock;

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

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </Link>
      <div className={styles.body}>
        <p className={styles.category}>{product.category}</p>
        <Link to={`/product/${product.id}`} className={styles.name}>
          {product.name}
        </Link>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.rating}>⭐ {product.rating}</p>
        <StockStatus product={product} />
        <div className={styles.actions}>
          <button
            onClick={handleAddToCart}
            disabled={isLimitReached}
            className={styles.cartBtn}
          >
            {isOutOfStock
              ? "Out of Stock"
              : cartQuantity >= product.stock
                ? "Limit Reached"
                : "Add to Cart"}
          </button>
          <button
            onClick={handleToggleWishlist}
            className={`${styles.wishBtn} ${isInWishlist ? styles.activeWish : ""}`}
          >
            <FaHeart
              style={{
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

export default ProductCard;
