import { Navigate, useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "../features/products/productSelectors";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";
import { setSearchCategory } from "../features/products/productSlice";
import { FaHeart } from "react-icons/fa";
import { IoTrashOutline, IoAdd, IoRemove } from "react-icons/io5";
import { useWishlist } from "../features/wishlist/useWishlist";
import { selectCartItems } from "../features/cart/cartSelectors";
import { selectCurrentUser } from "../features/auth/authSelectors";
import StockStatus from "../components/StockStatus";
import { Button } from "../components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);

  const product = useSelector((state) => selectProductById(state, id));
  const { isInWishlist, toggleWishlist } = useWishlist(product);

  const isGuest = !currentUser || currentUser.role === "guest";

  if (!product) return <Navigate to="/404" replace />;

  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const isLimitReached = isOutOfStock || cartQuantity >= product.stock;

  const handleAddToCart = () => {
    if (isGuest) {
      navigate("/cart");
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleToggleWishlist = () => {
    if (isGuest) {
      navigate("/wishlist");
    } else {
      toggleWishlist();
    }
  };

  const handleCategoryClick = (e) => {
    e.preventDefault();
    dispatch(setSearchCategory(product.category));
    navigate("/");
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-8 min-h-[calc(100vh-140px)]">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {product.category && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={handleCategoryClick}>
                    {product.category}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <div className="rounded-xl overflow-hidden bg-muted border flex items-center justify-center aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center text-sm font-medium text-foreground">
              <span className="text-yellow-500 mr-1 text-lg">⭐</span>{" "}
              {product.rating}
            </span>
            <StockStatus product={product} />
          </div>

          <div className="mb-8">
            <span className="text-3xl font-bold text-primary">
              ${product.price}
            </span>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            {product.description ||
              "No description available for this product. Check back later for more details."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            {!isOutOfStock && cartQuantity > 0 ? (
              <div className="flex-1 flex items-center justify-between h-12 border-[3px] border-[#FFC107] rounded-full px-6 text-foreground font-bold text-lg">
                <button
                  onClick={() => {
                    if (cartQuantity === 1) {
                      dispatch(removeFromCart(product.id));
                    } else {
                      dispatch(
                        updateQuantity({
                          id: product.id,
                          quantity: cartQuantity - 1,
                        }),
                      );
                    }
                  }}
                  className="text-foreground/80 hover:text-foreground transition-colors flex items-center justify-center"
                >
                  {cartQuantity === 1 ? (
                    <IoTrashOutline size={24} />
                  ) : (
                    <IoRemove size={24} />
                  )}
                </button>
                <span className="text-xl text-foreground">{cartQuantity}</span>
                <button
                  onClick={() => {
                    dispatch(
                      updateQuantity({
                        id: product.id,
                        quantity: cartQuantity + 1,
                      }),
                    );
                  }}
                  disabled={cartQuantity >= product.stock}
                  className="text-foreground/80 hover:text-foreground transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  <IoAdd size={24} />
                </button>
              </div>
            ) : (
              <Button
                onClick={handleAddToCart}
                disabled={isLimitReached}
                size="lg"
                className="flex-1 h-12 text-base font-semibold rounded-full"
                variant={isOutOfStock ? "secondary" : "default"}
              >
                {isOutOfStock
                  ? "Out of Stock"
                  : cartQuantity >= product.stock
                    ? "Limit Reached"
                    : "Add to cart"}
              </Button>
            )}
            <Button
              onClick={handleToggleWishlist}
              size="icon"
              variant="outline"
              className={`h-12 w-12 shrink-0 ${isInWishlist ? "text-red-500 border-red-500 hover:text-red-600 hover:bg-red-50" : "text-muted-foreground"}`}
            >
              <FaHeart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
