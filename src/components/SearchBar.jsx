import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../features/products/productSlice";
import { selectSearchQuery } from "../features/products/productSelectors";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "./ui/input";

function SearchBar() {
  const dispatch = useDispatch();
  const Query = useSelector(selectSearchQuery);
  // Local state to keep track of the text field input as the user types
  const [localQuery, setLocalQuery] = useState(Query);

  // Debounce effect: dispatches the search action to Redux after the user stops typing for 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localQuery));
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, dispatch]);

  // Sync effect: keeps the local text input in sync if the search filter is cleared from outside (e.g. clicking Home)
  useEffect(() => {
    setLocalQuery(Query);
  }, [Query]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
        <IoSearchOutline className="h-4 w-4" />
      </div>
      <Input
        type="text"
        placeholder="Search products..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="pl-9 w-full bg-background transition-shadow focus-visible:ring-1"
      />
    </div>
  );
}

export default SearchBar;
