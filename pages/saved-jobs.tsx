// react
import React, { useState } from "react";

// next
import Link from "next/link";

// framer motion
import { motion } from "framer-motion";

// lucide icons
import {
  Briefcase,
  Heart,
  MapPin,
  Building,
  Clock,
  DollarSign,
  Search,
  Filter,
  Eye,
  Trash2,
  Bookmark,
} from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// layout
import { Layouts } from "@/layouts";

const SavedJobsPage = () => {
  const [savedJobs] = useState([
    {
      id: "1",
      jobTitle: "Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$80,000 - $120,000",
      type: "Full-time",
      savedDate: "2024-01-15",
      description:
        "We are looking for a talented Frontend Developer to join our team...",
    },
    {
      id: "2",
      jobTitle: "Software Engineer",
      company: "InnovateTech",
      location: "Remote",
      salary: "$90,000 - $130,000",
      type: "Full-time",
      savedDate: "2024-01-10",
      description: "Join our growing team as a Software Engineer...",
    },
    {
      id: "3",
      jobTitle: "React Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      salary: "$70,000 - $100,000",
      type: "Full-time",
      savedDate: "2024-01-08",
      description: "Exciting opportunity for a React Developer...",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Saved Jobs
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Your bookmarked job opportunities
                </p>
              </div>
              <Link href="/jobs">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Browse Jobs
                  <Briefcase className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Search and Filter */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search saved jobs..."
                        className="pl-10 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl"
                      />
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Saved Jobs List */}
            <div className="space-y-6">
              {savedJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {job.jobTitle}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                                <div className="flex items-center gap-1">
                                  <Building className="h-4 w-4" />
                                  {job.company}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {job.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {job.type}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                {job.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  {job.salary}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400">
                                  Saved on{" "}
                                  {new Date(job.savedDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                              <Heart className="mr-1 h-3 w-3" />
                              Saved
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Job
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            Apply Now
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {savedJobs.length === 0 && (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl">
                <CardContent className="p-12 text-center">
                  <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Saved Jobs Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Save interesting jobs to view them later
                  </p>
                  <Link href="/jobs">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Browse Jobs
                      <Briefcase className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

SavedJobsPage.getLayout = Layouts.Student;

export default SavedJobsPage;
