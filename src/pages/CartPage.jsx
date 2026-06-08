import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import {
  selectCartWithSubtotals,
  selectCartItemCount,
  selectCartTotal,
} from "../features/cart/cartSelectors.js";
import styles from "./CartPage.module.css";

function CartPage() {
  const items = useSelector(selectCartWithSubtotals);
  const itemCount = useSelector(selectCartItemCount);
  const total = useSelector(selectCartTotal);
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your Cart is Empty</h2>
        <Link to="/" className={styles.link}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1> Your Cart with ({itemCount}) items</h1>
      <div className={styles.layout}>
        <div className={styles.items}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className={styles.summary}>
          <h3>Order Summary</h3>
          <p>Items: {itemCount}</p>
          <p>Total: ${total}</p>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span style={{ color: "var(--color-success)" }}>Free</span>
          </div>
          <hr />
          <div
            className={styles.summaryRow}
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            <span>Total</span>
            <span>${total}</span>
          </div>
          <Link to="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>
          <Link to="/" className={styles.continueLink}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
