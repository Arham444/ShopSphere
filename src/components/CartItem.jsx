import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import PropTypes from "prop-types";

function CartItem({ item }) {
  const Dispatch = useDispatch();
  return (
    <div style={styles.row}>
      <img src={item.image} alt={item.name} style={styles.image} />
      <div style={styles.details}>
        <p style={styles.name}>{item.name}</p>
        <p style={styles.price}>{item.price}each</p>
      </div>
      <div style={styles.controls}>
        <button
          onClick={() =>
            Dispatch(
              updateQuantity({ id: item.id, quantity: item.quantity - 1 }),
            )
          }
          disabled={item.quantity <= 1}
          style={styles.qtyBtn}
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
          style={styles.qtyBtn}
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
    borderBottom: "1px solid #eee",
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
    color: "#666",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  qtyBtn: {
    padding: "2px 5px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  qty: {
    padding: "2px 5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  subtotal: {
    fontWeight: "bold",
    minWidth: "80px",
    textAlign: "right",
  },
  removeBtn: {
    padding: "3px 6px",
    cursor: "pointer",
    border: "1px solid #ff4d4d",
    borderRadius: "4px",
    color: "#ff4d4d",
    marginLeft: "10px",
  },
};

export default CartItem;
