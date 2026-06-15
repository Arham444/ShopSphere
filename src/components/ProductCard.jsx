import { Link, useNavigate } from "react-router-dom";
import { useCartActions } from "../features/cart/useCartActions";
import { useWishlist } from "../features/wishlist/useWishlist";
import { FaHeart, FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import QuantityControl from "./QuantityControl";
import StockStatus from "./StockStatus";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist(product);
  const {
    cartQuantity,
    isOutOfStock,
    isLimitReached,
    handleAddToCart,
    isGuest,
  } = useCartActions(product);

  const handleToggleWishlist = () => {
    if (isGuest) navigate("/wishlist");
    else toggleWishlist();
  };

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all shadow-sm border border-border/60 hover:shadow-md p-0 bg-card">
      <Link
        to={`/product/${product.id}`}
        className="aspect-square overflow-hidden bg-muted relative block w-full"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal"
        />
        <Button
          variant="secondary"
          size="icon"
          className={`absolute top-2 right-2 h-8 w-8 rounded-full shadow-sm z-10 cursor-pointer ${
            isInWishlist
              ? "text-red-500 hover:text-red-600"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleToggleWishlist();
          }}
        >
          <FaHeart className="h-4 w-4" />
        </Button>
      </Link>
      <CardContent className="flex flex-col flex-1 gap-1.5 sm:gap-2 p-3 sm:p-4">
        <div className="flex justify-between items-center gap-2">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground line-clamp-1">
            {product.category}
          </p>
          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full text-xs sm:text-sm font-bold shrink-0">
            <FaStar className="h-3.5 w-3.5 fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>
        <Link
          to={`/product/${product.id}`}
          className="font-bold text-[15px] sm:text-lg line-clamp-2 hover:text-primary transition-colors leading-snug min-h-[2.5rem]"
        >
          {product.name}
        </Link>
        <div className="mt-auto pt-1 sm:pt-2 flex flex-wrap items-center justify-between gap-1">
          <p className="font-extrabold text-lg sm:text-xl text-primary">
            ${product.price}
          </p>
          <StockStatus product={product} />
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0">
        {!isOutOfStock && cartQuantity > 0 ? (
          <QuantityControl
            product={product}
            className="h-9 sm:h-10 text-xs sm:text-sm"
          />
        ) : (
          <Button
            className="w-full h-9 sm:h-10 text-xs sm:text-sm rounded-full cursor-pointer"
            onClick={handleAddToCart}
            disabled={isLimitReached}
            variant={isOutOfStock ? "secondary" : "default"}
          >
            {isOutOfStock
              ? "Out of Stock"
              : cartQuantity >= product.stock
                ? "Limit Reached"
                : "Add to Cart"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
