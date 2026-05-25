import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCounter } from "../features/cart/cartSelectors";

function Navbar() {
  const cartCount = useSelector(selectCartItemCounter);
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        ShopSphere
      </Link>
      <div style={styles.links}>
        <Link to="/wishlist" style={styles.link}>
          Wishlist
        </Link>
        <Link to="/cart" style={styles.link}>
          Cart{cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
