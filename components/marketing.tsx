// react
import React from "react";

// next
import Link from "next/link";

// framer-motion
import { motion, useScroll, useTransform } from "framer-motion";

// lucide icons
import {
  ArrowRight,
  Users,
  Building,
  Calendar,
  Briefcase,
  Handshake,
  GraduationCap,
  Globe,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  Award,
  Star,
  CheckCircle,
  Play,
  Quote,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Search,
  Clock,
  BookOpen,
  FileText,
  MessageSquare,
} from "lucide-react";

// components
import { Button } from "@/components/ui/button";

// context
import { useUser } from "@/context";

const Marketing: React.FC = () => {
  const { user, isLoggedIn } = useUser();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="hero-handshake relative pt-8 pb-32 px-4 overflow-hidden">
        {/* Enhanced Background Elements */}
        <motion.div
          style={{ y }}
          className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        />
        <motion.div
          style={{ y }}
          className="absolute top-40 left-0 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-orange-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        />
        <motion.div
          style={{ y }}
          className="absolute -bottom-8 right-20 w-96 h-96 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
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

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
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
                    Where Talent Meets
                    <br />
                    <span className="text-primary">Opportunity</span>
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
                Palenso is the premier career platform connecting students with
                employers. Discover opportunities, explore companies, and launch
                your career journey with confidence. Join over 1M+ students and
                1000+ companies already using Palenso.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              {isLoggedIn ? (
                <>
                  <div className="flex flex-col gap-4">
                    <h2 className="heading-handshake text-2xl">
                      Welcome back, {user?.first_name}!
                    </h2>
                    <div className="flex flex-row gap-4">
                      <Link href="/profile">
                        <Button className="btn-handshake text-lg px-8 py-4">
                          View Profile
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href="/dashboard">
                        <Button
                          variant="outline"
                          size="lg"
                          className="text-lg px-8 py-4 border-2 border-primary hover:bg-primary transition-all duration-300 cursor-pointer"
                        >
                          View Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/signup">
                    <Button className="btn-handshake text-lg px-8 py-4 group">
                      <span className="group-hover:scale-105 transition-transform duration-200">
                        Get Started Free
                      </span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 py-4 border-2 border-primary hover:bg-primary transition-all duration-300 cursor-pointer group"
                    >
                      <span className="group-hover:scale-105 transition-transform duration-200">
                        Sign In
                      </span>
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free for students</span>
              </div>
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Trusted by 1000+ companies</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-primary mr-3" />
              <h2 className="heading-handshake text-4xl mb-4">
                How Palenso Works
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description:
                  "Build a professional profile showcasing your skills, experience, and career goals. Upload your resume and portfolio to stand out.",
                icon: <Users className="w-12 h-12 text-primary" />,
                gradient: "from-blue-500/10 to-purple-500/10",
                border: "border-blue-200",
                features: [
                  "Professional Profile",
                  "Resume Upload",
                  "Portfolio Showcase",
                  "Skill Tags",
                ],
                time: "5 minutes",
              },
              {
                step: "02",
                title: "Discover Opportunities",
                description:
                  "Browse thousands of jobs, internships, and career events. Filter by location, industry, and your interests to find perfect matches.",
                icon: <Search className="w-12 h-12 text-primary" />,
                gradient: "from-green-500/10 to-blue-500/10",
                border: "border-green-200",
                features: [
                  "Smart Matching",
                  "Advanced Filters",
                  "Real-time Updates",
                  "AI Recommendations",
                ],
                time: "Instant",
              },
              {
                step: "03",
                title: "Connect & Apply",
                description:
                  "Apply directly to opportunities, connect with employers, and attend networking events. Get hired faster with our streamlined process.",
                icon: <Handshake className="w-12 h-12 text-primary" />,
                gradient: "from-orange-500/10 to-red-500/10",
                border: "border-orange-200",
                features: [
                  "One-Click Apply",
                  "Direct Messaging",
                  "Interview Prep",
                  "Career Coaching",
                ],
                time: "2 minutes",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div
                  className={`feature-card-handshake h-full bg-gradient-to-br ${item.gradient} ${item.border} hover:scale-105 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20`}
                >
                  <div className="text-center p-6">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <motion.div
                        className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.step}
                      </motion.div>
                    </div>
                    <div className="mb-4 flex justify-center mt-4">
                      <motion.div
                        className="p-3 bg-white/50 rounded-full backdrop-blur-sm group-hover:bg-white/70 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                    <h3 className="heading-handshake text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-4">
                      {item.features.map((feature, idx) => (
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

                    {/* Time Indicator */}
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-primary mr-3" />
              <h2 className="heading-handshake text-4xl mb-4">
                Why Choose Palenso?
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The ultimate platform for career growth and talent acquisition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="w-12 h-12 text-primary" />,
                title: "Student Success",
                description:
                  "Find internships, jobs, and career opportunities tailored to your skills and interests. Get personalized recommendations and career guidance.",
                gradient: "from-blue-500/10 to-purple-500/10",
                border: "border-blue-200",
                stats: "95% success rate",
              },
              {
                icon: <Building className="w-12 h-12 text-primary" />,
                title: "Employer Solutions",
                description:
                  "Connect with top talent through job postings, events, and direct recruitment. Access a diverse pool of qualified candidates.",
                gradient: "from-green-500/10 to-blue-500/10",
                border: "border-green-200",
                stats: "1000+ companies",
              },
              {
                icon: <Calendar className="w-12 h-12 text-primary" />,
                title: "Career Events",
                description:
                  "Attend workshops, career fairs, and networking events to grow your professional network. Learn from industry experts.",
                gradient: "from-orange-500/10 to-red-500/10",
                border: "border-orange-200",
                stats: "500+ events yearly",
              },
              {
                icon: <Globe className="w-12 h-12 text-primary" />,
                title: "Global Reach",
                description:
                  "Access opportunities from companies worldwide and expand your career horizons. Connect with international employers.",
                gradient: "from-purple-500/10 to-pink-500/10",
                border: "border-purple-200",
                stats: "50+ countries",
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-primary" />,
                title: "Career Growth",
                description:
                  "Track your progress, build your portfolio, and advance your career with confidence. Get insights and analytics.",
                gradient: "from-yellow-500/10 to-orange-500/10",
                border: "border-yellow-200",
                stats: "3x faster hiring",
              },
              {
                icon: <Handshake className="w-12 h-12 text-primary" />,
                title: "Direct Connection",
                description:
                  "Connect directly with employers and build meaningful professional relationships. Skip the middleman.",
                gradient: "from-pink-500/10 to-red-500/10",
                border: "border-pink-200",
                stats: "Zero commission",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className={`feature-card-handshake h-full bg-gradient-to-br ${feature.gradient} ${feature.border} hover:scale-105 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20`}
                >
                  <div className="text-center p-6">
                    <div className="mb-4 flex justify-center">
                      <motion.div
                        className="p-3 bg-white/50 rounded-full backdrop-blur-sm group-hover:bg-white/70 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {feature.icon}
                      </motion.div>
                    </div>
                    <h3 className="heading-handshake text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="text-sm font-semibold text-primary">
                      {feature.stats}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <Quote className="w-8 h-8 text-primary mr-3" />
              <h2 className="heading-handshake text-4xl mb-4">
                What Our Users Say
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from students and employers who found success with
              Palenso
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Computer Science Student",
                company: "Stanford University",
                content:
                  "Palenso helped me land my dream internship at Google. The platform made it so easy to connect with recruiters and showcase my skills.",
                avatar: "SJ",
                rating: 5,
                achievement: "Google Internship",
              },
              {
                name: "Michael Chen",
                role: "HR Manager",
                company: "TechCorp Inc.",
                content:
                  "We've hired over 50 amazing interns through Palenso. The quality of candidates and the streamlined hiring process is incredible.",
                avatar: "MC",
                rating: 5,
                achievement: "50+ Hires",
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Graduate",
                company: "University of Texas",
                content:
                  "I found my first job within 2 weeks of graduating thanks to Palenso. The career events and networking opportunities were game-changing.",
                avatar: "ER",
                rating: 5,
                achievement: "Job in 2 weeks",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="feature-card-handshake h-full bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-500 group-hover:shadow-2xl">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic mb-4">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      {testimonial.achievement}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900/20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%230057ff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted by Thousands
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the growing community of students and employers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "10K+",
                label: "Active Students",
                icon: <Users className="w-8 h-8" />,
                color: "from-blue-500 to-blue-600",
              },
              {
                number: "500+",
                label: "Partner Companies",
                icon: <Building className="w-8 h-8" />,
                color: "from-purple-500 to-purple-600",
              },
              {
                number: "5K+",
                label: "Jobs Posted",
                icon: <Briefcase className="w-8 h-8" />,
                color: "from-green-500 to-green-600",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="mb-4 flex justify-center">
                  <motion.div
                    className={`p-4 bg-gradient-to-br ${stat.color} rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 text-white`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>
                </div>
                <motion.div
                  className="text-4xl font-bold mb-2 text-gray-900 dark:text-white"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Success Stories
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from students and employers using Palenso
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "95%",
                subtitle: "Success Rate",
                description: "Students find opportunities within 3 months",
              },
              {
                title: "3x",
                subtitle: "Faster Hiring",
                description: "Employers hire faster with Palenso",
              },
              {
                title: "50+",
                subtitle: "Countries",
                description: "Global reach with local opportunities",
              },
              {
                title: "24/7",
                subtitle: "Support",
                description: "Round-the-clock career assistance",
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="feature-card-handshake p-6 hover:scale-105 transition-all duration-500 group-hover:shadow-2xl">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {story.title}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {story.subtitle}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {story.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Career Resources
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Free tools and resources to help you succeed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Resume Builder",
                description:
                  "Create professional resumes with our AI-powered builder",
                icon: <FileText className="w-12 h-12 text-primary" />,
                features: [
                  "AI Suggestions",
                  "Multiple Templates",
                  "ATS Optimized",
                  "Export Options",
                ],
              },
              {
                title: "Interview Prep",
                description:
                  "Practice interviews with our comprehensive preparation tools",
                icon: <MessageSquare className="w-12 h-12 text-primary" />,
                features: [
                  "Mock Interviews",
                  "Common Questions",
                  "Video Practice",
                  "Feedback System",
                ],
              },
              {
                title: "Career Guidance",
                description:
                  "Get personalized career advice from industry experts",
                icon: <Users className="w-12 h-12 text-primary" />,
                features: [
                  "Expert Mentors",
                  "Career Paths",
                  "Skill Assessment",
                  "Goal Setting",
                ],
              },
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="feature-card-handshake h-full p-6 hover:scale-105 transition-all duration-500 group-hover:shadow-2xl">
                  <div className="mb-4 flex justify-center">
                    <motion.div
                      className="p-3 bg-primary/10 rounded-full group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {resource.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <div className="space-y-2">
                    {resource.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-blue-500/10 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 animate-pulse" />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Start Your Career Journey?
              </h2>
            </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students and employers who are already using
              Palenso to connect and grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="btn-handshake text-lg px-8 py-4 group">
                  <span className="group-hover:scale-105 transition-transform duration-200">
                    Get Started Today
                  </span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
              <Link href="/about-us">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 group"
                >
                  <span className="group-hover:scale-105 transition-transform duration-200">
                    Learn More
                  </span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                  <Handshake className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">Palenso</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The premier career platform connecting students with employers.
                Discover opportunities, explore companies, and launch your
                career journey.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Find Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Career Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Resume Builder
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Career Advice
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Post Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Find Talent
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Career Fairs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Employer Resources
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketing;
