import { Link } from "react-router-dom";
import {
  FaEnvelope as Mail,
  FaPhone as Phone,
  FaLocationDot as MapPin,
  FaClock as Clock,
  FaFacebook as Facebook,
  FaInstagram as Instagram,
  FaXTwitter as Twitter,
  FaYoutube as Youtube,
  FaCopyright as Copyright,
} from "react-icons/fa6";
import { Button } from "./ui/button";

function Footer() {
  return (
    <footer className="w-full border-t border-navbar-text/10 bg-navbar-bg text-navbar-text mt-auto transition-colors duration-200">
      <div className="w-full px-4 md:px-8 lg:px-12 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-10 border-b border-navbar-text/10">
          {/* Brand & Description */}
          <div className="flex flex-col gap-4">
            <span className="text-2xl font-black uppercase tracking-tighter">
              ShopSphere
            </span>
            <p className="text-sm text-navbar-text/80 leading-relaxed max-w-xs">
              Your premier destination for curated fashion, electronics, and
              lifestyle products. Elevating your shopping experience with modern
              style.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="#"
                className="p-2 rounded-full hover:bg-navbar-text/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-navbar-text/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-navbar-text/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-navbar-text/10 transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-navbar-text">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-navbar-text/80">
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
                Our Story & Brand
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-navbar-text">
              Contact Support
            </h4>
            <div className="flex flex-col gap-3 text-sm text-navbar-text/80">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-navbar-text/60" />
                <span>+1 (800) 555-0199</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-navbar-text/60" />
                <span>support@shopsphere.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-navbar-text/60 mt-0.5" />
                <span>100 Innovation Way, Suite 400, Boston, MA</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-navbar-text/60" />
                <span>Mon - Fri: 9am - 6pm EST</span>
              </div>
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-navbar-text">
              Stay Updated
            </h4>
            <p className="text-sm text-navbar-text/80 leading-relaxed">
              Subscribe to receive notifications about new arrivals, sales, and
              events.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2 mt-1"
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

        {/* Bottom Bar: Copyright & Payments */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-navbar-text/70">
          <div className="flex items-center gap-1.5 justify-center">
            <Copyright className="h-3.5 w-3.5" />
            <span>2026 ShopSphere. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-3 font-semibold text-[10px] tracking-wider uppercase opacity-80">
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>Paypal</span>
            <span>•</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
