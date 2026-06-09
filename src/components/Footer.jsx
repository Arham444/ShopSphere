import styles from "./Footer.module.css";
import { FaCopyright } from "react-icons/fa6";

function Footer() {
  return (
    <footer className={styles.footer}>
      <FaCopyright />
      <span className={styles.text}>
        {" "}
        2026 ShopSphere. All rights reserved.
      </span>
    </footer>
  );
}

export default Footer;
