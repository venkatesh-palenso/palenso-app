// react
import { useState, useEffect } from "react";

// next
import Head from "next/head";
import { useRouter } from "next/router";

// swr
import useSWR from "swr";

// react-hook-form
import { useForm } from "react-hook-form";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import {
  Users,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  Sparkles,
} from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

// services
import { userService } from "@/services";

// context
import { useUser } from "@/context";

// layout
import { Layouts } from "@/layouts";

// interfaces
import { IUser, IUserSearchParams } from "@/interfaces";

// Form interface for the search form
interface UserSearchForm {
  search: string;
  role: string | undefined;
  is_active: string | undefined;
}

const AdminUsers = () => {
  const router = useRouter();
  const { user: currentUser } = useUser();

  const { register, watch, setValue } = useForm<UserSearchForm>({
    defaultValues: {
      search: "",
      role: undefined,
      is_active: undefined,
    },
  });

  const [debouncedFilters, setDebouncedFilters] = useState<IUserSearchParams>({
    search: "",
    role: undefined,
    is_active: undefined,
  });

  const watchedFilters = watch();

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters({
        search: watchedFilters.search,
        role: watchedFilters.role as
          | "student"
          | "employer"
          | "admin"
          | undefined,
        is_active:
          watchedFilters.is_active === "true"
            ? true
            : watchedFilters.is_active === "false"
              ? false
              : undefined,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [watchedFilters]);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (currentUser && currentUser.role !== "admin") {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  const {
    data: usersResponse,
    isLoading: usersLoading,
    mutate,
  } = useSWR(
    ["FETCH_ALL_USERS", debouncedFilters],
    () => userService.getUsers(debouncedFilters),
    { revalidateOnFocus: false },
  );

  const users = usersResponse?.results || [];

  const roleOptions = [
    { value: "student", label: "Student" },
    { value: "employer", label: "Employer" },
    { value: "admin", label: "Admin" },
  ];

  const statusOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && users) {
      setSelectedUsers(
        users
          .map((user: IUser) => user.id)
          .filter((id): id is string => id !== undefined),
      );
    } else {
      setSelectedUsers([]);
    }
  };

  const handleBulkAction = async (
    action: "activate" | "deactivate" | "delete",
  ) => {
    if (selectedUsers.length === 0) return;

    setIsLoading(true);
    try {
      switch (action) {
        case "activate":
          await userService.bulkUpdateUsers(selectedUsers, { is_active: true });
          break;
        case "deactivate":
          await userService.bulkUpdateUsers(selectedUsers, {
            is_active: false,
          });
          break;
        case "delete":
          // Handle bulk delete - you might want to show a confirmation dialog
          for (const userId of selectedUsers) {
            await userService.deleteUser(userId);
          }
          break;
      }
      await mutate();
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error performing bulk action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.deleteUser(userId);
        await mutate();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            Admin
          </Badge>
        );
      case "employer":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Employer
          </Badge>
        );
      case "student":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Student
          </Badge>
        );
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        <UserCheck className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <UserX className="w-3 h-3 mr-1" />
        Inactive
      </Badge>
    );
  };

  if (currentUser?.role !== "admin") {
    return null;
  }

  return (
    <>
      <Head>
        <title>User Management - Admin Dashboard</title>
        <meta
          name="description"
          content="Manage users in the Palenso platform"
        />
      </Head>

      <div className="bg-background min-h-screen">
        {/* Header */}
        <section className="hero-handshake relative pt-8 pb-16 px-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          />

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative mr-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4">
                    User Management
                  </h1>
                  <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                    Manage all users in the Palenso platform
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Filters and Search */}
              <div className="feature-card-handshake p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    label="Search Users"
                    name="search"
                    type="text"
                    placeholder="Name, email, or username"
                    register={register}
                    icon={<Search className="w-4 h-4" />}
                  />

                  <FormField
                    label="Role"
                    name="role"
                    type="select"
                    placeholder="Filter by role"
                    options={roleOptions}
                    setValue={setValue}
                    watch={watch}
                  />

                  <FormField
                    label="Status"
                    name="is_active"
                    type="select"
                    placeholder="Filter by status"
                    options={statusOptions}
                    setValue={setValue}
                    watch={watch}
                  />
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedUsers.length > 0 && (
                <div className="feature-card-handshake p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {selectedUsers.length} user(s) selected
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkAction("activate")}
                        disabled={isLoading}
                      >
                        <UserCheck className="w-4 h-4 mr-2" />
                        Activate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkAction("deactivate")}
                        disabled={isLoading}
                      >
                        <UserX className="w-4 h-4 mr-2" />
                        Deactivate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkAction("delete")}
                        disabled={isLoading}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Users Table */}
              <div className="feature-card-handshake p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left p-4">
                          <Checkbox
                            checked={
                              users && selectedUsers.length === users.length
                            }
                            onCheckedChange={handleSelectAll}
                          />
                        </th>
                        <th className="text-left p-4 font-semibold">User</th>
                        <th className="text-left p-4 font-semibold">Role</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Contact</th>
                        <th className="text-left p-4 font-semibold">Joined</th>
                        <th className="text-left p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersLoading ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                          </td>
                        </tr>
                      ) : users && users.length > 0 ? (
                        users.map((user: IUser) => (
                          <tr
                            key={user.id}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <td className="p-4">
                              <Checkbox
                                checked={
                                  user.id
                                    ? selectedUsers.includes(user.id)
                                    : false
                                }
                                onCheckedChange={(checked) =>
                                  user.id &&
                                  handleSelectUser(user.id, checked as boolean)
                                }
                              />
                            </td>
                            <td className="p-4">
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {user.first_name} {user.last_name}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">{getRoleBadge(user.role)}</td>
                            <td className="p-4">
                              {getStatusBadge(user.is_active)}
                            </td>
                            <td className="p-4">
                              <div className="space-y-1">
                                {user.email && (
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Mail className="w-3 h-3 mr-1" />
                                    {user.email}
                                  </div>
                                )}
                                {user.mobile_number && (
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Phone className="w-3 h-3 mr-1" />
                                    {user.mobile_number}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(
                                  user.date_joined,
                                ).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="p-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() =>
                                      router.push(`/users/${user.id}`)
                                    }
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      router.push(`/users/${user.id}/edit`)
                                    }
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteUser(user.id!)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center py-8">
                            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                              No users found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              Try adjusting your search criteria.
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

AdminUsers.getLayout = Layouts.Admin;

export default AdminUsers;
