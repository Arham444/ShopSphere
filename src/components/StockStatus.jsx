import { useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSelectors";
import PropTypes from "prop-types";
import { Badge } from "./ui/badge";

function StockStatus({ product, className }) {
  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const limitReached = cartQuantity >= product.stock;

  if (isOutOfStock) {
    return (
      <Badge
        variant="outline"
        className={`bg-stone-200/60 text-stone-500 border-stone-300/50 dark:bg-stone-800/40 dark:text-stone-400 dark:border-stone-700/50 ${className || ""}`}
      >
        Out of Stock
      </Badge>
    );
  }

  const variant = limitReached ? "secondary" : "default";

  return (
    <Badge variant={variant} className={className}>
      {limitReached
        ? `Limit Reached (${product.stock} in Cart)`
        : `In Stock (${product.stock - cartQuantity} left)`}
    </Badge>
  );
}

StockStatus.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default StockStatus;
