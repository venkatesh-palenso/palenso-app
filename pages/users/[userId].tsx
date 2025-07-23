// react
import { useState } from "react";

// next
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

// swr
import useSWR from "swr";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import {
  ArrowLeft,
  Edit,
  User as UserIcon,
  Mail,
  Calendar,
  Shield,
  UserCheck,
  UserX,
  Building,
  GraduationCap,
  Sparkles,
  Save,
  X,
} from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// services
import { userService } from "@/services";

// context
import { useUser } from "@/context";

// layout
import { Layouts } from "@/layouts";

// interfaces
import { User } from "@/interfaces";

const UserDetail = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { user: currentUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});

  const {
    data: user,
    isLoading: userLoading,
    mutate,
  } = useSWR<User>(
    userId ? ["FETCH_USER", userId] : null,
    () => userService.getUser(userId as string),
    { revalidateOnFocus: false },
  );

  // Check if user is admin
  if (currentUser?.role !== "admin") {
    router.push("/dashboard");
    return null;
  }

  const handleEdit = () => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        mobile_number: user.mobile_number,
        role: user.role,
        is_active: user.is_active,
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      await userService.updateUser(userId as string, formData);
      await mutate();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-6 h-6" />;
      case "employer":
        return <Building className="w-6 h-6" />;
      case "student":
        return <GraduationCap className="w-6 h-6" />;
      default:
        return <UserIcon className="w-6 h-6" />;
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <UserIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            User not found
          </h2>
          <p className="text-muted-foreground mb-4">
            The user you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/admin/users">
            <Button className="btn-handshake">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Users
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {user.first_name} {user.last_name} - User Details
        </title>
        <meta name="description" content="User details and management" />
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
                    {getRoleIcon(user.role)}
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="heading-handshake-large text-4xl mb-4">
                    {isEditing ? "Edit User" : "User Details"}
                  </h1>
                  <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                    {isEditing
                      ? "Update user information"
                      : "View and manage user information"}
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
              className="max-w-4xl mx-auto"
            >
              {/* Back Button */}
              <div className="mb-6">
                <Link href="/users">
                  <Button variant="outline" className="mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Users
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="feature-card-handshake p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {user.first_name} {user.last_name}
                      </h2>
                      <div className="flex gap-2">
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.is_active)}
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Basic Information */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              First Name
                            </Label>
                            {isEditing ? (
                              <Input
                                value={formData.first_name || ""}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    first_name: e.target.value,
                                  }))
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-gray-900 dark:text-white mt-1">
                                {user.first_name}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Last Name
                            </Label>
                            {isEditing ? (
                              <Input
                                value={formData.last_name || ""}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    last_name: e.target.value,
                                  }))
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-gray-900 dark:text-white mt-1">
                                {user.last_name}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Role
                            </Label>
                            {isEditing ? (
                              <Select
                                value={formData.role || user.role}
                                onValueChange={(value) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    role: value as
                                      | "student"
                                      | "employer"
                                      | "admin",
                                  }))
                                }
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="student">
                                    Student
                                  </SelectItem>
                                  <SelectItem value="employer">
                                    Employer
                                  </SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <p className="text-gray-900 dark:text-white mt-1">
                                {user.role}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email
                            </Label>
                            {isEditing ? (
                              <Input
                                type="email"
                                value={formData.email || ""}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                  }))
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-gray-900 dark:text-white mt-1">
                                {user.email || "Not provided"}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Mobile Number
                            </Label>
                            {isEditing ? (
                              <Input
                                value={formData.mobile_number || ""}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    mobile_number: e.target.value,
                                  }))
                                }
                                className="mt-1"
                              />
                            ) : (
                              <p className="text-gray-900 dark:text-white mt-1">
                                {user.mobile_number || "Not provided"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Account Status */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Account Status
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Status
                            </Label>
                            {isEditing ? (
                              <Select
                                value={
                                  formData.is_active !== undefined
                                    ? formData.is_active.toString()
                                    : user.is_active.toString()
                                }
                                onValueChange={(value) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    is_active: value === "true",
                                  }))
                                }
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="true">Active</SelectItem>
                                  <SelectItem value="false">
                                    Inactive
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <p className="text-gray-900 dark:text-white mt-1">
                                {user.is_active ? "Active" : "Inactive"}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email Verified
                            </Label>
                            <p className="text-gray-900 dark:text-white mt-1">
                              {user.is_email_verified ? "Yes" : "No"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Timestamps */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Account Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Date Joined
                            </Label>
                            <p className="text-gray-900 dark:text-white mt-1">
                              {new Date(user.date_joined).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Last Login
                            </Label>
                            <p className="text-gray-900 dark:text-white mt-1">
                              {user.last_login_time
                                ? new Date(
                                    user.last_login_time,
                                  ).toLocaleDateString()
                                : "Never"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Actions */}
                  <div className="feature-card-handshake p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Actions
                    </h3>
                    <div className="space-y-3">
                      {isEditing ? (
                        <>
                          <Button
                            className="btn-handshake w-full"
                            onClick={handleSave}
                            disabled={isLoading}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {isLoading ? "Saving..." : "Save Changes"}
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleCancel}
                            disabled={isLoading}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          className="btn-handshake w-full"
                          onClick={handleEdit}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit User
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="feature-card-handshake p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Quick Stats
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          Member for{" "}
                          {Math.floor(
                            (Date.now() -
                              new Date(user.date_joined).getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}{" "}
                          days
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {user.is_active
                            ? "Account Active"
                            : "Account Inactive"}
                        </span>
                      </div>
                      {user.is_email_verified && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Email Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

UserDetail.getLayout = Layouts.Admin;

export default UserDetail;
