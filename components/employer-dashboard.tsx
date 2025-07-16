'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Star, 
  ArrowRight, 
  Award,
  Sparkles,
  Eye,
  Share2,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  {
    title: "Active Jobs",
    value: "8",
    change: "+2 this week",
    icon: <Briefcase className="w-5 h-5" />,
    color: "from-primary-500 to-primary-600"
  },
  {
    title: "Total Applications",
    value: "156",
    change: "+23 this week",
    icon: <Users className="w-5 h-5" />,
    color: "from-accent-500 to-accent-600"
  },
  {
    title: "Interviews Scheduled",
    value: "12",
    change: "+5 this week",
    icon: <Calendar className="w-5 h-5" />,
    color: "from-success-500 to-success-600"
  },
  {
    title: "Hires This Month",
    value: "3",
    change: "+1 this week",
    icon: <Award className="w-5 h-5" />,
    color: "from-warning-500 to-warning-600"
  }
];

const recentApplications = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Senior Frontend Developer",
    status: "Under Review",
    date: "2 hours ago",
    avatar: "SJ",
    experience: "5 years",
    match: "95%",
    color: "from-primary-500 to-primary-600"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager",
    status: "Interview Scheduled",
    date: "1 day ago",
    avatar: "MC",
    experience: "7 years",
    match: "92%",
    color: "from-accent-500 to-accent-600"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Data Scientist",
    status: "Shortlisted",
    date: "2 days ago",
    avatar: "ER",
    experience: "4 years",
    match: "88%",
    color: "from-success-500 to-success-600"
  }
];

const activeJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    applications: 24,
    views: 156,
    status: "Active",
    posted: "3 days ago",
    salary: "$120k - $150k",
    location: "San Francisco, CA",
    color: "from-primary-500 to-primary-600"
  },
  {
    id: 2,
    title: "Product Manager",
    applications: 18,
    views: 89,
    status: "Active",
    posted: "1 week ago",
    salary: "$100k - $130k",
    location: "Remote",
    color: "from-accent-500 to-accent-600"
  },
  {
    id: 3,
    title: "Data Scientist",
    applications: 32,
    views: 203,
    status: "Active",
    posted: "2 weeks ago",
    salary: "$110k - $140k",
    location: "New York, NY",
    color: "from-success-500 to-success-600"
  }
];

const upcomingInterviews = [
  {
    id: 1,
    candidate: "Sarah Johnson",
    position: "Senior Frontend Developer",
    date: "March 15, 2024",
    time: "10:00 AM",
    type: "Technical",
    interviewer: "John Smith",
    color: "from-primary-500 to-accent-500"
  },
  {
    id: 2,
    candidate: "Michael Chen",
    position: "Product Manager",
    date: "March 16, 2024",
    time: "2:00 PM",
    type: "Behavioral",
    interviewer: "Lisa Wang",
    color: "from-success-500 to-warning-500"
  },
  {
    id: 3,
    candidate: "Emily Rodriguez",
    position: "Data Scientist",
    date: "March 17, 2024",
    time: "11:00 AM",
    type: "Technical",
    interviewer: "David Kim",
    color: "from-accent-500 to-error-500"
  }
];

const quickActions = [
  {
    title: "Post New Job",
    description: "Create a new job listing",
    icon: <Briefcase className="w-6 h-6" />,
    href: "/post-job",
    color: "from-primary-500 to-primary-600"
  },
  {
    title: "View Applications",
    description: "Review candidate applications",
    icon: <Users className="w-6 h-6" />,
    href: "/applications",
    color: "from-accent-500 to-accent-600"
  },
  {
    title: "Schedule Interviews",
    description: "Set up candidate interviews",
    icon: <Calendar className="w-6 h-6" />,
    href: "/interviews",
    color: "from-success-500 to-success-600"
  },
  {
    title: "Analytics",
    description: "View hiring insights",
    icon: <TrendingUp className="w-6 h-6" />,
    href: "/analytics",
    color: "from-warning-500 to-warning-600"
  }
];

export default function EmployerDashboard() {
  return (
    <div className="min-h-screen bg-dashboard-shiny p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-banner-vibrant">
              Welcome back, TechCorp! 🚀
            </h1>
            <p className="text-xl text-banner-glow mt-2">
              Here&apos;s your hiring dashboard overview
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="lg">
              <Share2 className="w-4 h-4 mr-2" />
              Share Company
            </Button>
            <Button variant="default" size="lg" className="btn-primary-shiny">
              <Sparkles className="w-4 h-4 mr-2" />
              Post Job
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
              <Card className="card-modern group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} text-white rounded-xl shadow-lg group-hover:glow-primary transition-all duration-300`}>
                      {stat.icon}
                    </div>
                    <TrendingUp className="w-5 h-5 text-success-500" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{stat.title}</div>
                  <div className="text-xs text-success-600 font-medium">{stat.change}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Applications */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="card-modern">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">Recent Applications</CardTitle>
                    <Button variant="ghost" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentApplications.map((application, index) => (
                    <motion.div
                      key={application.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-muted/50 to-white border border-border/50 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${application.color} text-white rounded-xl flex items-center justify-center font-semibold text-lg shadow-lg group-hover:glow-primary transition-all duration-300`}>
                        {application.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary-500 transition-colors">
                          {application.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{application.position}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {application.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{application.experience} exp</span>
                          <span className="text-xs text-success-600 font-medium">{application.match} match</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-2">{application.date}</div>
                        <Button size="sm" variant="default" className="btn-primary-shiny">
                          Review
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Active Jobs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="card-modern">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">Active Job Listings</CardTitle>
                    <Button variant="ghost" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-muted/50 to-white border border-border/50 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${job.color} text-white rounded-xl flex items-center justify-center shadow-lg group-hover:glow-primary transition-all duration-300`}>
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary-500 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{job.location}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            {job.applications} applications
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="w-3 h-3" />
                            {job.views} views
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {job.salary}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-2">{job.posted}</div>
                        <Button size="sm" variant="default" className="btn-primary-shiny">
                          Manage
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Company Profile */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Company Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                        TC
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">TechCorp Solutions</h3>
                        <p className="text-sm text-muted-foreground">Technology • 500-1000 employees</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-warning-400 fill-current" />
                          <span className="text-sm font-medium">4.8</span>
                          <span className="text-sm text-muted-foreground">(156 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Profile Completion</span>
                        <span className="font-semibold text-primary-600">92%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
                          style={{ width: '92%' }}
                        />
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    >
                      <Link href={action.href}>
                        <div className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${action.color} text-white hover:shadow-lg transition-all duration-300 group cursor-pointer`}>
                          <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-all duration-300">
                            {action.icon}
                          </div>
                          <div>
                            <div className="font-semibold">{action.title}</div>
                            <div className="text-sm text-white/80">{action.description}</div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Interviews */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="card-modern">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">Upcoming Interviews</CardTitle>
                    <Button variant="ghost" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingInterviews.map((interview, index) => (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                      className="p-4 rounded-xl bg-gradient-to-r from-muted/50 to-white border border-border/50 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${interview.color} mt-2`} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary-500 transition-colors">
                            {interview.candidate}
                          </h3>
                          <p className="text-sm text-muted-foreground">{interview.position}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {interview.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{interview.date} at {interview.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Interviewer: {interview.interviewer}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
