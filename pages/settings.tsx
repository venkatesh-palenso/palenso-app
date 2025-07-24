// react
import React from "react";

// framer motion
import { motion } from "framer-motion";

// components
import {
  ProfileCard,
  PasswordCard,
  AccountSettingsCard,
  SettingsHeader,
} from "@/components/settings";

// layout
import { Layouts } from "@/layouts";

const SettingsPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <SettingsHeader />

      {/* Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Profile Information */}
            <div className="lg:col-span-1">
              <ProfileCard />
            </div>

            {/* Settings Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Change Password */}
              <PasswordCard />

              {/* Account Settings */}
              <AccountSettingsCard />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

SettingsPage.getLayout = Layouts.Protected;

export default SettingsPage;
