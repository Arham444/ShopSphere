import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../features/products/productSelectors";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

function ProductListingPage() {
  const products = useSelector(selectFilteredProducts);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>All Products</h1>
      <div style={styles.searchWrapper}>
        <SearchBar />
      </div>
      <Filters />
      {products.length === 0 ? "No Products Found" : null}
      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "1.5rem",
  },
};

export default ProductListingPage;
