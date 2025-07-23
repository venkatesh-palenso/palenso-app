import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Building,
  Eye,
  CheckCircle,
  Clock,
  DollarSign,
  Star,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EmployerDashboardProps {
  stats?: {
    activeJobs: number;
    totalApplications: number;
    interviews: number;
    hires: number;
  };
  recentApplications?: Array<{
    id: string;
    candidateName: string;
    jobTitle: string;
    appliedDate: string;
    status: "pending" | "reviewed" | "interviewed" | "hired" | "rejected";
    experience: string;
    location: string;
  }>;
  activeJobs?: Array<{
    id: string;
    title: string;
    applications: number;
    views: number;
    postedDate: string;
    status: "active" | "paused" | "closed";
  }>;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  stats = {
    activeJobs: 8,
    totalApplications: 156,
    interviews: 12,
    hires: 3,
  },
  recentApplications = [],
  activeJobs = [],
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "reviewed":
        return "bg-blue-100 text-blue-700";
      case "interviewed":
        return "bg-purple-100 text-purple-700";
      case "hired":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "paused":
        return "bg-yellow-100 text-yellow-700";
      case "closed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
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
            Welcome back, Employer! 👋
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect candidates for your team. Track applications, 
            manage interviews, and grow your organization.
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
                <p className="text-sm text-gray-600 mb-1">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
                <p className="text-xs text-green-600 mt-1">2 expiring soon</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm text-gray-600 mb-1">Applications</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
                <p className="text-xs text-blue-600 mt-1">+12 today</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
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
                <p className="text-sm text-gray-600 mb-1">Interviews</p>
                <p className="text-3xl font-bold text-gray-900">{stats.interviews}</p>
                <p className="text-xs text-orange-600 mt-1">3 scheduled</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
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
                <p className="text-sm text-gray-600 mb-1">Hires</p>
                <p className="text-3xl font-bold text-gray-900">{stats.hires}</p>
                <p className="text-xs text-green-600 mt-1">Great success!</p>
                    </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  </div>
                  </div>
        </motion.div>
      </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="dashboard-card-handshake p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-handshake text-xl">
                <Users className="w-6 h-6 text-primary mr-2" />
                      Recent Applications
              </h2>
              <Button className="btn-handshake btn-sm">
                View All Applications
                    </Button>
                  </div>

            <div className="space-y-4">
              {recentApplications.length > 0 ? (
                recentApplications.map((application, index) => (
                    <motion.div
                      key={application.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {application.candidateName}
                        </h3>
                          <Badge className={`${getStatusColor(application.status)}`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-primary font-medium mb-1">
                          {application.jobTitle}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {application.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {application.experience}
                      </div>
                        </div>
                        <p className="text-xs text-gray-400">
                          Applied {application.appliedDate}
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
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </div>
                      </div>
                    </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent applications found.</p>
                  <Button className="btn-handshake mt-4">
                    Post a Job
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
            {/* Active Jobs */}
          <div className="dashboard-card-handshake p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-handshake text-lg">
                <Briefcase className="w-5 h-5 text-primary mr-2" />
                Active Jobs
              </h3>
              <Button className="btn-handshake btn-sm">
                <Plus className="w-4 h-4 mr-1" />
                Post Job
                    </Button>
                  </div>

            <div className="space-y-4">
              {activeJobs.length > 0 ? (
                activeJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-3 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          {job.title}
                        </h4>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={`${getJobStatusColor(job.status)} text-xs`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{job.applications} applications</span>
                          <span>{job.views} views</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Posted {job.postedDate}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Briefcase className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No active jobs</p>
                      </div>
              )}
                      </div>
                    </div>

            {/* Quick Actions */}
          <div className="dashboard-card-handshake p-6">
            <h3 className="heading-handshake text-lg mb-4">
              <TrendingUp className="w-5 h-5 text-primary mr-2" />
                    Quick Actions
            </h3>
            <div className="space-y-3">
              <Button className="btn-handshake w-full">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
              <Button className="btn-secondary w-full">
                <Users className="w-4 h-4 mr-2" />
                Review Applications
              </Button>
              <Button className="btn-secondary w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interviews
              </Button>
                            </div>
                          </div>

          {/* Analytics Summary */}
          <div className="dashboard-card-handshake p-6">
            <h3 className="heading-handshake text-lg mb-4">
              <TrendingUp className="w-5 h-5 text-primary mr-2" />
              Analytics Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Application Rate</span>
                <span className="text-sm font-medium text-green-600">+12%</span>
                        </div>
                  <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time to Hire</span>
                <span className="text-sm font-medium text-blue-600">15 days</span>
                  </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Quality Score</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.2/5</span>
                          </div>
                        </div>
                      </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployerDashboard;
