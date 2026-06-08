import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../features/products/productSelectors";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import styles from "./ProductListingPage.module.css";

function ProductListingPage() {
  const products = useSelector(selectFilteredProducts);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Our Products</h1>
      <div className={styles.searchWrapper}>
        <SearchBar />
      </div>
      <Filters />
      {products.length === 0 ? (
        <p className={styles.empty}>No Products Found!</p>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListingPage;
