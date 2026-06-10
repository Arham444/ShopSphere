import styles from "./Footer.module.css";
import { FaCopyright } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>ShopSphere</span>
          <p className={styles.tagline}>
            Premium products, seamless experience.
          </p>
        </div>

        <div className={styles.linksGroup}>
          <h4 className={styles.heading}>Quick Links</h4>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/cart" className={styles.link}>
            Cart
          </Link>
          <Link to="/wishlist" className={styles.link}>
            Wishlist
          </Link>
        </div>

        <div className={styles.linksGroup}>
          <h4 className={styles.heading}>Support</h4>
          <span className={styles.link}>FAQ</span>
          <span className={styles.link}>Shipping Info</span>
          <span className={styles.link}>Returns</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <FaCopyright className={styles.copyIcon} />
        <span className={styles.copyText}>
          2026 ShopSphere. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
