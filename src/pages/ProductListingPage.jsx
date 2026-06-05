import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../features/products/productSelectors";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { theme } from "../theme";

function ProductListingPage() {
  const products = useSelector(selectFilteredProducts);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Our Products</h1>
      <div style={styles.searchWrapper}>
        <SearchBar />
      </div>
      <Filters />
      {products.length === 0 ? (
        <p style={styles.empty}>No Products Found!</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    ...theme.layouts.page,
  },

  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: theme.colors.textDark,
    marginBottom: "0 0 1.5rem 0",
    display: "flex",
    justifyContent: "center",
  },
  searchWrapper: {
    marginBottom: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "1.5rem",
  },
  empty: {
    textAlign: "center",
    fontSize: "1.5rem",
    padding: "3rem",
    fontWeight: "bold",
    color: theme.colors.textDark,
  },
};
export default ProductListingPage;
