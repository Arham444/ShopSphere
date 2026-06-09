import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import {
  selectCartWithSubtotals,
  selectCartItemCount,
  selectCartTotal,
} from "../features/cart/cartSelectors.js";
import { selectCurrentUser } from "../features/auth/authSelectors";
import AccessDenied from "../components/AccessDenied";
import styles from "./CartPage.module.css";
import { CiLock } from "react-icons/ci";

function CartPage() {
  const items = useSelector(selectCartWithSubtotals);
  const itemCount = useSelector(selectCartItemCount);
  const total = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const isGuest = !currentUser || currentUser.role === "guest";

  if (isGuest) {
    return (
      <AccessDenied
        message="Guests cannot have a shopping cart. Please log in to shop."
        icon={<CiLock />}
      />
    );
  }

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
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbActive}>Cart</span>
      </div>

      {/* Cart Items Table Layout */}
      <div className={styles.layout}>
        <div className={styles.tableContainer}>
          {/* Header Row */}
          <div className={styles.headerRow}>
            <span className={styles.headerCol}>Product</span>
            <span className={styles.headerCol}>Price</span>
            <span className={styles.headerCol}>Quantity</span>
            <span
              className={styles.headerCol}
              style={{ textAlign: "right", justifySelf: "end" }}
            >
              Subtotal
            </span>
            <span className={styles.headerCol}></span>
          </div>

          {/* Item Rows */}
          <div className={styles.itemsList}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Action Buttons Row */}
          <div className={styles.actionsRow}>
            <Link to="/" className={styles.returnBtn}>
              Return To Shop
            </Link>
          </div>
        </div>

        {/* Bottom Section: Cart Total Card */}
        <div className={styles.bottomSection}>
          <div className={styles.cartTotalCard}>
            <h3 className={styles.cartTotalTitle}>Cart Total</h3>

            <div className={styles.totalRow}>
              <span>Subtotal:</span>
              <span>${total}</span>
            </div>
            <hr className={styles.divider} />

            <div className={styles.totalRow}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr className={styles.divider} />

            <div
              className={styles.totalRow}
              style={{ fontWeight: "600", fontSize: "1.05rem" }}
            >
              <span>Total:</span>
              <span>${total}</span>
            </div>

            <div className={styles.checkoutWrapper}>
              <Link to="/checkout" className={styles.checkoutBtn}>
                Procees to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
