import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import PropTypes from "prop-types";
import styles from "./CartItem.module.css";

function CartItem({ item }) {
  const Dispatch = useDispatch();
  return (
    <div className={styles.row}>
      <img src={item.image} alt={item.name} className={styles.image} />
      <div className={styles.details}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.price}>
          $ {item.price} {item.quantity > 1 ? "each" : ""}
        </p>
      </div>
      <div className={styles.controls}>
        <button
          onClick={() =>
            Dispatch(
              updateQuantity({ id: item.id, quantity: item.quantity - 1 }),
            )
          }
          disabled={item.quantity <= 1}
          className={styles.qtyBtn}
        >
          -
        </button>
        <span className={styles.qty}>{item.quantity}</span>
        <button
          onClick={() =>
            Dispatch(
              updateQuantity({ id: item.id, quantity: item.quantity + 1 }),
            )
          }
          disabled={item.quantity >= item.stock}
          className={styles.qtyBtn}
        >
          +
        </button>
      </div>
      <p className={styles.subtotal}>${item.subtotal}</p>
      <button
        onClick={() => Dispatch(removeFromCart(item.id))}
        className={styles.removeBtn}
      >
        Remove
      </button>
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
