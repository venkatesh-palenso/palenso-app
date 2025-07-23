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
} from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    { label: "Jobs", href: "/jobs", icon: Search, color: "bg-blue-500" },
    { label: "Companies", href: "/companies", icon: Building, color: "bg-green-500" },
    { label: "Events", href: "/events", icon: Calendar, color: "bg-purple-500" },
    { label: "Resources", href: "/resources", icon: BookOpen, color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8">
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
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"
                />
              </div>
            </motion.div>
          </div>

          {/* Error Message */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Page Under Construction
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Oops! It looks like this page is still being built. Our team is
              working hard to bring you amazing features. In the meantime,
              explore what we already have to offer!
            </p>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/">
            <Button 
              size="lg" 
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="h-5 w-5" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2 border-2 border-gray-300 hover:border-gray-400 px-8 py-3 text-lg font-semibold transition-all duration-300"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-8">
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
                  <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <link.icon className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {link.label}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
            <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <Link 
              href="/help" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold hover:underline transition-colors duration-200"
            >
              Contact our support team
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
