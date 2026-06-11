import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { IoTrashOutline, IoAdd, IoRemove } from "react-icons/io5";
import PropTypes from "prop-types";
import { useCartActions } from "../features/cart/useCartActions";

function QuantityControl({ product }) {
  const dispatch = useDispatch();
  const { cartQuantity } = useCartActions(product);

  if (cartQuantity <= 0) return null;

  return (
    <div className="flex items-center justify-between w-full h-9 sm:h-10 lg:h-12 border-2 sm:border-[3px] border-[#FFC107] rounded-full px-2 sm:px-4 text-foreground font-bold text-sm sm:text-base lg:text-xl">
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
        className="text-foreground/80 hover:text-foreground transition-colors flex items-center justify-center cursor-pointer"
      >
        {cartQuantity === 1 ? (
          <IoTrashOutline
            size={20}
            className="h-4.5 w-4.5 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
          />
        ) : (
          <IoRemove
            size={20}
            className="h-4.5 w-4.5 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
          />
        )}
      </button>
      <span className="text-sm sm:text-base lg:text-xl text-foreground">
        {cartQuantity}
      </span>
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
        className="text-foreground/80 hover:text-foreground transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer"
      >
        <IoAdd size={20} className="h-4.5 w-4.5 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
      </button>
    </div>
  );
}

QuantityControl.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default QuantityControl;
