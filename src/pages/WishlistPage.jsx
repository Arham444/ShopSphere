import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectWishlistItems } from "../features/wishlist/wishlistSelectors";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { selectAllProducts } from "../features/products/productSelectors";
import StockStatus from "../components/StockStatus";
import styles from "./WishlistPage.module.css";

function WishlistPage() {
  const items = useSelector(selectWishlistItems);
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your WishList is Empty! Why not Add something?</h2>
        <Link to="/" className={styles.link}>
          Browse Products
        </Link>
      </div>
    );
  }
  return (
    <div className={styles.page}>
      <h1>Your WishList has ({items.length} items)</h1>
      <div className={items.length > 4 ? styles.grid : styles.gridFew}>
        {items.map((item) => {
          const savedProduct =
            allProducts.find((p) => p.id === item.id) || item;
          const isOutOfStock = savedProduct.stock <= 0;
          return (
            <div key={item.id} className={styles.card}>
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                />
              </Link>
              <div className={styles.body}>
                <p className={styles.category}>{item.category}</p>
                <Link to={`/product/${item.id}`} className={styles.name}>
                  {item.name}
                </Link>
                <p className={styles.price}>${item.price}</p>
                <p className={styles.rating}>⭐{item.rating}</p>
                <StockStatus product={savedProduct} />
              </div>
              <div className={styles.actions}>
                <button
                  onClick={() => {
                    dispatch(addToCart(item));
                    dispatch(removeFromWishlist(item.id));
                  }}
                  disabled={isOutOfStock}
                  className={styles.MoveBtn}
                >
                  {isOutOfStock ? "Out of Stock" : "Move To Cart!"}
                </button>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WishlistPage;
