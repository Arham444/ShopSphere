import { useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSelectors";
import PropTypes from "prop-types";
import styles from "./StockStatus.module.css";

function StockStatus({ product, style, className }) {
  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;

  const statusClass = isOutOfStock
    ? styles.outOfStock
    : cartQuantity >= product.stock
      ? styles.limitReached
      : styles.inStock;

  return (
    <span
      className={`${styles.status} ${statusClass} ${className || ""}`}
      style={style}
    >
      {isOutOfStock
        ? "Out of Stock"
        : cartQuantity >= product.stock
          ? `Limit Reached (${product.stock} in Cart)`
          : `In Stock (${product.stock - cartQuantity} left)`}
    </span>
  );
}

StockStatus.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default StockStatus;
