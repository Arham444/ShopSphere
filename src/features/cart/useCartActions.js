import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "./cartSlice";
import { selectCartItems } from "./cartSelectors";
import { selectCurrentUser } from "../auth/authSelectors";

export const useCartActions = (product) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);

  const isGuest = !currentUser || currentUser.role === "guest";

  const cartItem = cartItems.find((item) => item.id === product?.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product ? product.stock <= 0 : true;
  const isLimitReached =
    isOutOfStock || (product && cartQuantity >= product.stock);

  const handleAddToCart = () => {
    if (!product) return;
    if (isGuest) {
      navigate("/cart");
    } else {
      dispatch(addToCart(product));
    }
  };

  return {
    cartQuantity,
    isOutOfStock,
    isLimitReached,
    handleAddToCart,
    isGuest,
  };
};
