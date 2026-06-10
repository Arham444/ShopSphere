import { Link, useNavigate } from "react-router-dom";
import { useCartActions } from "../features/cart/useCartActions";
import { useWishlist } from "../features/wishlist/useWishlist";
import { FaHeart } from "react-icons/fa";
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
    if (isGuest) {
      navigate("/wishlist");
    } else {
      toggleWishlist();
    }
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
          className={`absolute top-2 right-2 h-8 w-8 rounded-full shadow-sm z-10 ${
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
      <CardContent className="flex flex-col flex-1 gap-2 p-4">
        <div className="flex justify-between items-start gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <div className="flex items-center text-xs font-medium text-foreground">
            <span className="text-yellow-500 mr-1">⭐</span>
            {product.rating}
          </div>
        </div>
        <Link
          to={`/product/${product.id}`}
          className="font-semibold text-base line-clamp-2 hover:text-primary transition-colors"
        >
          {product.name}
        </Link>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <p className="font-bold text-lg text-primary">${product.price}</p>
          <StockStatus product={product} />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {!isOutOfStock && cartQuantity > 0 ? (
          <QuantityControl product={product} />
        ) : (
          <Button
            className="w-full h-10 rounded-full cursor-pointer"
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
