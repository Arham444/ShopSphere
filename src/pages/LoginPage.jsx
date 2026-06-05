import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { theme } from "../theme";
import authData from "../features/auth/authData.json";

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
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to ShopSphere</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.submitBtn}>
            Sign In
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>OR QUICK LOGIN AS</span>
          <span style={styles.dividerLine}></span>
        </div>

        <div style={styles.shortcutRow}>
          <button onClick={handleQuickLogin} style={styles.userShortcutBtn}>
            Guest Mode
          </button>
        </div>

        <button onClick={() => navigate("/")} style={styles.backLink}>
          Back to All Products
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "75vh",
    fontFamily: "system-ui, sans-serif",
  },
  card: {
    background: "var(--color-card-bg)",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "12px",
    padding: "2.5rem",
    width: "420px",
    boxShadow: theme.shadows.card,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: theme.colors.textDark,
    margin: "0 0 0.5rem 0",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "var(--color-text-muted)",
    margin: "0 0 1.5rem 0",
    textAlign: "center",
  },
  errorAlert: {
    width: "100%",
    backgroundColor: "#fef2f2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
    borderRadius: "6px",
    padding: "0.75rem",
    fontSize: "0.85rem",
    marginBottom: "1rem",
    boxSizing: "border-box",
    textAlign: "center",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    width: "100%",
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "var(--color-text-dark)",
  },
  input: {
    ...theme.inputs.text,
    width: "100%",
    padding: "0.7rem 0.9rem",
    boxSizing: "border-box",
  },
  submitBtn: {
    ...theme.buttons.primary,
    padding: "0.75rem",
    fontSize: "0.95rem",
    fontWeight: "600",
    marginTop: "0.5rem",
    width: "100%",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "1.5rem 0",
    gap: "0.5rem",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    fontSize: "0.75rem",
    color: "#9ca3af",
    fontWeight: "600",
    letterSpacing: "0.05em",
  },
  shortcutRow: {
    display: "flex",
    gap: "1rem",
    width: "100%",
    marginBottom: "1rem",
  },
  adminShortcutBtn: {
    ...theme.buttons.secondary,
    flex: 1,
    padding: "0.6rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    borderColor: theme.colors.accent,
    color: theme.colors.accent,
  },
  userShortcutBtn: {
    ...theme.buttons.secondary,
    flex: 1,
    padding: "0.6rem",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  backLink: {
    background: "transparent",
    border: "none",
    color: "var(--color-text-muted)",
    fontSize: "0.9rem",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

export default LoginPage;
