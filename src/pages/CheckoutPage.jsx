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
import { RiVisaLine, RiMastercardLine } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa6";

const TAX_RATE = 0.08;

function CheckoutPage() {
  const items = useSelector(selectCartWithSubtotals);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || "";
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
    if (errors.cardNumber) {
      setErrors((prev) => ({ ...prev, cardNumber: "" }));
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setFormData((prev) => ({ ...prev, cardExpiry: formatted }));
    if (errors.cardExpiry) {
      setErrors((prev) => ({ ...prev, cardExpiry: "" }));
    }
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setFormData((prev) => ({ ...prev, cardCvv: value }));
    if (errors.cardCvv) {
      setErrors((prev) => ({ ...prev, cardCvv: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";

    if (!formData.cardName.trim())
      newErrors.cardName = "Cardholder name is required";

    const cleanCard = formData.cardNumber.replace(/\s/g, "");
    if (!cleanCard) {
      newErrors.cardNumber = "Card number is required";
    } else if (cleanCard.length < 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.cardExpiry) {
      newErrors.cardExpiry = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Expiry must be MM/YY";
    }

    if (!formData.cardCvv) {
      newErrors.cardCvv = "CVV is required";
    } else if (formData.cardCvv.length < 3) {
      newErrors.cardCvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handlePlaceOrder();
    }
  };

  return (
    <div className={styles.page}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link to="/cart" className={styles.breadcrumbLink}>
          Cart
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbActive}>Checkout</span>
      </div>

      <div className={styles.layout}>
        {/* Left Side: Order Items and Billing/Payment Form */}
        <div className={styles.mainContent}>
          {/* Order Items Section */}
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

          {/* Billing & Payment Form */}
          <form
            id="checkout-form"
            onSubmit={handleSubmit}
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
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`${styles.input} ${errors.fullName ? styles.inputError : ""}`}
                />
                {errors.fullName && (
                  <span className={styles.errorText}>{errors.fullName}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St"
                  className={`${styles.input} ${errors.address ? styles.inputError : ""}`}
                />
                {errors.address && (
                  <span className={styles.errorText}>{errors.address}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Town/City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  className={`${styles.input} ${errors.city ? styles.inputError : ""}`}
                />
                {errors.city && (
                  <span className={styles.errorText}>{errors.city}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Postal Code / ZIP *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                  className={`${styles.input} ${errors.zipCode ? styles.inputError : ""}`}
                />
                {errors.zipCode && (
                  <span className={styles.errorText}>{errors.zipCode}</span>
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
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`${styles.input} ${errors.cardName ? styles.inputError : ""}`}
                />
                {errors.cardName && (
                  <span className={styles.errorText}>{errors.cardName}</span>
                )}
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="4111 2222 3333 4444"
                  className={`${styles.input} ${errors.cardNumber ? styles.inputError : ""}`}
                />
                {errors.cardNumber && (
                  <span className={styles.errorText}>{errors.cardNumber}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Expiration Date *</label>
                <input
                  type="text"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  className={`${styles.input} ${errors.cardExpiry ? styles.inputError : ""}`}
                />
                {errors.cardExpiry && (
                  <span className={styles.errorText}>{errors.cardExpiry}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>CVC / CVV *</label>
                <input
                  type="password"
                  name="cardCvv"
                  value={formData.cardCvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  className={`${styles.input} ${errors.cardCvv ? styles.inputError : ""}`}
                />
                {errors.cardCvv && (
                  <span className={styles.errorText}>{errors.cardCvv}</span>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Right Side: Price Breakdown & Place Order */}
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
