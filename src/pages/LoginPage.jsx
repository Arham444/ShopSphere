import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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

    const localUsers = loadState("registeredUsers", []);
    const matchedUser =
      authData.users.find(
        (u) => u.username === username && u.password === password,
      ) ||
      localUsers.find(
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
                <h2 className={styles.title}>Welcome back</h2>
                <p className={styles.subtitle}>
                  Sign in to your ShopSphere account
                </p>
              </div>

              {error && <div className={styles.errorAlert}>{error}</div>}

              <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
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
                    placeholder="Enter your password"
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
                <span className={styles.dividerText}>OR</span>
                <span className={styles.dividerLine}></span>
              </div>

              <button onClick={handleQuickLogin} className={styles.guestBtn}>
                Continue as Guest
              </button>

              <p className={styles.signupPrompt}>
                Don&apos;t have an account?{" "}
                <Link to="/signup" className={styles.signupLink}>
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
