import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import PropTypes from "prop-types";
import styles from "./CartItem.module.css";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.row}>
      {/* Product Column: Image + Name */}
      <div className={styles.productCol}>
        <div className={styles.imageContainer}>
          <img src={item.image} alt={item.name} className={styles.image} />
        </div>
        <span className={styles.name}>{item.name}</span>
      </div>

      {/* Price Column */}
      <div className={styles.priceCol}>
        ${item.price}
      </div>

      {/* Quantity Column */}
      <div className={styles.quantityCol}>
        <div className={styles.quantitySelector}>
          <span className={styles.quantityValue}>
            {String(item.quantity).padStart(2, "0")}
          </span>
          <div className={styles.quantityArrows}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity + 1 }),
                )
              }
              disabled={item.quantity >= item.stock}
              aria-label="Increase quantity"
            >
              <svg
                viewBox="0 0 24 24"
                width="10"
                height="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity - 1 }),
                )
              }
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <svg
                viewBox="0 0 24 24"
                width="10"
                height="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Subtotal Column */}
      <div className={styles.subtotalCol}>
        ${item.subtotal}
      </div>

      {/* Remove Action Column */}
      <div className={styles.actionCol}>
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className={styles.removeBtn}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    subtotal: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
