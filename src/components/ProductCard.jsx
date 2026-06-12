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
        <div className="flex justify-between items-start gap-2">
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground line-clamp-1">
            {product.category}
          </p>
          <div className="flex items-center text-[10px] sm:text-xs font-medium text-foreground shrink-0">
            <FaStar className="text-yellow-500 mr-0.5" />
            {product.rating}
          </div>
        </div>
        <Link
          to={`/product/${product.id}`}
          className="font-semibold text-sm sm:text-base line-clamp-2 hover:text-primary transition-colors leading-snug min-h-[2.5rem]"
        >
          {product.name}
        </Link>
        <div className="mt-auto pt-1 sm:pt-2 flex flex-wrap items-center justify-between gap-1">
          <p className="font-bold text-base sm:text-lg text-primary">
            ${product.price}
          </p>
          <StockStatus product={product} />
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0">
        {!isOutOfStock && cartQuantity > 0 ? (
          <QuantityControl product={product} />
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
