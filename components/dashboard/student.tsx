// react
import React from "react";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import {
  Briefcase,
  GraduationCap,
  Star,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  Building,
  Eye,
  Bookmark,
  CheckCircle,
  Clock,
} from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StudentDashboardProps {
  stats?: {
    applications: number;
    interviews: number;
    offers: number;
    savedJobs: number;
  };
  recentJobs?: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    postedDate: string;
    salary?: string;
    isSaved?: boolean;
    isApplied?: boolean;
  }>;
  upcomingEvents?: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    type: string;
  }>;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({
  stats = {
    applications: 12,
    interviews: 3,
    offers: 1,
    savedJobs: 8,
  },
  recentJobs = [],
  upcomingEvents = [],
}) => {
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
            Welcome back, Student! 👋
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to take the next step in your career? Discover opportunities, 
            track your applications, and connect with employers.
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
                <p className="text-sm text-gray-600 mb-1">Applications</p>
                <p className="text-3xl font-bold text-gray-900">{stats.applications}</p>
                <p className="text-xs text-green-600 mt-1">+2 this week</p>
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
                <p className="text-sm text-gray-600 mb-1">Interviews</p>
                <p className="text-3xl font-bold text-gray-900">{stats.interviews}</p>
                <p className="text-xs text-blue-600 mt-1">1 scheduled</p>
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
                <p className="text-sm text-gray-600 mb-1">Offers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.offers}</p>
                <p className="text-xs text-green-600 mt-1">Congratulations!</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
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
                <p className="text-sm text-gray-600 mb-1">Saved Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.savedJobs}</p>
                <p className="text-xs text-orange-600 mt-1">3 new matches</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Jobs */}
        <div className="lg:col-span-2">
          <div className="dashboard-card-handshake p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-handshake text-xl">
                <Briefcase className="w-6 h-6 text-primary mr-2" />
                Recent Job Opportunities
              </h2>
              <Button className="btn-handshake btn-sm">
                View All Jobs
              </Button>
            </div>

            <div className="space-y-4">
              {recentJobs.length > 0 ? (
                recentJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {job.title}
                          </h3>
                          {job.isApplied && (
                            <Badge className="badge-handshake">Applied</Badge>
                          )}
                        </div>
                        <p className="text-primary font-medium mb-1">
                          {job.company}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </div>
                        </div>
                        {job.salary && (
                          <p className="text-sm text-gray-600 mb-2">
                            💰 {job.salary}
                          </p>
                        )}
                        <p className="text-xs text-gray-400">
                          Posted {job.postedDate}
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
                          className={`btn-secondary btn-sm ${
                            job.isSaved ? "text-primary" : ""
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent jobs found.</p>
                  <Button className="btn-handshake mt-4">
                    Browse Jobs
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="dashboard-card-handshake p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-handshake text-lg">
                <Calendar className="w-5 h-5 text-primary mr-2" />
                Upcoming Events
              </h3>
              <Button className="btn-handshake btn-sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-3 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          {event.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">
                          {event.date} at {event.time}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No upcoming events</p>
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
                <Briefcase className="w-4 h-4 mr-2" />
                Browse Jobs
              </Button>
              <Button className="btn-secondary w-full">
                <GraduationCap className="w-4 h-4 mr-2" />
                Career Resources
              </Button>
              <Button className="btn-secondary w-full">
                <Users className="w-4 h-4 mr-2" />
                Networking Events
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;
