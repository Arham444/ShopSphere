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
} from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { theme } from "../theme";

function Navbar() {
  const dispatch = useDispatch();
  const wishlistCount = useSelector(selectWishlistItemsCount);
  const cartCount = useSelector(selectCartItemCount);
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        ShopSphere
      </Link>
      <div style={styles.links}>
        <Link to="/wishlist" style={styles.link}>
          <FaHeart />
          <span>Wishlist</span>
          {wishlistCount > 0 && (
            <span style={styles.badge}>{wishlistCount}</span>
          )}
        </Link>
        <Link to="/cart" style={styles.link}>
          <IoCartOutline />
          <span>Cart</span>
          {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </Link>
        {isAdmin && (
          <Link to="/AddProduct" style={styles.link}>
            <IoMdAddCircle />
            <span>Add Product</span>
          </Link>
        )}

        {currentUser ? (
          <div style={styles.userContainer}>
            <span style={styles.userBadge}>
              {currentUser.role === "admin"
                ? "Admin"
                : `👤 ${currentUser.username}`}
            </span>
            <button onClick={() => dispatch(logout())} style={styles.logoutBtn}>
              <IoLogOutOutline size={16} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login" style={styles.loginBtn}>
            <IoLogInOutline size={16} />
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: theme.colors.primary,
    color: "white",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  badge: {
    background: theme.colors.accent,
    color: "white",
    borderRadius: "999px",
    padding: "0 6px",
    fontSize: "0.8rem",
    minWidth: "20px",
    height: "20px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginLeft: "4px",
    boxSizing: "border-box",
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    borderLeft: `1px solid ${theme.colors.border}40`,
    paddingLeft: "0.75rem",
  },
  userBadge: {
    fontSize: "0.85rem",
    fontWeight: "600",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: "0.25rem 0.6rem",
    borderRadius: "4px",
    color: "#ffffff",
  },
  logoutBtn: {
    background: "transparent",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: "0.85rem",
    fontWeight: "500",
    outline: "none",
    transition: "color 0.2s",
  },
  loginBtn: {
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: "0.85rem",
    fontWeight: "500",
    border: "1px solid white",
    padding: "0.3rem 0.75rem",
    borderRadius: "6px",
    transition: "all 0.2s",
  },
};

export default Navbar;
