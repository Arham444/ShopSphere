import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../features/products/productSlice";
import { selectSearchQuery } from "../features/products/productSelectors";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchBar.module.css";

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
    <div className={styles.wrapper}>
      <IoSearchOutline className={styles.icon} />
      <input
        type="text"
        placeholder="Search products..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}

export default SearchBar;
