// next
import Head from "next/head";
import Link from "next/link";

// framer-motion
import { motion } from "framer-motion";

// lucide icons
import {
  AlertTriangle,
  RefreshCw,
  Home,
  ArrowLeft,
  Sparkles,
  Server,
  Wifi,
} from "lucide-react";

// components
import { Button } from "@/components/ui/button";

// layout
import { Layouts } from "@/layouts";

const Custom500 = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Head>
        <title>500 - Server Error | Palenso</title>
        <meta name="description" content="Something went wrong on our end" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-red-900/20 dark:via-gray-900 dark:to-orange-900/20 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl mx-auto">
                <AlertTriangle className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-6xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
                500
              </h1>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Oops! Server Error
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                Something went wrong on our end. Our team has been notified and
                is working to fix the issue.
              </p>
            </motion.div>

            {/* Error Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-red-200 dark:border-red-800"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Server className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Internal Server Error
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The server encountered an unexpected condition that prevented it
                from fulfilling your request.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={handleRefresh}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <Link href="/">
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-all duration-300"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>
            </motion.div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 text-sm text-gray-500 dark:text-gray-400"
            >
              <p className="mb-2">Still having issues? Try these steps:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-xs">
                <div className="flex items-center gap-1">
                  <Wifi className="w-3 h-3" />
                  <span>Check your internet connection</span>
                </div>
                <div className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  <span>Clear your browser cache</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  <span>Go back and try again</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Need immediate assistance?
              </p>
              <Link href="/help">
                <Button
                  variant="ghost"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Contact Support
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

Custom500.getLayout = Layouts.Public;

export default Custom500;
