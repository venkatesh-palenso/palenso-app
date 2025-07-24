import React from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingOption {
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: "default" | "outline" | "destructive";
  onClick?: () => void;
}

interface AccountSettingsCardProps {
  options?: SettingOption[];
}

const AccountSettingsCard: React.FC<AccountSettingsCardProps> = ({ 
  options = [
    {
      title: "Email Notifications",
      description: "Manage your email notification preferences for jobs, events, and updates.",
      buttonText: "Configure Notifications",
      buttonVariant: "outline",
    },
    {
      title: "Privacy Settings",
      description: "Control your privacy settings and data sharing preferences.",
      buttonText: "Manage Privacy",
      buttonVariant: "outline",
    },
    {
      title: "Account Deletion",
      description: "Permanently delete your account and all associated data.",
      buttonText: "Delete Account",
      buttonVariant: "destructive",
    },
  ]
}) => {
  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900 dark:text-white">
          <Settings className="mr-2 h-5 w-5 text-orange-500" />
          Account Settings
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Manage your account preferences and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {options.map((option, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                {option.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {option.description}
              </p>
              <Button
                variant={option.buttonVariant || "outline"}
                size="sm"
                onClick={option.onClick}
                className={`mt-3 ${
                  option.buttonVariant === "destructive"
                    ? "border-red-200 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                    : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {option.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettingsCard; 