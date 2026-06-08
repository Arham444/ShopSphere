import { useNavigate } from "react-router-dom";
import styles from "./AccessDenied.module.css";
import PropTypes from "prop-types";
import { CiLock } from "react-icons/ci";

function AccessDenied({
  message = "You do not have permission to view this page.",
  icon = <CiLock />,
  actionText = "Go to Login",
  onAction,
}) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.deniedContainer}>
      <div className={styles.deniedCard}>
        <span className={styles.deniedIcon}>{icon}</span>
        <p className={styles.deniedMessage}>{message}</p>
        <button onClick={handleAction} className={styles.deniedBtn}>
          {actionText}
        </button>
      </div>
    </div>
  );
}

AccessDenied.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.string,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
};

export default AccessDenied;
