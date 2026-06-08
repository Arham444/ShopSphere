import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import authData from "../features/auth/authData.json";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const matchedUser = authData.users.find(
      (u) => u.username === username && u.password === password,
    );

    if (matchedUser) {
      dispatch(
        login({ username: matchedUser.username, role: matchedUser.role }),
      );
      navigate("/");
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleQuickLogin = () => {
    dispatch(login({ role: "guest" }));
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome to ShopSphere</h2>
        <p className={styles.subtitle}>Sign in to your account</p>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign In
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>OR QUICK LOGIN AS</span>
          <span className={styles.dividerLine}></span>
        </div>

        <div className={styles.shortcutRow}>
          <button onClick={handleQuickLogin} className={styles.userShortcutBtn}>
            Guest Mode
          </button>
        </div>

        <button onClick={() => navigate("/")} className={styles.backLink}>
          Back to All Products
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
