import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Building,
  Briefcase,
  TrendingUp,
  Settings,
  Eye,
  UserCheck,
  Activity,
  BarChart3,
} from "lucide-react";
import { AdminAnalytics } from "@/interfaces/analytics";

const AdminDashboard: React.FC = () => {
  const [analytics] = useState<AdminAnalytics | null>(null);
  const [loading] = useState(false);

  // useEffect(() => {
  //   const fetchAnalytics = async () => {
  //     try {
  //       const data = await analyticsService.getAdminAnalytics();
  //       setAnalytics(data);
  //     } catch (error) {
  //       console.error('Error fetching admin analytics:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAnalytics();
  // }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            Failed to load analytics data.
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: analytics.total_users.toLocaleString(),
      change: `+${analytics.new_users_this_week} this week`,
      icon: <Users className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Employers",
      value: analytics.total_employers.toLocaleString(),
      change: "Active companies",
      icon: <Building className="w-5 h-5" />,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Total Students",
      value: analytics.total_students.toLocaleString(),
      change: "Active job seekers",
      icon: <UserCheck className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Total Jobs",
      value: analytics.total_jobs.toLocaleString(),
      change: "Active listings",
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage all users",
      icon: <Users className="w-6 h-6" />,
      href: "/admin/users",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "System Settings",
      description: "Configure system settings",
      icon: <Settings className="w-6 h-6" />,
      href: "/admin/settings",
      color: "from-gray-500 to-gray-600",
    },
    {
      title: "Activity Logs",
      description: "View system activity",
      icon: <Activity className="w-6 h-6" />,
      href: "/admin/logs",
      color: "from-red-500 to-red-600",
    },
    {
      title: "Analytics",
      description: "Detailed analytics",
      icon: <BarChart3 className="w-6 h-6" />,
      href: "/admin/analytics",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Admin Dashboard 🛡️
            </h1>
            <p className="text-xl text-gray-600">
              System overview and management
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="lg">
              <Activity className="w-4 h-4 mr-2" />
              View Logs
            </Button>
            <Button
              variant="default"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} text-white rounded-xl shadow-lg`}
                    >
                      {stat.icon}
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{stat.title}</div>
                  <div className="text-xs text-green-600 font-medium">
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top Companies */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Building className="w-6 h-6" />
                    Top Companies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics.top_companies.slice(0, 5).map((company, index) => (
                    <motion.div
                      key={company.company_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center font-semibold">
                          {company.company_name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {company.company_name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {company.jobs_posted} jobs • {company.hires_made}{" "}
                            hires
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {company.applications_received}
                        </div>
                        <div className="text-xs text-gray-600">
                          applications
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Jobs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Briefcase className="w-6 h-6" />
                    Top Performing Jobs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics.top_jobs.slice(0, 5).map((job, index) => (
                    <motion.div
                      key={job.job_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {job.job_title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {job.company_name}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Eye className="w-3 h-3" />
                            {job.views_count} views
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Users className="w-3 h-3" />
                            {job.applications_received} applications
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs">
                          {job.conversion_rate.toFixed(1)}% conversion
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start h-auto p-4 hover:shadow-md transition-all duration-300"
                      >
                        <div
                          className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${action.color} text-white rounded-lg mr-3`}
                        >
                          {action.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{action.title}</div>
                          <div className="text-xs text-gray-600">
                            {action.description}
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* System Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    System Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Events</span>
                    <span className="font-semibold">
                      {analytics.total_events}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Total Applications
                    </span>
                    <span className="font-semibold">
                      {analytics.total_applications}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Total Registrations
                    </span>
                    <span className="font-semibold">
                      {analytics.total_registrations}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Growth Rate</span>
                    <span className="font-semibold text-green-600">
                      +{analytics.growth_rate}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
