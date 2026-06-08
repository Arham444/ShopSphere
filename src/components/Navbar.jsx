import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemCount } from "../features/cart/cartSelectors";
import { selectWishlistItemsCount } from "../features/wishlist/wishlistSelectors";
import {
  selectCurrentUser,
  selectIsAdmin,
} from "../features/auth/authSelectors";
import { logout } from "../features/auth/authSlice";
import { FaHeart } from "react-icons/fa";
import {
  IoCartOutline,
  IoLogOutOutline,
  IoLogInOutline,
  IoSunnyOutline,
  IoMoonOutline,
} from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import styles from "./Navbar.module.css";

function Navbar() {
  const dispatch = useDispatch();
  const wishlistCount = useSelector(selectWishlistItemsCount);
  const cartCount = useSelector(selectCartItemCount);
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = useSelector(selectIsAdmin);

  const [themeName, setThemeName] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return systemPrefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        ShopSphere
      </Link>
      <div className={styles.links}>
        <button
          onClick={toggleTheme}
          className={`${styles.themeToggle} theme-toggle-btn`}
          aria-label="Toggle Theme"
        >
          {themeName === "dark" ? (
            <IoSunnyOutline size={20} />
          ) : (
            <IoMoonOutline size={20} />
          )}
        </button>
        <Link to="/wishlist" className={styles.link}>
          <FaHeart />
          <span>Wishlist</span>
          {wishlistCount > 0 && (
            <span className={styles.badge}>{wishlistCount}</span>
          )}
        </Link>
        <Link to="/cart" className={styles.link}>
          <IoCartOutline />
          <span>Cart</span>
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </Link>
        {isAdmin && (
          <Link to="/AddProduct" className={styles.link}>
            <IoMdAddCircle />
            <span>Add Product</span>
          </Link>
        )}

        {currentUser && currentUser.role !== "guest" ? (
          <div className={styles.userContainer}>
            <span className={styles.userBadge}>
              {currentUser.role === "admin"
                ? "Admin"
                : `User ${currentUser.username}`}
            </span>
            <button
              onClick={() => dispatch(logout())}
              className={styles.logoutBtn}
            >
              <IoLogOutOutline size={16} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className={styles.loginBtn}>
            <IoLogInOutline size={16} />
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
