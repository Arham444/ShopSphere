import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex py-6 border-b gap-4 last:border-0 sm:items-center sm:gap-6">
      <Link
        to={`/product/${item.id}`}
        className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg border bg-muted aspect-square block group/img relative transition-all hover:border-primary/50"
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover/img:scale-105"
        />
      </Link>

      <div className="flex flex-col flex-1 sm:flex-row sm:items-center gap-2 sm:gap-0 min-w-0">
        {/* Product Name */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <Link
            to={`/product/${item.id}`}
            className="font-semibold text-sm sm:text-base text-foreground hover:text-primary hover:underline transition-all duration-200 line-clamp-2 pr-4 sm:pr-0 "
          >
            {item.name}
          </Link>
          {/* Price (Mobile Only) */}
          <div className="text-xs text-muted-foreground mt-1 sm:hidden">
            Price: ${item.price}
          </div>
        </div>

        {/* Price (Desktop Only) */}
        <div className="w-24 font-medium text-muted-foreground hidden sm:block pl-2">
          ${item.price}
        </div>

        {/* Quantity Control & Subtotal */}
        <div className="flex items-center justify-between sm:justify-center gap-4 sm:w-48 mt-1.5 sm:mt-0">
          <div className="flex items-center border rounded-md h-8 sm:h-9 bg-background shrink-0">
            <button
              type="button"
              className="flex h-full w-8 items-center justify-center border-r hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              onClick={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity - 1 }),
                )
              }
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium">
              {String(item.quantity).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="flex h-full w-8 items-center justify-center border-l hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              onClick={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity + 1 }),
                )
              }
              disabled={item.quantity >= item.stock}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          {/* Subtotal (Mobile Only) */}
          <div className="font-bold text-sm sm:hidden text-foreground">
            Subtotal: ${item.subtotal}
          </div>
        </div>

        {/* Subtotal (Desktop Only) */}
        <div className="w-24 font-bold hidden sm:block text-right">
          ${item.subtotal}
        </div>

        {/* Remove Button */}
        <div className="sm:w-20 text-left sm:text-right sm:ml-4">
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 -ml-2 sm:-mr-2 h-8 px-2 text-xs sm:text-sm cursor-pointer"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    subtotal: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
