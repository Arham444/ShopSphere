import { useSelector } from "react-redux";
import { selectAllProducts } from "../features/products/productSelectors";
import ProductCard from "../components/ProductCard";

function ProductListingPage() {
  const products = useSelector(selectAllProducts);

  return (
    <div>
      <h1>All Products</h1>
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
