import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Building,
  Briefcase,
  TrendingUp,
  Calendar,
  Shield,
  Eye,
  Settings,
  BarChart3,
  UserCheck,
  AlertTriangle,
  CheckCircle,
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
        return "bg-red-100 text-red-700";
      case "employer":
        return "bg-blue-100 text-blue-700";
      case "student":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-700 border-red-200";
      case "info":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Welcome Section */}
      <div className="hero-handshake p-8 rounded-2xl">
        <div className="text-center">
          <h1 className="heading-handshake-large text-3xl mb-4">
            Welcome back, Administrator! 👋
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor system health, manage users, and ensure smooth platform operations.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="stats-card-handshake">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-xs text-green-600 mt-1">+45 this week</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="stats-card-handshake">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Companies</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCompanies}</p>
                <p className="text-xs text-blue-600 mt-1">+3 new</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="stats-card-handshake">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
                <p className="text-xs text-orange-600 mt-1">12 expiring</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="stats-card-handshake">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeEvents}</p>
                <p className="text-xs text-green-600 mt-1">2 upcoming</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Users */}
        <div className="lg:col-span-2">
          <div className="dashboard-card-handshake p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-handshake text-xl">
                <Users className="w-6 h-6 text-primary mr-2" />
                Recent Users
              </h2>
              <Button className="btn-handshake btn-sm">
                View All Users
              </Button>
            </div>

            <div className="space-y-4">
              {recentUsers.length > 0 ? (
                recentUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {user.name}
                          </h3>
                          <Badge className={`${getRoleColor(user.role)}`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                          <Badge className={`${getStatusColor(user.status)}`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-1">{user.email}</p>
                        <p className="text-xs text-gray-400">
                          Joined {user.joinDate}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="btn-secondary btn-sm"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="btn-secondary btn-sm"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent users found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* System Alerts */}
          <div className="dashboard-card-handshake p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-handshake text-lg">
                <AlertTriangle className="w-5 h-5 text-primary mr-2" />
                System Alerts
              </h3>
              <Button className="btn-handshake btn-sm">
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
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`border rounded-lg p-3 ${getAlertColor(alert.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {alert.type === "success" && <CheckCircle className="w-5 h-5" />}
                        {alert.type === "warning" && <AlertTriangle className="w-5 h-5" />}
                        {alert.type === "error" && <AlertTriangle className="w-5 h-5" />}
                        {alert.type === "info" && <Shield className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1">{alert.message}</p>
                        <p className="text-xs opacity-75">{alert.timestamp}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">All systems operational</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card-handshake p-6">
            <h3 className="heading-handshake text-lg mb-4">
              <Settings className="w-5 h-5 text-primary mr-2" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button className="btn-handshake w-full">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button className="btn-secondary w-full">
                <Building className="w-4 h-4 mr-2" />
                Company Settings
              </Button>
              <Button className="btn-secondary w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>

          {/* System Health */}
          <div className="dashboard-card-handshake p-6">
            <h3 className="heading-handshake text-lg mb-4">
              <Shield className="w-5 h-5 text-primary mr-2" />
              System Health
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Status</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Response</span>
                <span className="text-sm font-medium text-blue-600">245ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm font-medium text-green-600">99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
