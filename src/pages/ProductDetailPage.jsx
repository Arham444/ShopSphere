import { Navigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "../features/products/productSelectors";
import { addToCart } from "../features/cart/cartSlice";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../features/wishlist/useWishlist";
import { selectCartItems } from "../features/cart/cartSelectors";
import styles from "./ProductDetailPage.module.css";

import StockStatus from "../components/StockStatus";

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const product = useSelector((state) => selectProductById(state, id));
  const { isInWishlist, toggleWishlist } = useWishlist(product);

  if (!product) return <Navigate to="/404" replace />;

  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const isLimitReached = isOutOfStock || cartQuantity >= product.stock;

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        Back to All Products
      </Link>
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
              onClick={() => dispatch(addToCart(product))}
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
              onClick={toggleWishlist}
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
