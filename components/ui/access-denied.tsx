import React from "react";
import { Shield, AlertTriangle } from "lucide-react";
import { Button } from "./button";

interface AccessDeniedProps {
  title?: string;
  message?: string;
  icon?: "shield" | "alert";
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

const AccessDenied: React.FC<AccessDeniedProps> = ({
  title = "Access Denied",
  message = "You don't have permission to access this page.",
  icon = "shield",
  primaryAction,
  secondaryAction,
}) => {
  const IconComponent = icon === "alert" ? AlertTriangle : Shield;
  const iconColor =
    icon === "alert"
      ? "text-orange-600 dark:text-orange-400"
      : "text-red-600 dark:text-red-400";
  const bgColor =
    icon === "alert"
      ? "bg-orange-100 dark:bg-orange-900/20"
      : "bg-red-100 dark:bg-red-900/20";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div
          className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          <IconComponent className={`w-8 h-8 ${iconColor}`} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          {primaryAction && (
            <Button onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
