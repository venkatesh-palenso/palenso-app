import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Building,
  Briefcase,
  Calendar,
  Shield,
  Eye,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminDashboardProps {
  stats?: {
    totalUsers: number;
    totalCompanies: number;
    totalJobs: number;
    activeEvents: number;
  };
  recentUsers?: Array<{
    id: string;
    name: string;
    email: string;
    role: "student" | "employer" | "admin";
    joinDate: string;
    status: "active" | "pending" | "suspended";
  }>;
  systemAlerts?: Array<{
    id: string;
    type: "info" | "warning" | "error" | "success";
    message: string;
    timestamp: string;
  }>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats = {
    totalUsers: 1247,
    totalCompanies: 89,
    totalJobs: 234,
    activeEvents: 12,
  },
  recentUsers = [],
  systemAlerts = [],
}) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
      case "employer":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
      case "student":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "suspended":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
      case "error":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      case "info":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800";
    }
  };

  return (
    <div className="bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="hero-handshake relative pt-8 pb-16 px-4 overflow-hidden">
        {/* Enhanced Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-40 left-0 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-orange-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute -bottom-8 right-20 w-96 h-96 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
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
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="heading-handshake-large text-4xl mb-4">
                  Welcome back, Admin! 👋
                </h1>
                <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                  Monitor platform activity, manage users, and ensure smooth
                  operations. Keep Palenso running at its best.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="feature-card-handshake p-6 hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.totalUsers}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +45 this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="feature-card-handshake p-6 hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Companies
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.totalCompanies}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      +3 this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="feature-card-handshake p-6 hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Active Jobs
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.totalJobs}
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      +12 this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="feature-card-handshake p-6 hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Events</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.activeEvents}
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      +2 this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Users */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="feature-card-handshake p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-handshake text-xl">Recent Users</h2>
                  <Button variant="outline" className="btn-secondary btn-sm">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentUsers.length > 0 ? (
                    recentUsers.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {user.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {user.email}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>Joined {user.joinDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge
                              className={`text-xs ${getRoleColor(user.role)}`}
                            >
                              {user.role}
                            </Badge>
                            <Badge
                              className={`text-xs ${getStatusColor(user.status)}`}
                            >
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button className="btn-handshake btn-sm">
                            <Eye className="w-3 h-3 mr-1" />
                            View Profile
                          </Button>
                          <Button
                            variant="outline"
                            className="btn-secondary btn-sm"
                          >
                            <Settings className="w-3 h-3" />
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-muted-foreground">No recent users</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* System Alerts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="feature-card-handshake p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-handshake text-xl">System Alerts</h2>
                  <Button variant="outline" className="btn-secondary btn-sm">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {systemAlerts.length > 0 ? (
                    systemAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                        className={`p-4 border rounded-lg ${getAlertColor(alert.type)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-1">
                              {alert.message}
                            </p>
                            <p className="text-xs opacity-75">
                              {alert.timestamp}
                            </p>
                          </div>
                          <div className="ml-4">
                            {alert.type === "success" && (
                              <CheckCircle className="w-4 h-4" />
                            )}
                            {alert.type === "warning" && (
                              <AlertTriangle className="w-4 h-4" />
                            )}
                            {alert.type === "error" && (
                              <AlertTriangle className="w-4 h-4" />
                            )}
                            {alert.type === "info" && (
                              <BarChart3 className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-muted-foreground">No system alerts</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
