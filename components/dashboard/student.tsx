import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Calendar,
  Users,
  TrendingUp,
  BookOpen,
  Award,
  MapPin,
  Clock,
  DollarSign,
  Star,
} from "lucide-react";
import { useUser } from "@/context";

const StudentDashboard: React.FC = () => {
  const { user } = useUser();
  const recentJobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Internship",
      salary: "$25-35/hr",
      posted: "2 days ago",
      skills: ["React", "TypeScript", "CSS"],
      rating: 4.5,
    },
    {
      id: 2,
      title: "Data Science Analyst",
      company: "DataFlow Inc",
      location: "Remote",
      type: "Full-time",
      salary: "$60-80k",
      posted: "1 week ago",
      skills: ["Python", "SQL", "Machine Learning"],
      rating: 4.8,
    },
    {
      id: 3,
      title: "UX Design Assistant",
      company: "Creative Studios",
      location: "New York, NY",
      type: "Part-time",
      salary: "$20-30/hr",
      posted: "3 days ago",
      skills: ["Figma", "Adobe XD", "User Research"],
      rating: 4.2,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Career Fair 2024",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Convention Center",
      attendees: 150,
      type: "Career Fair",
    },
    {
      id: 2,
      title: "React Workshop",
      date: "March 20, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Online",
      attendees: 75,
      type: "Workshop",
    },
    {
      id: 3,
      title: "Networking Mixer",
      date: "March 25, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Downtown Hub",
      attendees: 50,
      type: "Networking",
    },
  ];

  const skills = [
    { name: "JavaScript", level: 85, color: "primary" },
    { name: "React", level: 78, color: "accent" },
    { name: "Python", level: 72, color: "success" },
    { name: "UI/UX Design", level: 65, color: "warning" },
    { name: "Data Analysis", level: 58, color: "error" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-banner-vibrant mb-2">
          Welcome back, {user?.first_name} {user?.last_name}! 👋
        </h1>
        <p className="text-banner-glow text-lg">
          Here&apos;s what&apos;s happening with your career journey today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card className="card-ultra-shiny glow-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Applications
                </p>
                <p className="text-2xl font-bold text-glow-primary">24</p>
              </div>
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center animate-bounce-glow">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-ultra-shiny glow-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Interviews
                </p>
                <p className="text-2xl font-bold text-glow-accent">8</p>
              </div>
              <div
                className="w-12 h-12 bg-gradient-accent rounded-2xl flex items-center justify-center animate-bounce-glow"
                style={{ animationDelay: "0.5s" }}
              >
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-ultra-shiny glow-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Events
                </p>
                <p className="text-2xl font-bold text-glow-success">12</p>
              </div>
              <div
                className="w-12 h-12 bg-gradient-success rounded-2xl flex items-center justify-center animate-bounce-glow"
                style={{ animationDelay: "1s" }}
              >
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-ultra-shiny glow-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Skills
                </p>
                <p className="text-2xl font-bold text-glow-warning">15</p>
              </div>
              <div
                className="w-12 h-12 bg-gradient-warning rounded-2xl flex items-center justify-center animate-bounce-glow"
                style={{ animationDelay: "1.5s" }}
              >
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Job Opportunities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="card-ultra-shiny">
            <CardHeader>
              <CardTitle className="text-glow-primary">
                Recent Job Opportunities
              </CardTitle>
              <CardDescription>
                Jobs that match your profile and interests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="p-4 rounded-2xl border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-glow-primary group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary-500 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-warning-400 text-warning-400" />
                      <span className="text-sm font-medium">{job.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.posted}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="badge-accent-shiny">
                        {job.type}
                      </Badge>
                      {job.skills.slice(0, 2).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="group-hover:bg-primary-500 group-hover:text-white transition-all"
                    >
                      Apply
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Upcoming Events */}
          <Card className="card-ultra-shiny glow-accent">
            <CardHeader>
              <CardTitle className="text-glow-accent">
                Upcoming Events
              </CardTitle>
              <CardDescription>
                Don&apos;t miss these opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="p-3 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {event.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>{event.time}</p>
                    <p>{event.location}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                      <span className="text-xs">
                        {event.attendees} attending
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Skills Progress */}
          <Card className="card-ultra-shiny glow-success">
            <CardHeader>
              <CardTitle className="text-glow-success">
                Skills Progress
              </CardTitle>
              <CardDescription>Your current skill levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="progress-ultra-shiny h-2">
                    <div
                      className="progress-fill"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-ultra-shiny glow-warning">
            <CardHeader>
              <CardTitle className="text-glow-warning">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full btn-primary-shiny">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Courses
              </Button>
              <Button variant="outline" className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Network
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
