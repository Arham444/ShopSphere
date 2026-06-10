import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b gap-4 last:border-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <Link
          to={`/product/${item.id}`}
          className="font-medium text-base hover:text-primary transition-colors line-clamp-2"
        >
          {item.name}
        </Link>
      </div>

      <div className="w-24 font-medium text-muted-foreground hidden sm:block">
        ${item.price}
      </div>

      <div className="flex items-center gap-4 sm:w-48">
        <div className="flex items-center border rounded-md h-9">
          <button
            type="button"
            className="flex h-full w-8 items-center justify-center border-r hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          <span className="w-10 text-center text-sm font-medium">
            {String(item.quantity).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="flex h-full w-8 items-center justify-center border-l hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
        <div className="font-bold sm:hidden">${item.subtotal}</div>
      </div>

      <div className="w-24 font-bold hidden sm:block text-right">
        ${item.subtotal}
      </div>

      <div className="w-20 text-right sm:ml-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 -mr-2"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </Button>
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
