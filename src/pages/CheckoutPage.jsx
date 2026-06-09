import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { RiVisaLine, RiMastercardLine } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa6";

const TAX_RATE = 0.08;

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Street address is required"),
  city: Yup.string().required("Town/City is required"),
  zipCode: Yup.string().required("Postal Code / ZIP is required"),
  cardName: Yup.string().required("Cardholder name is required"),
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits"),
  cardExpiry: Yup.string()
    .required("Expiration date is required")
    .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Expiry must be MM/YY"),
  cardCvv: Yup.string()
    .required("CVC / CVV is required")
    .matches(/^\d{3}$/, "CVV must be 3 digits"),
});

function CheckoutPage() {
  const items = useSelector(selectCartWithSubtotals);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const isGuest = !currentUser || currentUser.role === "guest";

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

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
    },
    validationSchema,
    onSubmit: () => {
      handlePlaceOrder();
    },
  });

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

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className={styles.empty}>
        <h2>Your Cart Is Empty.</h2>
        <p>Add some products before checking out.</p>
        <Link to="/" className={styles.link}>
          Browse Products
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
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
  }

  // Form Input Format Listeners
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || "";
    formik.setFieldValue("cardNumber", formatted);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    formik.setFieldValue("cardExpiry", formatted);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    formik.setFieldValue("cardCvv", value);
  };

  return (
    <div className={styles.page}>
      {/* Breadcrumbs */}
      <div className={styles.paths}>
        <Link to="/" className={styles.pathLink}>
          Home
        </Link>
        <span className={styles.pathSeparator}>/</span>
        <Link to="/cart" className={styles.pathLink}>
          Cart
        </Link>
        <span className={styles.pathSeparator}>/</span>
        <span className={styles.pathActive}>Checkout</span>
      </div>

      <div className={styles.layout}>
        <div className={styles.mainContent}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Order Items ({itemCount})</h3>
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

          <form
            id="checkout-form"
            onSubmit={formik.handleSubmit}
            className={styles.card}
            noValidate
          >
            <h3 className={styles.cardTitle}>Billing Details</h3>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="John Doe"
                  className={`${styles.input} ${formik.touched.fullName && formik.errors.fullName ? styles.inputError : ""}`}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <span className={styles.errorText}>
                    {formik.errors.fullName}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="john@example.com"
                  className={`${styles.input} ${formik.touched.email && formik.errors.email ? styles.inputError : ""}`}
                />
                {formik.touched.email && formik.errors.email && (
                  <span className={styles.errorText}>
                    {formik.errors.email}
                  </span>
                )}
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="123 Main St"
                  className={`${styles.input} ${formik.touched.address && formik.errors.address ? styles.inputError : ""}`}
                />
                {formik.touched.address && formik.errors.address && (
                  <span className={styles.errorText}>
                    {formik.errors.address}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Town/City *</label>
                <input
                  type="text"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="New York"
                  className={`${styles.input} ${formik.touched.city && formik.errors.city ? styles.inputError : ""}`}
                />
                {formik.touched.city && formik.errors.city && (
                  <span className={styles.errorText}>{formik.errors.city}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Postal Code / ZIP *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="10001"
                  className={`${styles.input} ${formik.touched.zipCode && formik.errors.zipCode ? styles.inputError : ""}`}
                />
                {formik.touched.zipCode && formik.errors.zipCode && (
                  <span className={styles.errorText}>
                    {formik.errors.zipCode}
                  </span>
                )}
              </div>
            </div>

            <hr className={styles.formDivider} />

            <div className={styles.paymentHeader}>
              <h3 className={styles.cardTitle} style={{ margin: 0 }}>
                Payment Method
              </h3>
              <div className={styles.cardIcons}>
                <RiVisaLine size={28} title="Visa" />
                <RiMastercardLine size={28} title="Mastercard" />
                <FaRegCreditCard size={20} title="Credit Card" />
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Cardholder Name *</label>
                <input
                  type="text"
                  name="cardName"
                  value={formik.values.cardName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="John Doe"
                  className={`${styles.input} ${formik.touched.cardName && formik.errors.cardName ? styles.inputError : ""}`}
                />
                {formik.touched.cardName && formik.errors.cardName && (
                  <span className={styles.errorText}>
                    {formik.errors.cardName}
                  </span>
                )}
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formik.values.cardNumber}
                  onChange={handleCardNumberChange}
                  onBlur={formik.handleBlur}
                  placeholder="4111 2222 3333 4444"
                  className={`${styles.input} ${formik.touched.cardNumber && formik.errors.cardNumber ? styles.inputError : ""}`}
                />
                {formik.touched.cardNumber && formik.errors.cardNumber && (
                  <span className={styles.errorText}>
                    {formik.errors.cardNumber}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Expiration Date *</label>
                <input
                  type="text"
                  name="cardExpiry"
                  value={formik.values.cardExpiry}
                  onChange={handleExpiryChange}
                  onBlur={formik.handleBlur}
                  placeholder="MM/YY"
                  className={`${styles.input} ${formik.touched.cardExpiry && formik.errors.cardExpiry ? styles.inputError : ""}`}
                />
                {formik.touched.cardExpiry && formik.errors.cardExpiry && (
                  <span className={styles.errorText}>
                    {formik.errors.cardExpiry}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>CVC / CVV *</label>
                <input
                  type="password"
                  name="cardCvv"
                  value={formik.values.cardCvv}
                  onChange={handleCvvChange}
                  onBlur={formik.handleBlur}
                  placeholder="123"
                  className={`${styles.input} ${formik.touched.cardCvv && formik.errors.cardCvv ? styles.inputError : ""}`}
                />
                {formik.touched.cardCvv && formik.errors.cardCvv && (
                  <span className={styles.errorText}>
                    {formik.errors.cardCvv}
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Price Breakdown</h3>

          <div className={styles.summaryRow}>
            <span>Subtotal ({itemCount} items):</span>
            <span>${total}</span>
          </div>
          <hr className={styles.summaryDivider} />

          <div className={styles.summaryRow}>
            <span>Shipping:</span>
            <span style={{ color: "var(--color-success)", fontWeight: 500 }}>
              Free
            </span>
          </div>
          <hr className={styles.summaryDivider} />

          <div className={styles.summaryRow}>
            <span>Tax ({TAX_RATE * 100}%):</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <hr className={styles.summaryDivider} />

          <div
            className={styles.summaryRow}
            style={{ fontWeight: "600", fontSize: "1.05rem" }}
          >
            <span>Grand Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <div className={styles.orderWrapper}>
            <button
              type="submit"
              form="checkout-form"
              className={styles.orderBtn}
            >
              Place Order
            </button>
          </div>

          <Link to="/cart" className={styles.backLink}>
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
