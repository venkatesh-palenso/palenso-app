import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Layouts } from "@/layouts";
import {
  MapPin,
  Mail,
  Users,
  Globe,
  Award,
  TrendingUp,
  Handshake,
  GraduationCap,
  Building,
  Sparkles,
  Zap,
  Target,
  Star,
  Heart,
  Rocket,
  Shield,
  Lightbulb,
  Clock,
  Users2,
  Linkedin,
  CheckCircle,
  BookOpen,
  Briefcase,
  Trophy,
} from "lucide-react";

const stats = [
  {
    label: "Students",
    value: "1M+",
    icon: Users,
    color: "from-blue-500 to-purple-500",
  },
  {
    label: "Employers",
    value: "1000+",
    icon: Globe,
    color: "from-green-500 to-blue-500",
  },
  {
    label: "Jobs Shared",
    value: "10K+",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
  },
  {
    label: "Success Stories",
    value: "95%",
    icon: Award,
    color: "from-yellow-500 to-orange-500",
  },
];

const team = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Former Google engineer with 15+ years in tech. Passionate about democratizing career opportunities.",
    avatar: "AJ",
    linkedin: "#",
    achievements: ["Ex-Google", "15+ Years Tech", "Stanford MBA"],
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    bio: "Ex-Microsoft architect. Building scalable platforms that connect talent with opportunity.",
    avatar: "SC",
    linkedin: "#",
    achievements: ["Ex-Microsoft", "Cloud Expert", "AI Specialist"],
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Product",
    bio: "Product leader with experience at LinkedIn and Handshake. Focused on user experience.",
    avatar: "MR",
    linkedin: "#",
    achievements: ["Ex-LinkedIn", "UX Expert", "Growth Hacker"],
  },
  {
    name: "Emily Davis",
    role: "Head of Partnerships",
    bio: "Former university career counselor. Expert in student-employer relationships.",
    avatar: "ED",
    linkedin: "#",
    achievements: ["Career Counselor", "Partnerships", "Education"],
  },
];

const milestones = [
  {
    year: "2020",
    title: "Founded",
    description:
      "Palenso was founded with a mission to democratize career opportunities for students worldwide.",
    icon: <Rocket className="w-6 h-6" />,
    color: "from-blue-500 to-purple-500",
  },
  {
    year: "2021",
    title: "First 10K Students",
    description:
      "Reached our first milestone of 10,000 active students using the platform.",
    icon: <Users className="w-6 h-6" />,
    color: "from-green-500 to-blue-500",
  },
  {
    year: "2022",
    title: "100+ Companies",
    description:
      "Partnered with over 100 companies including Fortune 500 organizations.",
    icon: <Building className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
  },
  {
    year: "2023",
    title: "1M+ Students",
    description: "Celebrated reaching 1 million students across 50+ countries.",
    icon: <Globe className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description:
      "Expanding to new markets and launching advanced AI-powered matching.",
    icon: <Zap className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
  },
];

const achievements = [
  {
    title: "Best Career Platform 2024",
    description:
      "Awarded by TechCrunch for innovation in student-employer matching",
    icon: <Trophy className="w-8 h-8" />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "95% Student Success Rate",
    description: "Students find opportunities within 3 months of joining",
    icon: <Target className="w-8 h-8" />,
    color: "from-green-500 to-blue-500",
  },
  {
    title: "1000+ Partner Companies",
    description: "Including Fortune 500 and leading startups",
    icon: <Building className="w-8 h-8" />,
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "50+ Countries",
    description: "Global reach with localized career opportunities",
    icon: <Globe className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
  },
];

