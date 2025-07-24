import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChangePasswordForm from "./change-password-form";

const PasswordCard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  if (showForm) {
    return <ChangePasswordForm onCancel={toggleForm} />;
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900 dark:text-white">
          <Lock className="mr-2 h-5 w-5 text-green-500" />
          Change Password
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Secure Your Account
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Click the button below to change your password
          </p>
          <Button
            onClick={toggleForm}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordCard; 