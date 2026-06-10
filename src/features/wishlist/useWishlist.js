import { useDispatch, useSelector } from "react-redux";
import { selectIsInWishlist } from "./wishlistSelectors";
import { addToWishlist, removeFromWishlist } from "./wishlistSlice";

export const useWishlist = (product) => {
  const dispatch = useDispatch();
  const isInWishlist = useSelector((state) =>
    selectIsInWishlist(state, product?.id),
  );

  const toggleWishlist = () => {
    if (!product) return;
    if (isInWishlist) dispatch(removeFromWishlist(product.id));
    else dispatch(addToWishlist(product));
  };
  return { isInWishlist, toggleWishlist };
};
