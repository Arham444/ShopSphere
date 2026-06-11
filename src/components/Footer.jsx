import { FaCopyright } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="w-full border-t bg-gradient-to-r from-purple-200 to-fuchsia-100 dark:from-purple-950 dark:to-fuchsia-950 mt-auto">
      <div className="w-full px-4 md:px-8 lg:px-12 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black uppercase tracking-tighter text-primary">
              ShopSphere
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FaCopyright className="h-3.5 w-3.5" />
            <span>2026 ShopSphere. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
