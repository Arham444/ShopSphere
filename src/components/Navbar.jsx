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
import { clearFilters } from "../features/products/productSlice";
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
    `flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-navbar-text ${
      isActive ? "text-navbar-text" : "text-navbar-text/70"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-navbar-bg text-navbar-text backdrop-blur shadow-sm">
      <div className="w-full px-3 min-[380px]:px-4 md:px-8 lg:px-12 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => dispatch(clearFilters())}
          className="flex items-center gap-1.5 sm:gap-2 group shrink-0"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <IoCartOutline className="h-5 w-5" />
          </div>
          <span className="text-lg min-[380px]:text-xl sm:text-2xl font-black uppercase tracking-tighter text-navbar-text">
            ShopSphere
          </span>
        </Link>
        <div className="flex items-center gap-1.5 min-[380px]:gap-2 sm:gap-4 md:gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="h-9 w-9 shrink-0 text-navbar-text hover:bg-white/10 hover:text-navbar-text"
          >
            {themeName === "dark" ? (
              <IoSunnyOutline className="h-5 w-5" />
            ) : (
              <IoMoonOutline className="h-5 w-5" />
            )}
          </Button>
          <NavLink
            to="/"
            onClick={() => dispatch(clearFilters())}
            className={(navData) => `${getLinkClass(navData)} hidden md:flex`}
          >
            <span>Home</span>
          </NavLink>
          {currentUser && currentUser.role !== "guest" && (
            <>
              <NavLink to="/wishlist" className={getLinkClass}>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0">
                  <FaHeart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-[-2px] right-[-2px] flex h-4 w-4 items-center justify-center rounded-full bg-navbar-badge-bg text-[10px] font-bold leading-none text-navbar-badge-text ring-2 ring-navbar-bg">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Wishlist</span>
              </NavLink>
              <NavLink to="/cart" className={getLinkClass}>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0">
                  <IoCartOutline className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute top-[-2px] right-[-2px] flex h-4 w-4 items-center justify-center rounded-full bg-navbar-badge-bg text-[10px] font-bold leading-none text-navbar-badge-text ring-2 ring-navbar-bg">
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
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0">
                <IoMdAddCircle className="h-5 w-5" />
              </div>
              <span className="hidden sm:inline">Add Product</span>
            </NavLink>
          )}

          {currentUser && currentUser.role !== "guest" && page !== "/login" ? (
            <div className="flex items-center gap-1.5 sm:gap-3 ml-1 border-l pl-1.5 sm:pl-4 border-white/10 shrink-0">
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
                className="gap-1.5 sm:gap-2 h-8 px-2 sm:px-3 text-xs sm:text-sm text-navbar-text hover:bg-white/10 hover:text-navbar-text"
              >
                <IoLogOutOutline className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : page !== "/login" ? (
            <div className="ml-1 sm:ml-2 border-l pl-2 sm:pl-4 border-white/10 shrink-0">
              <Button
                asChild
                variant="default"
                size="sm"
                className="h-8 text-xs sm:text-sm"
              >
                <NavLink to="/login" className="gap-1.5 sm:gap-2">
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
