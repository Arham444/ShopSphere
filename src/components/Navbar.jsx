import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const page = location.pathname;
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

  const getLinkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.activeLink : ""}`;

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
        {currentUser && currentUser.role !== "guest" && (
          <>
            <NavLink to="/wishlist" className={getLinkClass}>
              <FaHeart />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className={styles.badge}>{wishlistCount}</span>
              )}
            </NavLink>
            <NavLink to="/cart" className={getLinkClass}>
              <IoCartOutline />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </NavLink>
          </>
        )}
        {isAdmin && (
          <NavLink to="/AddProduct" className={getLinkClass}>
            <IoMdAddCircle />
            <span>Add Product</span>
          </NavLink>
        )}

        {currentUser && page != "/login" ? (
          <div className={styles.userContainer}>
            <span className={styles.userBadge}>
              {isAdmin === true
                ? "Admin"
                : currentUser.role === "guest"
                  ? "Guest"
                  : `${currentUser.username}`}
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
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${styles.loginBtn} ${isActive ? styles.activeLink : ""}`
            }
          >
            <IoLogInOutline size={16} />
            <span>Login</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
