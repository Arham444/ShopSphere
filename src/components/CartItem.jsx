import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import PropTypes from "prop-types";
import { theme } from "../theme";

function CartItem({ item }) {
  const Dispatch = useDispatch();
  return (
    <div style={styles.row}>
      <img src={item.image} alt={item.name} style={styles.image} />
      <div style={styles.details}>
        <p style={styles.name}>{item.name}</p>
        <p style={styles.price}>
          $ {item.price} {item.quantity > 1 ? "each" : ""}
        </p>
      </div>
      <div style={styles.controls}>
        <button
          onClick={() =>
            Dispatch(
              updateQuantity({ id: item.id, quantity: item.quantity - 1 }),
            )
          }
          disabled={item.quantity <= 1}
          style={item.quantity <= 1 ? styles.qtyBtnDisabled : styles.qtyBtn}
        >
          -
        </button>
        <span style={styles.qty}>{item.quantity}</span>
        <button
          onClick={() =>
            Dispatch(
              updateQuantity({ id: item.id, quantity: item.quantity + 1 }),
            )
          }
          disabled={item.quantity >= item.stock}
          style={
            item.quantity >= item.stock ? styles.qtyBtnDisabled : styles.qtyBtn
          }
        >
          +
        </button>
      </div>
      <p style={styles.subtotal}>${item.subtotal}</p>
      <button
        onClick={() => Dispatch(removeFromCart(item.id))}
        style={styles.removeBtn}
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

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid var(--color-border)",
    padding: "10px 0",
    justifyContent: "space-between",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  details: {
    flex: 1,
    marginLeft: "10px",
  },
  name: {
    margin: "0 0 5px 0",
    fontWeight: "bold",
  },
  price: {
    margin: 0,
    color: "var(--color-text-muted)",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "var(--button-qty-container-bg)",
    borderRadius: "20px",
    padding: "3px",
    gap: "6px",
  },
  qtyBtn: {
    ...theme.buttons.qty,
  },
  qtyBtnDisabled: {
    ...theme.buttons.qtyDisabled,
  },
  qty: {
    minWidth: "24px",
    textAlign: "center",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "var(--color-text-dark)",
    padding: "0 4px",
  },
  subtotal: {
    fontWeight: "bold",
    minWidth: "80px",
    textAlign: "right",
  },
  removeBtn: {
    ...theme.buttons.smallPrimary,
    marginLeft: "1.5rem",
  },
};

export default CartItem;
