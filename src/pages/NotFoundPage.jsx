import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.errorCode}>404</span>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.description}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className={styles.homeBtn}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
