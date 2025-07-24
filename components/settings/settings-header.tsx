import React from "react";
import { motion } from "framer-motion";
import { Settings, Sparkles } from "lucide-react";

interface SettingsHeaderProps {
  title?: string;
  description?: string;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title = "Settings",
  description = "Manage your account settings and preferences",
}) => {
  return (
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
                {title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-1.5 h-1.5 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SettingsHeader;
