import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  selectCartItemCount,
  selectCartWithSubtotals,
  selectCartTotal,
} from "../features/cart/cartSelectors";
import { TiTick } from "react-icons/ti";
import { clearCart } from "../features/cart/cartSlice";
import { checkoutProducts } from "../features/products/productSlice";
import { theme } from "../theme";
const TAX_RATE = 0.08;

function CheckoutPage() {
  const items = useSelector(selectCartWithSubtotals);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (items.length === 0 && !orderPlaced)
    return (
      <div style={styles.empty}>
        <h2>Your Cart Is Empty.</h2>
        <p>Add some products before checking out.</p>
        <Link to="/"> Browse Products </Link>
      </div>
    );

  if (orderPlaced)
    return (
      <div style={styles.confirmation}>
        <div style={styles.confirmBox}>
          <h1 style={styles.confirmIcon}>
            <TiTick />
          </h1>
          <h2>Order Placed!</h2>
          <p style={styles.confirmText}>
            Thank you for your order. Your items will be delivered soon.
          </p>
          <button onClick={() => navigate("/")} style={styles.continueBtn}>
            Continue Shopping
          </button>
        </div>
      </div>
    );

  const taxAmount = total * TAX_RATE;
  const grandTotal = total + taxAmount;
  const handlePlaceOrder = () => {
    dispatch(
      checkoutProducts(
        items.map((item) => ({ id: item.id, quantity: item.quantity })),
      ),
    );
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  return (
    <div style={styles.page}>
      <h1>Welcome to Checkout!</h1>
      <h2> Review your Order!</h2>
      <div style={styles.layout}>
        <div style={styles.itemSection}>
          <h2 style={styles.sectionTitle}>Order Items ({itemCount})</h2>
          <div style={styles.itemList}>
            {items.map((item) => (
              <div key={item.id} style={styles.item}>
                <img src={item.image} alt={item.name} style={styles.image} />
                <div style={styles.itemInfo}>
                  <p style={styles.itemName}>{item.name}</p>
                  <p style={styles.itemMeta}>
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <p style={styles.itemSubtotal}>${item.subtotal}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.summary}>
          <h2 style={styles.sectionTitle}>Price Breakdown</h2>
          <div style={styles.summaryRow}>
            <span> SubTotal ({itemCount} items)</span>
            <span> ${total}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span style={{ color: theme.colors.success }}>Free</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Tax (8%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <hr style={styles.divider} />
          <div style={{ ...styles.summaryRow, ...styles.grandTotal }}>
            <span>Grand Total</span>
            <span> ${grandTotal.toFixed(2)}</span>
          </div>
          <button onClick={handlePlaceOrder} style={styles.OrderBtn}>
            Place Order
          </button>
          <Link to="/cart" style={styles.backLink}>
            Back to Cart
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
    gridTemplateColumns: "1fr 320px",
    gap: "2rem",
    alignItems: "start",
  },
  sectionTitle: { fontSize: "1.1rem", fontWeight: "600", marginBottom: "1rem" },

  itemSection: {
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "8px",
    padding: "1.5rem",
    backgroundColor: "var(--color-card-bg)",
  },
  itemList: { display: "flex", flexDirection: "column", gap: "1rem" },
  item: { display: "flex", alignItems: "center", gap: "1rem" },
  image: {
    width: "64px",
    height: "64px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  itemInfo: { flex: 1 },
  itemName: { margin: 0, fontWeight: "600", fontSize: "0.95rem" },
  itemMeta: { margin: 0, color: "var(--color-text-muted)", fontSize: "0.85rem" },
  itemSubtotal: { fontWeight: "bold", margin: 0 },

  summary: {
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "8px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    boxShadow: theme.shadows.card,
    backgroundColor: "var(--color-card-bg)",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.95rem",
  },
  divider: {
    border: "none",
    borderTop: `1px solid ${theme.colors.border}`,
    margin: "0.25rem 0",
  },
  grandTotal: { fontWeight: "bold", fontSize: "1.1rem" },
  OrderBtn: {
    ...theme.buttons.primary,
    marginTop: "0.5rem",
    padding: "0.85rem",
    fontSize: "1rem",
  },
  backLink: {
    display: "block",
    textAlign: "center",
    color: "var(--color-text-muted)",
    fontSize: "0.9rem",
    textDecoration: "none",
    marginTop: "0.25rem",
  },

  empty: { ...theme.empty },
  link: {
    color: theme.colors.primary,
    display: "inline-block",
    marginTop: "1rem",
  },

  confirmation: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4rem 1rem",
  },
  confirmBox: {
    textAlign: "center",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "12px",
    padding: "3rem",
    maxWidth: "400px",
    boxShadow: theme.shadows.card,
    backgroundColor: "var(--color-card-bg)",
  },
  confirmIcon: { fontSize: "3rem", color: theme.colors.success, margin: "0 0 1rem 0" },
  confirmText: { color: "var(--color-text-muted)", marginBottom: "1.5rem" },
  continueBtn: {
    ...theme.buttons.primary,
    padding: "0.75rem 2rem",
    fontSize: "1rem",
  },
};
export default CheckoutPage;
