import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  selectCartItemCount,
  selectCartWithSubtotals,
  selectCartTotal,
} from "../features/cart/cartSelectors";
import { selectCurrentUser } from "../features/auth/authSelectors";
import { TiTick } from "react-icons/ti";
import { clearCart } from "../features/cart/cartSlice";
import { checkoutProducts } from "../features/products/productSlice";
import AccessDenied from "../components/AccessDenied";
import styles from "./CheckoutPage.module.css";
import { CiLock } from "react-icons/ci";
const TAX_RATE = 0.08;

function CheckoutPage() {
  const items = useSelector(selectCartWithSubtotals);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const isGuest = !currentUser || currentUser.role === "guest";

  if (isGuest) {
    return (
      <AccessDenied
        message={
          <>
            Guests cannot checkout.
            <br />
            Please log in to complete your purchase.
          </>
        }
        icon={<CiLock />}
      />
    );
  }

  if (items.length === 0 && !orderPlaced)
    return (
      <div className={styles.empty}>
        <h2>Your Cart Is Empty.</h2>
        <p>Add some products before checking out.</p>
        <Link to="/" className={styles.link}>
          {" "}
          Browse Products{" "}
        </Link>
      </div>
    );

  if (orderPlaced)
    return (
      <div className={styles.confirmation}>
        <div className={styles.confirmBox}>
          <h1 className={styles.confirmIcon}>
            <TiTick />
          </h1>
          <h2>Order Placed!</h2>
          <p className={styles.confirmText}>
            Thank you for your order. Your items will be delivered soon.
          </p>
          <button onClick={() => navigate("/")} className={styles.continueBtn}>
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
    <div className={styles.page}>
      <h1>Welcome to Checkout!</h1>
      <h2> Review your Order!</h2>
      <div className={styles.layout}>
        <div className={styles.itemSection}>
          <h2 className={styles.sectionTitle}>Order Items ({itemCount})</h2>
          <div className={styles.itemList}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                />
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemMeta}>
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <p className={styles.itemSubtotal}>${item.subtotal}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.summary}>
          <h2 className={styles.sectionTitle}>Price Breakdown</h2>
          <div className={styles.summaryRow}>
            <span> SubTotal ({itemCount} items)</span>
            <span> ${total}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span style={{ color: "var(--color-success)" }}>Free</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax (8%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <hr className={styles.divider} />
          <div className={`${styles.summaryRow} ${styles.grandTotal}`}>
            <span>Grand Total</span>
            <span> ${grandTotal.toFixed(2)}</span>
          </div>
          <button onClick={handlePlaceOrder} className={styles.OrderBtn}>
            Place Order
          </button>
          <Link to="/cart" className={styles.backLink}>
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
