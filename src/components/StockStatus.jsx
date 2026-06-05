import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { selectCartItems } from "../features/cart/cartSelectors";
import { theme } from "../theme";

function StockStatus({ product, style }) {
  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;

  return (
    <span
      style={{
        color: isOutOfStock
          ? theme.colors.outOfStock
          : cartQuantity >= product.stock
          ? theme.colors.warning
          : theme.colors.success,
        fontWeight: "600",
        fontSize: "0.85rem",
        margin: 0,
        ...style,
      }}
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
};

export default StockStatus;
