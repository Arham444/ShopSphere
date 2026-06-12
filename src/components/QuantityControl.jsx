import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { IoTrashOutline, IoAdd, IoRemove } from "react-icons/io5";
import PropTypes from "prop-types";
import { useCartActions } from "../features/cart/useCartActions";
import { cn } from "@/lib/utils";

function QuantityControl({ product, className }) {
  const dispatch = useDispatch();
  const { cartQuantity } = useCartActions(product);

  if (cartQuantity <= 0) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-between w-full border-2 border-amber-500/50 rounded-full px-3 text-foreground font-bold transition-all",
        className,
      )}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          if (cartQuantity === 1) dispatch(removeFromCart(product.id));
          else
            dispatch(
              updateQuantity({
                id: product.id,
                quantity: cartQuantity - 1,
              }),
            );
        }}
        className="text-foreground/80 hover:text-foreground transition-colors flex items-center justify-center cursor-pointer p-1 rounded-full hover:bg-amber-500/10"
      >
        {cartQuantity === 1 ? (
          <IoTrashOutline className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
        ) : (
          <IoRemove className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
        )}
      </button>
      <span className="text-center select-none">{cartQuantity}</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            updateQuantity({
              id: product.id,
              quantity: cartQuantity + 1,
            }),
          );
        }}
        disabled={cartQuantity >= product.stock}
        className="text-foreground/80 hover:text-foreground transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer p-1 rounded-full hover:bg-amber-500/10"
      >
        <IoAdd className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
      </button>
    </div>
  );
}

QuantityControl.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default QuantityControl;