const services = [
  {
    title: "For Students",
    icon: <GraduationCap className="w-8 h-8" />,
    features: [
      "Job Matching",
      "Career Coaching",
      "Resume Builder",
      "Interview Prep",
      "Networking Events",
      "Skill Development",
    ],
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "For Employers",
    icon: <Building className="w-8 h-8" />,
    features: [
      "Talent Sourcing",
      "Job Posting",
      "Candidate Screening",
      "Interview Scheduling",
      "Analytics Dashboard",
      "Brand Building",
    ],
    color: "from-green-500 to-blue-500",
  },
  {
    title: "For Universities",
    icon: <BookOpen className="w-8 h-8" />,
    features: [
      "Career Center Tools",
      "Student Analytics",
      "Employer Partnerships",
      "Event Management",
      "Reporting",
      "Integration APIs",
    ],
    color: "from-orange-500 to-red-500",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen hero-handshake relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-40 left-0 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute -bottom-8 right-20 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
      />

      {/* Floating Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-32 left-10 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-white/20 animate-float"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-48 right-16 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-2xl backdrop-blur-sm border border-white/20 animate-float animation-delay-2000"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-32 left-20 w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-white/20 animate-float animation-delay-4000"
      />

      <div className="max-w-5xl mx-auto px-6 py-20 space-y-16 relative z-10">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <Badge className="badge-handshake mb-3 px-4 py-2 text-sm">
            About Palenso
          </Badge>
          <div className="flex items-center justify-center mb-6">
            {/* New Logo Design */}
            <div className="relative mr-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Handshake className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full shadow-lg animate-pulse"></div>
            </div>
            <div className="text-left">
              <h1 className="heading-handshake-large text-left">
                Palenso&apos;s mission is to democratize access to opportunity
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Trusted by 1M+ students
                </span>
              </div>
            </div>
          </div>
          <p className="heading-handshake-subtitle text-left max-w-3xl">
            Palenso is the career platform for Gen Z. With a community of 1M
            students, alumni, employers, and career educators, Palenso&apos;s
            network is where career advice and discovery turn into first,
            second, and third jobs.
            <span className="text-primary font-semibold"> 1000+ </span>
            companies use Palenso to build their future workforce—from Fortune
            500 to federal agencies, school districts to startups, healthcare
            systems to small businesses. Palenso is built for where you&apos;re
            going, not where you&apos;ve been.
          </p>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="feature-card-handshake text-center bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-500 group-hover:shadow-2xl">
                <div className="py-6">
                  <motion.div
                    className={`p-3 bg-gradient-to-br ${stat.color} rounded-full w-fit mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          className="space-y-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="feature-card-handshake bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-200 p-8 hover:scale-105 transition-all duration-500 group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-primary mr-3" />
                <h2 className="heading-handshake text-2xl">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to career opportunities by connecting
                students with employers worldwide. We believe every student
                deserves access to meaningful work experiences that launch their
                careers.
              </p>
            </motion.div>

            <motion.div
              className="feature-card-handshake bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-200 p-8 hover:scale-105 transition-all duration-500 group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <Rocket className="w-8 h-8 text-primary mr-3" />
                <h2 className="heading-handshake text-2xl">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A world where every student can discover and pursue their dream
                career, regardless of their background, location, or network. We
                envision a future where talent meets opportunity seamlessly.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Company History */}
        <motion.section
          className="space-y-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-primary mr-3" />
              <h2 className="heading-handshake text-3xl">Our Journey</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a small startup to a global platform, here&apos;s how
              we&apos;ve grown over the years
            </p>
          </div>

          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="flex-1">
                  <div className="feature-card-handshake p-6 hover:scale-105 transition-all duration-500 group">
                    <div className="flex items-center mb-3">
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-br ${milestone.color} rounded-full flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {milestone.year}
                      </motion.div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 bg-gradient-to-br ${milestone.color} rounded-lg`}
                        >
                          {milestone.icon}
                        </div>
                        <h3 className="heading-handshake text-xl">
                          {milestone.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                {index < milestones.length - 1 && (
                  <div className="hidden md:block w-px h-16 bg-gradient-to-b from-primary to-transparent mx-4" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          className="space-y-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-primary mr-3" />
              <h2 className="heading-handshake text-3xl">Our Achievements</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Milestones and recognition that drive us forward
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className={`feature-card-handshake text-center bg-gradient-to-br ${achievement.color} border border-white/20 hover:scale-105 transition-all duration-500 group-hover:shadow-2xl`}
                >
                  <div className="p-6">
                    <motion.div
                      className="p-3 bg-white/50 rounded-full w-fit mx-auto mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {achievement.icon}
                    </motion.div>
                    <h3 className="heading-handshake text-lg mb-3">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          className="space-y-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8 text-primary mr-3" />
              <h2 className="heading-handshake text-3xl">Our Services</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for students, employers, and universities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className={`feature-card-handshake h-full bg-gradient-to-br ${service.color} border border-white/20 hover:scale-105 transition-all duration-500 group-hover:shadow-2xl`}
                >
                  <div className="p-6">
                    <motion.div
                      className="p-3 bg-white/50 rounded-full w-fit mx-auto mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="heading-handshake text-xl mb-4 text-center">
                      {service.title}
                    </h3>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="space-y-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-8">
              <Zap className="w-8 h-8 text-primary mr-3" />
              <h2 className="heading-handshake text-3xl text-center">
                Our Values
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Empathy",
                  description:
                    "We understand the challenges students face and design solutions with compassion.",
                  color: "from-red-500/10 to-pink-500/10",
                  border: "border-red-200",
                },
                {
                  icon: <Rocket className="w-8 h-8" />,
                  title: "Innovation",
                  description:
                    "We constantly push boundaries to create cutting-edge career solutions.",
                  color: "from-blue-500/10 to-purple-500/10",
                  border: "border-blue-200",
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Trust",
                  description:
                    "We build secure, reliable platforms that students and employers can depend on.",
                  color: "from-green-500/10 to-blue-500/10",
                  border: "border-green-200",
                },
                {
                  icon: <Lightbulb className="w-8 h-8" />,
                  title: "Growth",
                  description:
                    "We believe in continuous learning and helping everyone reach their potential.",
                  color: "from-yellow-500/10 to-orange-500/10",
                  border: "border-yellow-200",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div
                    className={`feature-card-handshake text-center bg-gradient-to-br ${value.color} ${value.border} hover:scale-105 transition-all duration-500 group-hover:shadow-2xl`}
                  >
                    <div className="p-6">
                      <motion.div
                        className="p-3 bg-white/50 rounded-full w-fit mx-auto mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {value.icon}
                      </motion.div>
                      <h3 className="heading-handshake text-xl mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="space-y-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Users2 className="w-8 h-8 text-primary mr-3" />
              <h2 className="heading-handshake text-3xl">Meet Our Team</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind Palenso who are dedicated to
              transforming career opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="feature-card-handshake text-center bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-500 group-hover:shadow-2xl">
                  <div className="p-6">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {member.avatar}
                    </motion.div>
                    <h3 className="heading-handshake text-lg mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      {member.bio}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-1 mb-4">
                      {member.achievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full inline-block mr-1 mb-1"
                        >
                          {achievement}
                        </div>
                      ))}
                    </div>

                    <a
                      href={member.linkedin}
                      className="text-primary hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 mx-auto" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Audience Description */}
        <motion.section
          className="space-y-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-8">
              <Target className="w-8 h-8 text-primary mr-3" />
              <h2 className="heading-handshake text-3xl text-center">
                Who We Serve
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="feature-card-handshake text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-200 hover:scale-105 transition-all duration-500 group-hover:shadow-2xl">
                  <div className="p-6">
                    <motion.div
                      className="p-3 bg-white/50 rounded-full w-fit mx-auto mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <GraduationCap className="w-12 h-12 text-primary" />
                    </motion.div>
                    <h3 className="heading-handshake text-xl mb-3">Students</h3>
                    <p className="text-muted-foreground mb-4">
                      The best place for jobs, career guidance, and community
                      for 1M+ students.
                    </p>
                    <div className="flex items-center justify-center text-primary">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">
                        Student-First Design
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="feature-card-handshake text-center bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-200 hover:scale-105 transition-all duration-500 group-hover:shadow-2xl">
                  <div className="p-6">
                    <motion.div
                      className="p-3 bg-white/50 rounded-full w-fit mx-auto mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Building className="w-12 h-12 text-primary" />
                    </motion.div>
                    <h3 className="heading-handshake text-xl mb-3">
                      Employers
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Almost 1000 employers of all sizes find qualified talent
                      fast on Palenso.
                    </p>
                    <Button className="btn-handshake text-sm group">
                      <span className="group-hover:scale-105 transition-transform duration-200">
                        Hire top talent →
                      </span>
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="feature-card-handshake text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-200 hover:scale-105 transition-all duration-500 group-hover:shadow-2xl">
                  <div className="p-6">
                    <motion.div
                      className="p-3 bg-white/50 rounded-full w-fit mx-auto mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Handshake className="w-12 h-12 text-primary" />
                    </motion.div>
                    <h3 className="heading-handshake text-xl mb-3">
                      Career Centers
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      The #1 college-to-career network for 1,500+ colleges and
                      institutions.
                    </p>
                    <div className="flex items-center justify-center text-primary">
                      <Award className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">
                        Trusted Partner
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="space-y-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-8">
            <Mail className="w-8 h-8 text-primary mr-3" />
            <h2 className="heading-handshake text-3xl">Get in Touch</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <motion.div
              className="feature-card-handshake bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-200 hover:scale-105 transition-all duration-500 group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <motion.div
                  className="p-3 bg-white/50 rounded-full w-fit mx-auto mb-3 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground">hello@palenso.com</p>
              </div>
            </motion.div>
            <motion.div
              className="feature-card-handshake bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-200 hover:scale-105 transition-all duration-500 group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <motion.div
                  className="p-3 bg-white/50 rounded-full w-fit mx-auto mb-3 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <MapPin className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-semibold mb-2">Visit Us</h3>
                <p className="text-muted-foreground">
                  Palenso, 5th street,Kakateeya Hills,Madhapur,Hyderabad
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

AboutUs.getLayout = Layouts.Public;
