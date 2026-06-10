import { FaCopyright } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <span className="text-xl font-bold tracking-tight text-primary mb-3 block">
              ShopSphere
            </span>
            <p className="text-sm text-muted-foreground max-w-sm">
              Premium products, seamless experience.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
              Quick Links
            </h4>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/cart" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cart
            </Link>
            <Link to="/wishlist" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Wishlist
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
              Support
            </h4>
            <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              FAQ
            </span>
            <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Shipping Info
            </span>
            <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Returns
            </span>
          </div>
        </div>

        <div className="border-t pt-8 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <FaCopyright className="h-3.5 w-3.5" />
            <span>2026 ShopSphere. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
