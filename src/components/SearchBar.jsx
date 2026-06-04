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
    width: "100%",
    padding: "0.6rem 1rem",
    fontSize: "1rem",
    border: "2px solid #c4c4c4",
    borderRadius: "6px",
    boxSizing: "border-box",
  },
};

SearchBar.propTypes = {};

export default SearchBar;
