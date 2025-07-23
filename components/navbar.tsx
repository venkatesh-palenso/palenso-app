// next
import Link from "next/link";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { ArrowRight, Menu, Handshake } from "lucide-react";

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
    <header className="nav-handshake flex h-20 w-full shrink-0 items-center justify-between gap-3 px-4 md:px-6">
      {/* Left: Mobile menu toggle */}
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden border-primary hover:bg-primary hover:text-white">
              <Menu />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-white">
            <div className="grid gap-2 py-6 px-3">
              {navHeader.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-link-handshake flex w-full items-center py-2 text-lg font-semibold"
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
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Handshake className="w-8 h-8 text-primary animate-bounce-glow" />
            <span className="heading-handshake text-2xl font-bold">Palenso</span>
          </Link>
        </motion.div>
      </div>

      {/* Right: Navigation and Auth */}
      <div className="hidden lg:flex items-center gap-6">
        {/* Desktop nav links */}
        {navHeader.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="nav-link-handshake group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none"
            prefetch={false}
          >
            {item.label}
          </Link>
        ))}
      </div>
      
      {/* Avatar (shown when logged in) */}
      <div>
        {isLoggedIn ? (
          <UserAvatar />
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/signup">
              <Button className="btn-handshake text-sm">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="text-sm border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
              >
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
