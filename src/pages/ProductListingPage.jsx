import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../features/products/productSelectors";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

function ProductListingPage() {
  const products = useSelector(selectFilteredProducts);

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-8 flex flex-col min-h-[calc(100dvh-140px)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Explore Our Products
        </h1>
        <div className="flex items-center gap-2 sm:gap-4 w-full md:w-auto">
          <div className="flex-1 md:w-64">
            <SearchBar />
          </div>
          <div className="shrink-0">
            <Filters />
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl font-medium text-muted-foreground">
            No Products Found!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListingPage;
