import { useUser } from "@/context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // adjust path if needed
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getNavMenu } from "@/constants/navitems";
import Link from "next/link";
import { LogOut } from "lucide-react";

const UserAvatar = () => {
  const { user, logout, isLoggedIn } = useUser();

  if (!user) return null;

  const navMenu = isLoggedIn
    ? getNavMenu(user?.role as "student" | "employer")
    : [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          {/* <AvatarImage src={user.avatarUrl} alt={user.name} /> */}
          <AvatarFallback className="capitalize">
            {user.first_name[0] + user.last_name[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground capitalize">
              {user?.role}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navMenu.map((item) => {
          return (
            <DropdownMenuItem key={item.label}>
              <Link href={item.href} className="flex items-center">
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
