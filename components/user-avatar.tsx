import { useUser } from "@/context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getNavMenu } from "@/constants/navitems";
import Link from "next/link";
import { LogOut, Settings, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const UserAvatar = () => {
  const { user, logout, isLoggedIn } = useUser();

  if (!user) return null;

  const navMenu = isLoggedIn
    ? getNavMenu(user?.role as "student" | "employer")
    : [];

  // Generate initials from user name
  const initials =
    `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();

  // Generate light background colors based on user role
  const getBackgroundColors = (role: string) => {
    switch (role) {
      case "student":
        return "bg-blue-50 text-blue-500";
      case "employer":
        return "bg-green-100 text-green-700";
      case "admin":
        return "bg-red-100 text-red-700";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Avatar className="h-9 w-9 cursor-pointer border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md group">
            {/* <AvatarImage src={user.avatarUrl} alt={user.name} /> */}
            <AvatarFallback
              className={`capitalize font-semibold ${getBackgroundColors(user.role)} border border-gray-200 group-hover:border-gray-300 transition-all duration-300`}
            >
              {initials || "U"}
            </AvatarFallback>
          </Avatar>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
      >
        {/* User Info Section */}
        <DropdownMenuLabel className="font-normal p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-gray-200">
              <AvatarFallback
                className={`capitalize font-semibold ${getBackgroundColors(user.role)}`}
              >
                {initials || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none text-gray-900 dark:text-white">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs leading-none text-muted-foreground capitalize">
                {user?.role}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <div className="h-px bg-gray-300 dark:bg-gray-600 my-2" />

        {/* Dynamic Navigation Items */}
        {navMenu.map((item) => {
          const IconComponent = item.icon;
          return (
            <DropdownMenuItem
              key={item.href}
              className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Link href={item.href} className="flex items-center w-full">
                <IconComponent className="mr-3 h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
              </Link>
            </DropdownMenuItem>
          );
        })}

        <div className="h-px bg-gray-300 dark:bg-gray-600 my-2" />

        {/* Additional Menu Items */}
        <DropdownMenuItem className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Link href="/settings" className="flex items-center w-full">
            <Settings className="mr-3 h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Settings
            </span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Link href="/help" className="flex items-center w-full">
            <HelpCircle className="mr-3 h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Help & Support
            </span>
          </Link>
        </DropdownMenuItem>

        <div className="h-px bg-gray-300 dark:bg-gray-600 my-2" />

        {/* Logout */}
        <DropdownMenuItem
          className="flex items-center p-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
          onClick={logout}
        >
          <LogOut className="mr-3 h-4 w-4 text-red-500" />
          <span className="text-sm font-medium text-red-600 dark:text-red-400">
            Sign Out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
