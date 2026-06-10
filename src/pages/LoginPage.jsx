import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import authData from "../features/auth/authData.json";
import { loadState, saveState } from "../utils/localStorage";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
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
    } else {
      const trimmedUsername = username.trim();
      const trimmedEmail = email.trim();

      if (!trimmedUsername || !trimmedEmail || !password) {
        setError("All fields are required.");
        return;
      }

      if (trimmedUsername.length < 3) {
        setError("Username must be at least 3 characters.");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        setError("Please enter a valid email address.");
        return;
      }

      const localUsers = loadState("registeredUsers", []);
      const existsStatic = authData.users.some(
        (u) => u.username.toLowerCase() === trimmedUsername.toLowerCase(),
      );
      const existsLocal = localUsers.some(
        (u) =>
          u.username.toLowerCase() === trimmedUsername.toLowerCase() ||
          u.email?.toLowerCase() === trimmedEmail.toLowerCase(),
      );

      if (existsStatic || existsLocal) {
        setError("Username or Email already registered.");
        return;
      }

      const newUser = {
        username: trimmedUsername,
        email: trimmedEmail,
        password: password,
        role: "user",
      };

      saveState("registeredUsers", [...localUsers, newUser]);

      dispatch(
        login({
          user: { username: newUser.username, role: newUser.role },
          cartItems: [],
          wishListItems: [],
        }),
      );
      navigate("/");
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
                <h2 className={styles.title}>
                  {isLogin ? "Login to ShopSphere" : "Create an Account"}
                </h2>
                <p className={styles.subtitle}>
                  {isLogin
                    ? "Enter your details below"
                    : "Enter your details below to register"}
                </p>
              </div>

              {error && <div className={styles.errorAlert}>{error}</div>}

              <form onSubmit={handleSubmit} className={styles.form}>
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

                {!isLogin && (
                  <div className={styles.inputGroup}>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      required
                    />
                  </div>
                )}

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
                    {isLogin ? "Log In" : "Sign Up"}
                  </button>
                </div>
              </form>

              <div className={styles.toggleRow}>
                <span className={styles.toggleText}>
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className={styles.toggleBtn}
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </div>

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
    </div>
  );
}

export default LoginPage;
