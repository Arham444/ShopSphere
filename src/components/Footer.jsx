import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Button } from "./ui/button";

function Footer() {
  return (
    <footer className="w-full border-t border-navbar-text/10 bg-navbar-bg text-navbar-text mt-auto transition-colors duration-200">
      <div className="w-full px-4 md:px-8 lg:px-12 pt-10 pb-8 sm:pt-12 sm:pb-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand & Description */}
          <div className="flex flex-col gap-3 sm:gap-4 max-w-sm">
            <span className="text-xl sm:text-2xl font-black uppercase tracking-tighter">
              ShopSphere
            </span>
            <p className="text-sm text-navbar-text/80 leading-relaxed">
              Your premier destination for curated fashion, electronics, and
              lifestyle products. Elevating your shopping experience with modern
              style.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-1 sm:mt-2">
              <a
                href="#"
                className="p-2 rounded-full hover:bg-navbar-text/10 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-navbar-text/10 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-navbar-text/10 transition-colors"
                aria-label="Twitter"
              >
                <FaXTwitter className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full hover:bg-navbar-text/10 transition-colors"
                aria-label="Youtube"
              >
                <FaYoutube className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links & Contact Support wrapper to keep them in the same row on mobile viewports */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-2 lg:contents">
            {/* Quick Links */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-navbar-text text-left">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2 sm:gap-2.5 text-sm text-navbar-text/80 text-left">
                <Link to="/" className="hover:text-navbar-text transition-colors">
                  Shop All Products
                </Link>
                <Link
                  to="/wishlist"
                  className="hover:text-navbar-text transition-colors"
                >
                  My Wishlist
                </Link>
                <Link
                  to="/cart"
                  className="hover:text-navbar-text transition-colors"
                >
                  Shopping Cart
                </Link>
                <a href="#" className="hover:text-navbar-text transition-colors">
                  Our Story
                </a>
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-navbar-text text-left">
                Contact Support
              </h4>
              <div className="flex flex-col gap-2.5 sm:gap-3 text-sm text-navbar-text/80">
                <div className="flex items-center gap-2">
                  <FaPhone className="h-4 w-4 shrink-0 text-navbar-text/60" />
                  <span>+1 (800) 555-0199</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="h-4 w-4 shrink-0 text-navbar-text/60" />
                  <span>support@shopsphere.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="h-4 w-4 shrink-0 text-navbar-text/60" />
                  <span>Mon - Fri: 9am - 6pm EST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="flex flex-col gap-3 sm:gap-4 max-w-sm">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-navbar-text">
              Stay Updated
            </h4>
            <p className="text-sm text-navbar-text/80 leading-relaxed">
              Subscribe to receive notifications about new arrivals, sales, and
              events.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2 mt-1 w-full"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 text-sm rounded-md border border-navbar-text/20 bg-background/50 text-foreground placeholder:text-navbar-text/50 focus:border-navbar-text focus:ring-1 focus:ring-navbar-text focus:outline-none transition-all"
                required
              />
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/95 transition-all text-sm font-medium h-9.5 cursor-pointer"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
