import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../features/products/productSlice";
import { selectSearchQuery } from "../features/products/productSelectors";
import { useEffect, useState } from "react";

function SearchBar() {
  const dispatch = useDispatch();
  const Query = useSelector(selectSearchQuery);
  const [localQuery, setLocalQuery] = useState(Query);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localQuery));
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, dispatch]);
  return (
    <input
      type="text"
      placeholder="Search Products..."
      value={localQuery}
      onChange={(e) => setLocalQuery(e.target.value)}
      style={styles.input}
    />
  );
}

const styles = {
  input: {
    //fill with placeholders so i can see changes later when i fix them.
    width: "100%",
  },
};

export default SearchBar;
