// react
import React, { ReactElement } from "react";

// next
import Link from "next/link";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import {
  Home,
  ArrowLeft,
  Search,
  Building,
  Calendar,
  BookOpen,
  AlertTriangle,
  Construction,
  Sparkles,
} from "lucide-react";

// components
import { Button } from "@/components/ui/button";

// layout
import RootLayout from "@/layouts/root";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-20, 20, -20],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function Custom404() {
  const quickLinks = [
    {
      label: "Jobs",
      href: "/jobs",
      icon: Search,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      label: "Companies",
      href: "/companies",
      icon: Building,
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      label: "Events",
      href: "/events",
      icon: Calendar,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      label: "Resources",
      href: "/resources",
      icon: BookOpen,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
  ];

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
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            {/* Main Error Section */}
            <motion.div variants={itemVariants} className="mb-12">
              {/* Animated 404 Number */}
              <div className="relative mb-8">
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 mb-4"
                >
                  404
                </motion.div>

                {/* Floating Construction Icon */}
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-16"
                >
                  <div className="relative">
                    <Construction className="w-16 h-16 text-orange-500" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Error Message */}
              <motion.div variants={itemVariants}>
                <h2 className="heading-handshake-large text-3xl md:text-4xl mb-4">
                  Page Under Construction
                </h2>
                <p className="heading-handshake-subtitle text-lg max-w-2xl mx-auto leading-relaxed">
                  Oops! It looks like this page is still being built. Our team
                  is working hard to bring you amazing features. In the
                  meantime, explore what we already have to offer!
                </p>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/">
                <Button
                  size="lg"
                  className="btn-handshake px-8 py-3 text-lg font-semibold"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="btn-secondary px-8 py-3 text-lg font-semibold"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Go Back
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="mb-12">
              <h3 className="heading-handshake text-xl mb-8">
                Explore Our Platform
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {quickLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={link.href}>
                      <div className="feature-card-handshake p-6 hover:scale-105 transition-all duration-300 cursor-pointer group">
                        <div
                          className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <link.icon className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {link.label}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="feature-card-handshake p-6 max-w-md mx-auto">
                <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-3">
                  Can&apos;t find what you&apos;re looking for?
                </p>
                <Link
                  href="/help"
                  className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors duration-200"
                >
                  Contact our support team
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
