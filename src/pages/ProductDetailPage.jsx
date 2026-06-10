import { Navigate, useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "../features/products/productSelectors";
import { addToCart } from "../features/cart/cartSlice";
import { setSearchCategory } from "../features/products/productSlice";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../features/wishlist/useWishlist";
import { selectCartItems } from "../features/cart/cartSelectors";
import { selectCurrentUser } from "../features/auth/authSelectors";
import styles from "./ProductDetailPage.module.css";

import StockStatus from "../components/StockStatus";

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);

  const product = useSelector((state) => selectProductById(state, id));
  const { isInWishlist, toggleWishlist } = useWishlist(product);

  const isGuest = !currentUser || currentUser.role === "guest";

  if (!product) return <Navigate to="/404" replace />;

  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const isLimitReached = isOutOfStock || cartQuantity >= product.stock;

  const handleAddToCart = () => {
    if (isGuest) {
      navigate("/cart");
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleToggleWishlist = () => {
    if (isGuest) {
      navigate("/wishlist");
    } else {
      toggleWishlist();
    }
  };

  const handleCategoryClick = () => {
    dispatch(setSearchCategory(product.category));
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.paths}>
        <Link to="/" className={styles.pathLink}>
          Home
        </Link>
        <span className={styles.pathSeparator}>/</span>
        {product.category && (
          <>
            <span onClick={handleCategoryClick} className={styles.pathLink}>
              {product.category}
            </span>
            <span className={styles.pathSeparator}>/</span>
          </>
        )}
        <span className={styles.pathActive}>{product.name}</span>
      </div>
      <div className={styles.detailWrapper}>
        <div className={styles.imageSection}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </div>
        <div className={styles.infoSection}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.metaRow}>
            <span className={styles.rating}>⭐ {product.rating}</span>
            <StockStatus product={product} className={styles.stock} />
          </div>
          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price}</span>
          </div>
          <p className={styles.description}>
            {product.description || "No description available for this product"}
          </p>
          <div className={styles.actionRow}>
            <button
              onClick={handleAddToCart}
              disabled={isLimitReached}
              className={styles.cartBtn}
            >
              {isOutOfStock
                ? "Out of Stock"
                : cartQuantity >= product.stock
                  ? "Limit Reached"
                  : "Add to cart"}
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`${styles.wishlistBtn} ${isInWishlist ? styles.activeWishlistBtn : ""}`}
            >
              <FaHeart
                style={{
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
