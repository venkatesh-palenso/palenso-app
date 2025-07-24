import React from "react";
import { User, Mail, Phone, Building, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/user";

const ProfileCard: React.FC = () => {
  const { user } = useUser();
  const isStudent = user?.role === "student";
  const isEmployer = user?.role === "employer";

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900 dark:text-white">
          <User className="mr-2 h-5 w-5 text-blue-500" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {user?.first_name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {user?.first_name} {user?.last_name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {user?.email}
            </p>
            <Badge className="mt-1 text-white">
              {user?.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : "User"}
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Email
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Phone
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {user?.mobile_number || "Not provided"}
              </p>
            </div>
          </div>

          {isStudent && (
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Role
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Student
                </p>
              </div>
            </div>
          )}

          {isEmployer && (
            <div className="flex items-center space-x-3">
              <Building className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Role
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Employer
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
