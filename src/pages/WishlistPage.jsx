import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectWishlistItems } from "../features/wishlist/wishlistSelectors";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { selectAllProducts } from "../features/products/productSelectors";
import { selectCurrentUser } from "../features/auth/authSelectors";
import StockStatus from "../components/StockStatus";
import AccessDenied from "../components/AccessDenied";
import { CiLock } from "react-icons/ci";
import PageBreadcrumb from "../components/PageBreadcrumb";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

function WishlistPage() {
  const items = useSelector(selectWishlistItems);
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const currentUser = useSelector(selectCurrentUser);

  const isGuest = !currentUser || currentUser.role === "guest";

  if (isGuest) {
    return (
      <AccessDenied
        message={
          <>
            Guests cannot have a wishlist. <br /> Please log in to save items.
          </>
        }
        icon={<CiLock className="h-10 w-10 text-muted-foreground" />}
      />
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-4 min-h-[50vh]">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Your WishList is Empty! Why not Add something?
          </h2>
          <Button asChild size="lg" className="mt-4">
            <Link to="/">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-8 min-h-[calc(100vh-140px)]">
      <div className="mb-6">
        <PageBreadcrumb items={[{ label: "Wishlist" }]} />
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Wishlist ({items.length})
        </h1>
      </div>

      <div
        className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${items.length <= 4 ? "max-w-6xl" : ""}`}
      >
        {items.map((item) => {
          const savedProduct =
            allProducts.find((p) => p.id === item.id) || item;
          const isOutOfStock = savedProduct.stock <= 0;
          return (
            <Card
              key={item.id}
              className="overflow-hidden flex flex-col hover:shadow-md transition-shadow group p-0"
            >
              <Link
                to={`/product/${item.id}`}
                className="aspect-square bg-muted relative overflow-hidden w-full block"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <CardContent className="p-5 flex flex-col flex-1 gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.category}
                </p>
                <Link
                  to={`/product/${item.id}`}
                  className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2"
                >
                  {item.name}
                </Link>

                <div className="flex items-center justify-between mt-auto pt-2">
                  <p className="text-xl font-bold text-primary">
                    ${item.price}
                  </p>
                  <p className="text-sm font-medium flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>{" "}
                    {item.rating}
                  </p>
                </div>

                <div className="mt-2 mb-4">
                  <StockStatus product={savedProduct} />
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <Button
                    onClick={() => {
                      dispatch(addToCart(item));
                      dispatch(removeFromWishlist(item.id));
                    }}
                    disabled={isOutOfStock}
                    className="w-full"
                    variant={isOutOfStock ? "secondary" : "default"}
                  >
                    {isOutOfStock ? "Out of Stock" : "Move To Cart!"}
                  </Button>
                  <Button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    variant="outline"
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default WishlistPage;
