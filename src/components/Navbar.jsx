import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../features/cart/cartSelectors";
import { selectWishlistItemsCount } from "../features/wishlist/wishlistSelectors";
import { FaHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { theme } from "../theme";

function Navbar() {
  const wishlistCount = useSelector(selectWishlistItemsCount);
  const cartCount = useSelector(selectCartItemCount);
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
        <Link to="/AddProduct" style={styles.link}>
          <IoMdAddCircle />
          <span>Add Product</span>
        </Link>
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
    padding: "2px 6px",
    fontSize: "0.7rem",
    minWidth: "18px",
    height: "18px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginLeft: "4px",
    lineHeight: "1",
  },
};

export default Navbar;
