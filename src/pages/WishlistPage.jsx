import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectWishlistItems } from "../features/wishlist/wishlistSelectors";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { selectAllProducts } from "../features/products/productSelectors";
import StockStatus from "../components/StockStatus";

function WishlistPage() {
  const items = useSelector(selectWishlistItems);
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);

  if (items.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>Your WishList is Empty! Why not Add something?</h2>
        <Link to="/" style={styles.link}>
          Browse Products
        </Link>
      </div>
    );
  }
  return (
    <div style={styles.page}>
      <h1>Your WishList has ({items.length} items)</h1>
      <div
        style={{
          ...styles.grid,
          ...(items.length > 2
            ? { gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }
            : { gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))" }),
        }}
      >
        {items.map((item) => {
          const savedProduct =
            allProducts.find((p) => p.id === item.id) || item;
          const isOutOfStock = savedProduct.stock <= 0;
          return (
            <div key={item.id} style={styles.card}>
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} style={styles.image} />
              </Link>
              <div style={styles.body}>
                <p style={styles.category}>{item.category}</p>
                <Link to={`/product/${item.id}`} style={styles.name}>
                  {item.name}
                </Link>
                <p style={styles.price}>${item.price}</p>
                <p style={styles.rating}>⭐{item.rating}</p>
                <StockStatus product={savedProduct} />
              </div>
              <div style={styles.actions}>
                <button
                  onClick={() => {
                    dispatch(addToCart(item));
                    dispatch(removeFromWishlist(item.id));
                  }}
                  disabled={isOutOfStock}
                  style={{
                    ...styles.MoveBtn,
                    opacity: isOutOfStock ? 0.6 : 1,
                    cursor: isOutOfStock ? "not-allowed" : "pointer",
                  }}
                >
                  {isOutOfStock ? "Out of Stock" : "Move To Cart!"}
                </button>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  style={styles.removeBtn}
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

const styles = {
  page: { padding: "1.5rem 3rem" },
  empty: {},
  link: {},
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  card: {
    border: "1px solid #ddd",
    padding: "1rem",
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  body: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  category: {
    fontSize: "0.75rem",
    color: "#888",
    margin: 0,
  },
  name: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#1a1a1a",
  },
  price: {
    fontWeight: "600",
    color: "#e44d26",
    margin: 0,
  },
  rating: {
    margin: 0,
    color: "#f59e0b",
    fontSize: "0.85rem",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "auto",
  },
  MoveBtn: {
    flex: 1,
    padding: "0.5rem",
    backgroundColor: "#1a1a1a",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  removeBtn: {
    flex: 1,
    padding: "0.5rem",
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

WishlistPage.propTypes = {};

export default WishlistPage;
