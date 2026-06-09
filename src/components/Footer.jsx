import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>
        &copy; {new Date().getFullYear()} ShopSphere. All rights reserved.
      </span>
    </footer>
  );
}

export default Footer;
