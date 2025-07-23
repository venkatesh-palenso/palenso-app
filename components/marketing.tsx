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
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="hero-handshake relative pt-8 pb-32 px-4 overflow-hidden">
        {/* Background Elements */}
        <motion.div
          style={{ y }}
          className="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        />
        <motion.div
          style={{ y }}
          className="absolute top-40 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        />
        <motion.div
          style={{ y }}
          className="absolute -bottom-8 right-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
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
                <Handshake className="w-16 h-16 text-primary mr-4 animate-bounce-glow" />
                <h1 className="heading-handshake-large">
                  Where Talent Meets
                  <br />
                  <span className="text-primary">Opportunity</span>
                </h1>
              </div>
              <p className="heading-handshake-subtitle">
                Palenso is the premier career platform connecting students with employers. 
                Discover opportunities, explore companies, and launch your career journey.
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
                    <Button className="btn-handshake text-lg px-8 py-4">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 py-4 border-2 border-primary hover:bg-primary transition-all duration-300 cursor-pointer"
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-handshake text-4xl mb-4">
              Why Choose Palenso?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The ultimate platform for career growth and talent acquisition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="w-12 h-12 text-primary" />,
                title: "Student Success",
                description: "Find internships, jobs, and career opportunities tailored to your skills and interests.",
              },
              {
                icon: <Building className="w-12 h-12 text-primary" />,
                title: "Employer Solutions",
                description: "Connect with top talent through job postings, events, and direct recruitment.",
              },
              {
                icon: <Calendar className="w-12 h-12 text-primary" />,
                title: "Career Events",
                description: "Attend workshops, career fairs, and networking events to grow your professional network.",
              },
              {
                icon: <Globe className="w-12 h-12 text-primary" />,
                title: "Global Reach",
                description: "Access opportunities from companies worldwide and expand your career horizons.",
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-primary" />,
                title: "Career Growth",
                description: "Track your progress, build your portfolio, and advance your career with confidence.",
              },
              {
                icon: <Handshake className="w-12 h-12 text-primary" />,
                title: "Direct Connection",
                description: "Connect directly with employers and build meaningful professional relationships.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-card-handshake h-full">
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="heading-handshake text-xl mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join the growing community of students and employers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "10K+", label: "Active Students", icon: <Users className="w-8 h-8" /> },
              { number: "500+", label: "Partner Companies", icon: <Building className="w-8 h-8" /> },
              { number: "5K+", label: "Jobs Posted", icon: <Briefcase className="w-8 h-8" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-white/20 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Career Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students and employers who are already using Palenso to connect and grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="btn-handshake text-lg px-8 py-4 bg-white text-primary hover:bg-gray-100">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about-us">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-2 border-white hover:bg-white hover:text-primary transition-all duration-300"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Marketing;
