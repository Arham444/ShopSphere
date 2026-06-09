import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import authData from "../features/auth/authData.json";
import { loadState } from "../utils/localStorage";
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
      const userKey = matchedUser.username;
      const userCart = loadState(`cartItems_${userKey}`, []);
      const userWishlist = loadState(`wishlistItems_${userKey}`, []);

      dispatch(
        login({
          user: { username: matchedUser.username, role: matchedUser.role },
          cartItems: userCart,
          wishListItems: userWishlist,
        }),
      );
      navigate("/");
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleQuickLogin = () => {
    dispatch(
      login({
        user: { role: "guest" },
        cartItems: [],
        wishListItems: [],
      }),
    );
    navigate("/");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.splitCard}>
          {/* Left Side: Illustration Panel */}
          <div className={styles.illustrationSection}>
            <img
              src="https://res.cloudinary.com/dnwohqbqt/image/upload/v1780936259/login_illustration_usvffb.jpg"
              alt="ShopSphere shopping illustration"
              className={styles.illustrationImage}
            />
          </div>

          {/* Right Side: Form Panel */}
          <div className={styles.formSection}>
            <div className={styles.formContent}>
              <div className={styles.formHeader}>
                <h2 className={styles.title}>Login to ShopSphere</h2>
                <p className={styles.subtitle}>Enter your details below</p>
              </div>

              {error && <div className={styles.errorAlert}>{error}</div>}

              <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.actionsRow}>
                  <button type="submit" className={styles.submitBtn}>
                    Log In
                  </button>
                </div>
              </form>

              <div className={styles.divider}>
                <span className={styles.dividerLine}></span>
                <span className={styles.dividerText}>OR QUICK LOGIN AS</span>
                <span className={styles.dividerLine}></span>
              </div>

              <div className={styles.shortcutRow}>
                <button
                  onClick={handleQuickLogin}
                  className={styles.userShortcutBtn}
                >
                  Guest Mode
                </button>
              </div>

              <button onClick={() => navigate("/")} className={styles.backLink}>
                Back to All Products
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Black Footer at the bottom */}
      <footer className={styles.footer}></footer>
    </div>
  );
}

export default LoginPage;
