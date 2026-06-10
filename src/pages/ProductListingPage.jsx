import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../features/products/productSelectors";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

function ProductListingPage() {
  const products = useSelector(selectFilteredProducts);

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-8 flex flex-col min-h-[calc(100vh-140px)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Explore Our Products
        </h1>
        <div className="flex items-center gap-4">
          <SearchBar />
          <Filters />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl font-medium text-muted-foreground">
            No Products Found!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListingPage;
