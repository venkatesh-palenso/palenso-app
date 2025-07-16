import { NavItem } from "@/interfaces/nav-item";
import {
  BookOpenText,
  Building,
  Handshake,
  MessageCircle,
  Search,
  User,
} from "lucide-react";

/**
 * An array of navigation items for the student dashboard menu.
 * Each item includes a label, a target href, and an icon component.
 *
 * @remarks
 * Used to render the sidebar or navigation menu for student users.
 *
 * @example
 * // Usage in a navigation component
 * studentNavMenu.map(item => (
 *   <NavLink to={item.href} icon={item.icon}>
 *     {item.label}
 *   </NavLink>
 * ));
 */
const studentNavMenu: NavItem[] = [
  {
    label: "My Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "My Applications",
    href: "/applications",
    icon: MessageCircle,
  },
  { label: "Saved Jobs", href: "/saved-jobs", icon: Search },
];

/**
 * Navigation menu items for employees.
 *
 * Each item in the array represents a navigation link in the employee dashboard,
 * including its label, destination URL (`href`), and associated icon component.
 *
 * @remarks
 * Used to render the sidebar or header navigation for employee users.
 *
 * @see NavItem
 */
const employeeNavMenu: NavItem[] = [
  {
    label: "Company Profile",
    href: "/company-profile",
    icon: Building,
  },
  { label: "Post a Job", href: "/post-job", icon: Search },
  { label: "Manage Jobs", href: "/manage-jobs", icon: MessageCircle },
];

/**
 * An array of navigation menu items used throughout the application.
 * Each item contains a label, a hyperlink reference, and an optional icon.
 *
 * @remarks
 * This constant defines the main navigation structure for the app.
 *
 * @example
 * // Access the label of the first menu item
 * console.log(navMenu[0].label); // 'Jobs'
 */
export const navHeader: NavItem[] = [
  { label: "Jobs", href: "/jobs", icon: Search },
  { label: "Companies", href: "/companies", icon: Building },
  { label: "Events", href: "/events", icon: Handshake },
  { label: "Resources", href: "/resources", icon: BookOpenText },
];

/**
 * Returns the navigation menu items based on the user's role.
 *
 * @param role - The role of the user, either 'student' or 'employer'.
 * @returns An array of navigation menu items specific to the provided role.
 *          Returns `studentNavMenu` for 'student', `employeeNavMenu` for 'employer',
 *          or an empty array if the role is not recognized.
 */
export const getNavMenu = (role: "student" | "employer") => {
  return role === "student"
    ? studentNavMenu
    : role === "employer"
    ? employeeNavMenu
    : [];
};
