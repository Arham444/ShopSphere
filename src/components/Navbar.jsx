import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemCount } from "../features/cart/cartSelectors";
import { selectWishlistItemsCount } from "../features/wishlist/wishlistSelectors";
import {
  selectCurrentUser,
  selectIsAdmin,
} from "../features/auth/authSelectors";
import { logout } from "../features/auth/authSlice";
import { FaHeart } from "react-icons/fa";
import {
  IoCartOutline,
  IoLogOutOutline,
  IoLogInOutline,
  IoSunnyOutline,
  IoMoonOutline,
} from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const page = location.pathname;
  const wishlistCount = useSelector(selectWishlistItemsCount);
  const cartCount = useSelector(selectCartItemCount);
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = useSelector(selectIsAdmin);

  const [themeName, setThemeName] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return systemPrefersDark ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (themeName === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
      isActive ? "text-primary" : "text-muted-foreground"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-purple-100/90 to-fuchsia-50/90 dark:from-purple-950/90 dark:to-fuchsia-950/90 backdrop-blur shadow-sm">
      <div className="w-full px-4 md:px-8 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <IoCartOutline className="h-5 w-5" />
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter text-primary">
            ShopSphere
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {themeName === "dark" ? (
              <IoSunnyOutline className="h-5 w-5" />
            ) : (
              <IoMoonOutline className="h-5 w-5" />
            )}
          </Button>
          <NavLink to="/" className={`${getLinkClass} hidden md:flex`}>
            <span>Home</span>
          </NavLink>
          {currentUser && currentUser.role !== "guest" && (
            <>
              <NavLink to="/wishlist" className={getLinkClass}>
                <div className="relative flex items-center">
                  <FaHeart className="h-4 w-4 sm:mr-1.5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-purple-100 dark:ring-purple-950">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Wishlist</span>
              </NavLink>
              <NavLink to="/cart" className={getLinkClass}>
                <div className="relative flex items-center">
                  <IoCartOutline className="h-5 w-5 sm:mr-1.5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-purple-100 dark:ring-purple-950">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Cart</span>
              </NavLink>
            </>
          )}
          {isAdmin && (
            <NavLink to="/AddProduct" className={getLinkClass}>
              <IoMdAddCircle className="h-5 w-5 sm:mr-1.5" />
              <span className="hidden sm:inline">Add Product</span>
            </NavLink>
          )}

          {currentUser && currentUser.role !== "guest" && page !== "/login" ? (
            <div className="flex items-center gap-2 sm:gap-3 ml-1 sm:ml-2 border-l pl-2 sm:pl-4 border-border/30">
              <Badge
                variant="secondary"
                className="font-medium text-xs hidden md:inline-flex"
              >
                {isAdmin === true ? "Admin" : `${currentUser.username}`}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(logout())}
                className="gap-2 h-8 px-2 sm:px-3"
              >
                <IoLogOutOutline className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : page !== "/login" ? (
            <div className="ml-2 border-l pl-4">
              <Button asChild variant="default" size="sm" className="h-8">
                <NavLink to="/login" className="gap-2">
                  <IoLogInOutline className="h-4 w-4" />
                  <span>Login</span>
                </NavLink>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
