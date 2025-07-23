// react
import React from "react";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import {
  Briefcase,
  GraduationCap,
  Star,
  Users,
  Calendar,
  MapPin,
  Eye,
  Bookmark,
  CheckCircle,
  Clock,
  Sparkles,
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
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="heading-handshake-large text-4xl mb-4">
                  Welcome back, Student! 👋
                </h1>
                <p className="heading-handshake-subtitle text-xl max-w-2xl mx-auto">
                  Ready to take the next step in your career? Discover
                  opportunities, track your applications, and connect with
                  employers.
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
                      Applications
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.applications}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +2 this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
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
                      Interviews
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.interviews}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      +1 this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
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
                    <p className="text-sm text-muted-foreground mb-1">Offers</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.offers}
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      New offer!
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
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
                    <p className="text-sm text-muted-foreground mb-1">
                      Saved Jobs
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.savedJobs}
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      +3 this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Bookmark className="w-6 h-6 text-white" />
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
            {/* Recent Jobs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="feature-card-handshake p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-handshake text-xl">
                    Recent Job Opportunities
                  </h2>
                  <Button variant="outline" className="btn-secondary btn-sm">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentJobs.length > 0 ? (
                    recentJobs.map((job, index) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {job.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {job.company}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{job.postedDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge className="badge-handshake text-xs">
                              {job.type}
                            </Badge>
                            {job.isSaved && (
                              <Bookmark className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            )}
                          </div>
                        </div>
                        {job.salary && (
                          <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-2">
                            {job.salary}
                          </p>
                        )}
                        <div className="flex gap-2 mt-3">
                          <Button className="btn-handshake btn-sm">
                            {job.isApplied ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Applied
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3 mr-1" />
                                View Job
                              </>
                            )}
                          </Button>
                          {!job.isSaved && (
                            <Button
                              variant="outline"
                              className="btn-secondary btn-sm"
                            >
                              <Bookmark className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-muted-foreground">
                        No recent jobs found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="feature-card-handshake p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-handshake text-xl">Upcoming Events</h2>
                  <Button variant="outline" className="btn-secondary btn-sm">
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
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                        className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {event.title}
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{event.time}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="badge-handshake text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button className="btn-handshake btn-sm">
                            <Eye className="w-3 h-3 mr-1" />
                            View Event
                          </Button>
                          <Button
                            variant="outline"
                            className="btn-secondary btn-sm"
                          >
                            Register
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-muted-foreground">
                        No upcoming events
                      </p>
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

export default StudentDashboard;
