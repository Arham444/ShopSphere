import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import {
  selectCartWithSubtotals,
  selectCartItemCount,
  selectCartTotal,
} from "../features/cart/cartSelectors.js";
import { theme } from "../theme";

function CartPage() {
  const items = useSelector(selectCartWithSubtotals);
  const itemCount = useSelector(selectCartItemCount);
  const total = useSelector(selectCartTotal);
  if (items.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>Your Cart is Empty</h2>
        <Link to="/" style={styles.link}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1> Your Cart with ({itemCount}) items</h1>
      <div style={styles.layout}>
        <div style={styles.items}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div style={styles.summary}>
          <h3>Order Summary</h3>
          <p>Items: {itemCount}</p>
          <p>Total: ${total}</p>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span style={{ color: theme.colors.success }}>Free</span>
          </div>
          <hr />
          <div
            style={{
              ...styles.summaryRow,
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            <span>Total</span>
            <span>${total}</span>
          </div>
          <Link to="/checkout" style={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>
          <Link to="/" style={styles.continueLink}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { ...theme.layouts.page },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 300px",
    gap: "2rem",
    alignItems: "start",
  },
  itemList: {
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "8px",
    overflow: "hidden",
  },
  summary: {
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "8px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    boxShadow: theme.shadows.card,
  },
  summaryRow: { display: "flex", justifyContent: "space-between" },
  checkoutBtn: {
    ...theme.buttons.primary,
    display: "block",
    textAlign: "center",
    padding: "0.75rem",
    textDecoration: "none",
    marginTop: "0.5rem",
  },
  continueLink: {
    display: "block",
    textAlign: "center",
    color: "#888",
    fontSize: "0.9rem",
    textDecoration: "none",
  },
  empty: { ...theme.empty },
  link: { color: theme.colors.primary },
};
export default CartPage;
