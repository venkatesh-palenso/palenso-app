// next
import Link from "next/link";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import { ArrowRight, Menu, Handshake, Sparkles } from "lucide-react";

// components
// import { ToggleTheme } from "@/components/ui/theme-toggle";
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
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden border-primary hover:bg-primary hover:text-white"
            >
              <Menu />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-white dark:bg-gray-900">
            <div className="grid gap-2 py-6 px-3">
              {navHeader.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-link-handshake flex w-full items-center py-2 text-lg font-semibold text-gray-900 dark:text-white"
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
          <Link
            href={isLoggedIn ? "/dashboard" : "/"}
            className="flex items-center gap-3"
            prefetch={false}
          >
            {/* Enhanced Logo Design - Same as footer */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="w-1.5 h-1.5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 bg-gradient-to-br from-green-400 to-blue-500 rounded-full shadow-md animate-pulse"></div>
            </div>
            <span className="heading-handshake text-2xl font-bold text-foreground">
              Palenso
            </span>
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
            className="nav-link-handshake group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none text-gray-900 dark:text-white"
            prefetch={false}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right: Theme Toggle and Auth */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        {/* <ToggleTheme /> */}

        {/* Avatar (shown when logged in) */}
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
                size="lg"
                className="text-lg px-8 py-4 border-2 border-primary hover:bg-primary transition-all duration-300 cursor-pointer group"
              >
                <span className="group-hover:scale-105 transition-transform duration-200">
                  Sign In
                </span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
