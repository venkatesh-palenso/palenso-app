// next
import Link from "next/link";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { Menu } from "lucide-react";

// components
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navHeader } from "@/constants/navitems";
import UserAvatar from "@/components/user-avatar";

// context
import { useUser } from "@/context";

export default function Navbar() {
  const { isLoggedIn } = useUser();

  return (
    <header className="navbar-shiny flex h-20 w-full shrink-0 items-center justify-between gap-3 px-4 md:px-6 border-b border-gray-200">
      {/* Left: Mobile menu toggle */}
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid gap-2 py-6 px-3">
              {navHeader.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Center: Branding */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center" prefetch={false}>
            <span className="text-2xl font-bold text-primary text-banner-vibrant">
              Palenso
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Right: Placeholder for avatar/menu (optional) */}
      <div className="hidden lg:flex  gap-6">
        {/* Desktop nav links */}
        {navHeader.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="nav-link-shiny group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none"
            prefetch={false}
          >
            {item.label}
          </Link>
        ))}
      </div>
      {/* Avatar (shown when logged in) */}
      <div>{isLoggedIn && <UserAvatar />}</div>
    </header>
  );
}
